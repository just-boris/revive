import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { connect } from 'react-redux';
import { fetchProjects, resetQuery } from '../../actions/projects';
import { setToken } from '../../actions/token';
import { pushState } from 'redux-router';
import Waypoint from 'react-waypoint';
import Button from '../../components/button/Button.jsx';
import Spin from '../../components/spin/Spin.jsx';
import ProjectsError from '../../components/projects-error/ProjectsError.jsx';
import Project from '../../components/project/Project.jsx';
import Filters from '../../components/filters/Filters.jsx';

const b = bem.with('projects');

export function parseFilters({fromStars, toStars, fromMonths, toMonths, lang}) {
    return {
        fromStars: +fromStars || 500,
        toStars: +toStars || undefined,
        fromMonths: +fromMonths || 12,
        toMonths: +toMonths || undefined,
        lang: lang
    };
}

function dateFromNow(months) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
}

export class Projects extends Component {

    constructor(props, context) {
        super(props, context);
        this.onWaypointScroll = this.onWaypointScroll.bind(this);
        this.onChangeFilters = this.onChangeFilters.bind(this);
        this.requestProjects = this.requestProjects.bind(this);
        this.setToken = this.setToken.bind(this);
    }

    componentWillMount() {
        this.updateQuery(this.props.filters);
    }

    componentWillReceiveProps({filters}) {
        if(!shallowEqual(filters, this.props.filters)) {
            this.updateQuery(filters);
            this.requestProjects();
        }
    }

    onChangeFilters(filters) {
        this.props.dispatch(pushState(null, '/projects', filters));
    }

    updateQuery({fromStars, toStars, fromMonths, toMonths, lang}) {
        const query = [];
        if(fromStars) {
            if(toStars) {
                query.push(`stars:${fromStars}..${toStars}`);
            } else {
                query.push(`stars:>${fromStars}`);
            }
        }
        if(fromMonths) {
            const pushedBefore = dateFromNow(fromMonths);
            const pushedAfter = toMonths ? dateFromNow(toMonths) : new Date(2010, 0, 1);
            query.push(`pushed:"${pushedAfter.toJSON()}..${pushedBefore.toJSON()}"`);
        }
        if(lang) {
            query.push('language:' + lang);
        }
        this.props.dispatch(resetQuery(query.join(' ')));
    }

    requestProjects() {
        this.props.dispatch(fetchProjects());
    }

    setToken(value) {
        this.props.dispatch(setToken(value));
        this.requestProjects();
    }

    onWaypointScroll() {
        this.requestProjects();
    }

    getListFooter() {
        const {projectsLoading, projectsDone, projects, requestError} = this.props.projectsData;
        const {value: token} = this.props.token;
        const className = b('footer', {message: true});
        if(projectsLoading) {
            return (<div className={className}>
                <Spin />{' '}
                <i>Loading...</i>
            </div>);
        }
        if(requestError) {
            const {limitExceeded, badToken, limitResetTime} = requestError;
            return <ProjectsError {...{
                onRetry: this.requestProjects,
                onSetToken: this.setToken,
                limitExceeded, badToken, limitResetTime, token, className}}/>;
        }
        if(projectsDone) {
            return <div className={className}>Shown all {projects.length} projects</div>;
        }
        return (<div className={b('footer')}>
            <Waypoint onEnter={this.onWaypointScroll} threshold={0.2} />
            <Button text="Load more" size="l" onClick={this.requestProjects} />
        </div>);
    }

    render() {
        const {projects, page} = this.props.projectsData;
        return (<div className={b()}>
            <Filters filters={this.props.filters} onChange={this.onChangeFilters}/>
            <div className={b('content')}>
                {projects.map((project) => {
                    return <Project key={project.id + ' ' + page} project={project}/>;
                })}
                {this.getListFooter()}
            </div>
        </div>);
    }
}

export default connect(state => {
    return {
        projectsData: state.projects,
        token: state.token,
        filters: parseFilters(state.router.location.query)
    };
})(Projects);
