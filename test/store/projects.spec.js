import testStore from '../testStore';
import nock from 'nock';
import {resetQuery, fetchProjects} from 'application/actions/projects';
import {setToken} from 'application/actions/token';
nock.disableNetConnect();

describe('projects store', function() {
    beforeEach(function() {
        this.store = testStore();
        this.store.dispatch(resetQuery('test query'));
        this.server = nock('https://api.github.com');
        this.getProjectsState = () => this.store.getState().projects;
        this.expectRequest = (page) => {
            return this.server.get('/search/repositories')
                .query({q: 'test query', sort: 'stars', order: 'desc', page});
        };
    });

    afterEach(function() {
        this.server.done();
    });

    it('should reset query', function() {
        expect(this.store.getState().projects).toEqual(joc({query: 'test query'}));
    });

    it('should report limit reached', function(done) {
        this.expectRequest(1).reply(403, {message: 'Over query limit'}, {'X-RateLimit-Reset': 1450029714});
        this.store.dispatch(fetchProjects()).then(() => {
            const state = this.store.getState().projects;
            expect(state).toEqual(joc({
                projectsLoading: false,
                requestError: joc({
                    limitExceeded: true, badToken: false, limitResetTime: 1450029714000
                })
            }));
            done();
        });
        expect(this.getProjectsState()).toEqual(joc({projectsLoading: true, requestError: null}));
    });

    it('should detect unknown network errors', function(done) {
        this.expectRequest(1).replyWithError('You have been disconnected, for example');
        this.store.dispatch(fetchProjects()).then(() => {
            const state = this.getProjectsState();
            expect(state.projectsLoading).toBeFalsy();
            expect(state.requestError.message).toMatch(/You have been disconnected, for example/);
            done();
        });
    });

    it('should report about bad token', function(done) {
        this.expectRequest(1).reply(401, {message: 'Unrecognized token'});
        this.store.dispatch(fetchProjects()).then(() => {
            expect(this.getProjectsState()).toEqual(joc({
                projectsLoading: false,
                requestError: joc({
                    limitExceeded: false, badToken: true
                })
            }));
            done();
        });
    });

    describe('paging', function() {
        beforeEach(function(done) {
            this.expectRequest(1).reply(200, {items: [{id: 567}, {id: 262}], total_count: 10});
            this.store.dispatch(fetchProjects()).then(done);
        });

        it('should load first page', function() {
            expect(this.getProjectsState()).toEqual(joc({
                projects: [jany(Object), jany(Object)],
                projectsLoading: false,
                projectsDone: false,
                page: 1
            }));
        });

        it('should load next page', function(done) {
            this.expectRequest(2).reply(200, {items: [{id: 723}, {id: 812}], total_count: 10});
            this.store.dispatch(fetchProjects()).then(() => {
                expect(this.getProjectsState()).toEqual(joc({
                    projects: [jany(Object), jany(Object), jany(Object), jany(Object)],
                    projectsLoading: false,
                    projectsDone: false,
                    page: 2
                }));
                done();
            });
        });

        it('should detect last page', function(done) {
            this.expectRequest(2).reply(200, {items: [{id: 871}, {id: 866}], total_count: 4});
            this.store.dispatch(fetchProjects()).then(() => {
                expect(this.getProjectsState()).toEqual(joc({
                    projects: [jany(Object), jany(Object), jany(Object), jany(Object)],
                    projectsDone: true
                }));
                done();
            });
        });

        it('should load first page after change query', function(done) {
            this.store.dispatch(resetQuery('another query'));
            this.server
                .get('/search/repositories')
                .query({q: 'another query', sort: 'stars', order: 'desc', page: 1})
                .reply(200, {items: [{id: 108}], total_count: 2});
            this.store.dispatch(fetchProjects()).then(() => {
                expect(this.getProjectsState()).toEqual(joc({
                    projects: [jany(Object)],
                    page: 1
                }));
                done();
            });
        });
    });

    it('should use token if it has been provided', function(done) {
        this.store.dispatch(setToken('d1b723f'));
        this.server
            .get('/search/repositories')
            .query({q: 'test query', sort: 'stars', order: 'desc', page: 1, access_token: 'd1b723f'})
            .reply(200, {items: [], total_count: 0});
        this.store.dispatch(fetchProjects()).then(() => {
            expect(this.getProjectsState()).toEqual(joc({
                projectsLoading: false,
                page: 1
            }));
            done();
        });
    });
});
