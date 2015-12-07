import { Projects } from 'application/views/projects/Projects.jsx';
import { shallow } from 'enzyme';
import { HISTORY_API } from 'redux-router/lib/constants';

describe('<Projects />', function() {
    beforeEach(function() {
        const filters = {
            fromStars: 100,
            fromMonths: 3
        };
        const projectsData = {
            projects: []
        };
        const dispatch = jasmine.createSpy('dispatch');
        this.dispatch = dispatch;
        this.projects = shallow(<Projects {...{filters, dispatch, projectsData}} />);
    });

    it('should render empty view', function() {
        expect(this.projects.find('Project')).toHaveLength(0);
        expect(this.projects.find('Button')).toHaveLength(1);
    });

    it('should save current query to store', function() {
        expect(this.dispatch).toHaveBeenCalledWith(joc({type: 'RESET_QUERY'}));
    });

    it('should render loading view', function() {
        this.projects.setProps({projectsData: {projectsLoading: true, projects: []}});
        const message = this.projects.find('.projects__footer_message');
        expect(message).toHaveLength(1);
        expect(message.text()).toBe('<Spin /> Loading...');
    });

    it('should dispatch updated filters', function() {
        this.dispatch.calls.reset();
        const filters = this.projects.find('Filters');
        filters.props().onChange({fromStars: 150});
        expect(this.dispatch).toHaveBeenCalledWith({type: HISTORY_API, payload: joc({ method: 'pushState'})});
    });

    it('should update query and request projects after filters update', function() {
        this.projects.setProps({filters: {fromStars: 150}});
        expect(this.dispatch).toHaveBeenCalledWith(joc({type: 'RESET_QUERY'}));
        expect(this.dispatch).toHaveBeenCalledWith(joc({name: 'fetchProjectsAction'}));
    });

    it('should render projects list', function() {
        this.projects.setProps({projectsData: {projects: [
            {id: 10, full_name: 'awesome/thing'},
            {id: 11, full_name: 'big/stuff'},
            {id: 12, full_name: 'legacy/code'}
        ]}});
        expect(this.projects.find('Project')).toHaveLength(3);
    });
});
