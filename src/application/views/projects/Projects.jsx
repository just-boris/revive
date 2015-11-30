import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { connect } from 'react-redux';
import { fetchProjects, resetQuery } from '../../actions/projects';
import { pushState } from 'redux-router';
import Waypoint from 'react-waypoint';
import Button from '../../components/button/Button.jsx';
import Spin from '../../components/spin/Spin.jsx';
import Project from '../../components/project/Project.jsx';
import Filters from '../../components/filters/Filters.jsx';

const b = bem.with('projects');

function parseFilters({fromStars, toStars, fromMonths, toMonths, lang}) {
    return {
        fromStars: +fromStars || 500,
        toStars: +toStars || undefined,
        fromMonths: +fromMonths || 12,
        toMonths: +toMonths || undefined,
        lang: lang
    }
}

function dateFromNow(months) {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
}

@connect(state => {
    return {
        projects: state.projects,
        filters: parseFilters(state.router.location.query)
    }
})
class Projects extends Component {

    constructor(props, context) {
        super(props, context);
        this.requestProjects = this.requestProjects.bind(this);
        this.onChangeFilters = this.onChangeFilters.bind(this);
    }

    componentWillMount() {
        this.updateQuery(this.props.filters);
    }

    componentDidMount() {
        if(!this.props.projects.projectsLoading) {
            this.requestProjects();
        }
    }

    componentWillReceiveProps({filters}) {
        if(!shallowEqual(filters, this.props.filters)) {
            this.updateQuery(filters);
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
        this.props.dispatch(resetQuery(query.join(' ')))
    }

    requestProjects() {
        this.props.dispatch(fetchProjects());
    }

    getListFooter() {
        const {projectsLoading, projectsDone, projects} = this.props.projects;
        if(projectsLoading) {
            return (<div className={b('footer', {message: true})}>
                <Spin />{' '}
                <i>Loading...</i>
            </div>);
        }
        if(projectsDone) {
            return <div className={b('footer', {message: true})}>Shown all {projects.length} projects</div>;
        }
        return (<div className={b('footer')}>
            <Waypoint onEnter={this.requestProjects} threshold={0.2} />
            <Button text="Load more" size="l" onClick={this.requestProjects} />
        </div>);
    }

    render() {
        const {projects, page} = this.props.projects;
        return (<div className={b()}>
            <Filters filters={this.props.filters} onChange={this.onChangeFilters}/>
            <div className={b('content')}>
                {projects.map((project) => {
                    return <Project key={project.id + ' ' + page} project={project}/>
                })}
                {this.getListFooter()}
            </div>
        </div>);
    }
}

export default Projects;
