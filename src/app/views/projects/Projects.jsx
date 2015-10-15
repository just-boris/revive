import b from 'b_';
import { Component } from 'react';
import { fetchProjects } from '../../actions/projects';

import store from '../../store';

const bl = b.with('projects');

export default class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    componentDidMount() {
        this.unsubscibe = store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(fetchProjects('stars:>1000%20pushed:"2010-01-01%20..%202015-04-01"'));
    }

    componentWillUnmount() {
        this.unsubscibe();
    }

    onStoreUpdate() {
        const {projects} = store.getState();
        this.setState({projects});
    }

    render() {
        const {projects} = this.state;
        return <div className={bl()}>
            <h1>{projects.length > 0 ? 'Projects' : 'Loading projects...'}</h1>
            {projects.map((project) => {
                return <p key={project.id}>{project.full_name} {project.stargazers_count}</p>
            })}
        </div>
    }
}

