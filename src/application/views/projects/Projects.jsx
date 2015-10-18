import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import { fetchProjects } from '../../actions/projects';
import Project from '../../components/project/Project.jsx';
import Filters from '../../components/filters/Filters.jsx';

import store from '../../store';

const b = bem.with('projects');
const halfYear = 365 * 24 * 60 * 60 * 1000 / 2;

export default class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    componentDidMount() {
        this.unsubscibe = store.subscribe(this.onStoreUpdate.bind(this));
        const pushedBefore = new Date(Date.now() - halfYear);
        store.dispatch(fetchProjects(`stars:>1000 pushed:"2010-01-01 .. ${pushedBefore.toJSON()}"`));
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    onStoreUpdate() {
        const {projects, projectsLoading} = store.getState();
        this.setState({projects, projectsLoading});
    }

    render() {
        const {projects, projectsLoading} = this.state;
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

