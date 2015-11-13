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

function parseFilters({fromStars, toStars, months, lang}) {
    return {
        fromStars: +fromStars || 10,
        toStars: +toStars || 50,
        months: +months || 12,
        lang: lang
    }
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
            this.requestProjects(this.props.filters);
        }
    }

    onChangeFilters(filters) {
        this.props.dispatch(pushState(null, '/projects', filters));
    }

    requestProjects({fromStars, months, lang}) {
        const query = [];
        if(fromStars) {
            query.push('stars:>' + fromStars);
        }
        if(months) {
            const pushedBefore = new Date();
            pushedBefore.setMonth(pushedBefore.getMonth() - months);
            query.push(`pushed:"2010-01-01 .. ${pushedBefore.toJSON()}"`);
        }
        if(lang) {
            query.push('language:' + lang);
        }
        this.props.dispatch(fetchProjects(query.join(' ')));
    }

    getProjectContent() {
        const {projects, projectsLoading} = this.props.projects;
        if(projectsLoading) {
            return <p><i>Loading...</i></p>
        } else {
            return projects.map((project) => {
                return <Project key={project.id} project={project}/>
            })
        }
    }

    render() {
        return <div className={b()}>
            <Filters filters={this.props.filters} onChange={this.onChangeFilters.bind(this)}/>
            <div className={b('content')}>
                {this.getProjectContent()}
            </div>
        </div>
    }
}

export default Projects;
