import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projects';
import Project from '../../components/project/Project.jsx';
import Filters from '../../components/filters/Filters.jsx';

const b = bem.with('projects');

@connect(state => state.projects) class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                fromStars: 1000,
                months: 12
            }
        }
    }

    componentDidMount() {
        this.requestProjects(this.state.filters);
    }

    onChangeFilters(filters) {
        this.setState({filters});
        this.requestProjects(filters);
    }

    requestProjects({fromStars, months, lang}) {
        const { dispatch } = this.props;
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
            query.push('lang:' + lang);
        }
        dispatch(fetchProjects(query.join(' ')));
    }

    getProjectContent() {
        const {projects, projectsLoading} = this.props;
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
            <h1>Projects</h1>
            <Filters filters={this.state.filters} onChange={this.onChangeFilters.bind(this)}/>
            {this.getProjectContent()}
        </div>
    }
}

export default Projects;
