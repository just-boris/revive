import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projects';
import { pushState } from 'redux-router';
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

    componentDidMount() {
        this.requestProjects(this.props.filters);
    }

    componentWillReceiveProps({filters}) {
        if(!shallowEqual(filters, this.props.filters)) {
            this.requestProjects(filters);
        }
    }

    onChangeFilters(filters) {
        this.props.dispatch(pushState(null, '/projects', filters));
    }

    requestProjects({fromStars, toStars, fromMonths, toMonths, lang}) {
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
        this.props.dispatch(fetchProjects(query.join(' ')));
    }

    getProjectContent() {
        const {projects, projectsLoading} = this.props.projects;
        if(projectsLoading) {
            return (<p><i>Loading...</i></p>);
        } else {
            return projects.map((project) => {
                return <Project key={project.id} project={project}/>
            })
        }
    }

    render() {
        return (<div className={b()}>
            <Filters filters={this.props.filters} onChange={this.onChangeFilters.bind(this)}/>
            <div className={b('content')}>
                {this.getProjectContent()}
            </div>
        </div>);
    }
}

export default Projects;
