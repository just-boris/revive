import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/projects';
import Project from '../../components/project/Project.jsx';
import Filters from '../../components/filters/Filters.jsx';

const b = bem.with('projects');
const halfYear = 365 * 24 * 60 * 60 * 1000 / 2;

@connect(state => state.projects)
class Projects extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const pushedBefore = new Date(Date.now() - halfYear);
        dispatch(fetchProjects(`stars:>1000 pushed:"2010-01-01 .. ${pushedBefore.toJSON()}"`));
    }

    render() {
        const {projects, projectsLoading} = this.props;
        if(projectsLoading) {
            return <div className={b()}>
                <h1>Loading projects...</h1>
            </div>
        } else {
            return <div className={b()}>
                <h1>Projects</h1>
                <Filters />
                {projects.map((project) => {
                    return <Project key={project.id} project={project}/>
                })}
            </div>
        }
    }
}

export default Projects;
