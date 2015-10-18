import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import { fetchProjects } from '../../actions/projects';
import Project from '../../components/project/Project.jsx';

import store from '../../store';

const b = bem.with('projects');

export default class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    componentDidMount() {
        this.unsubscibe = store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(fetchProjects('stars:>1000 pushed:"2010-01-01%20..%202015-04-01"'));
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
        return <div className={b()}>
            <h1>{projectsLoading ? 'Loading projects...' : 'Projects'}</h1>
            {projects.map((project) => {
                return <Project key={project.id} project={project} />
            })}
        </div>
    }
}

