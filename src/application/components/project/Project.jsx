import './styles.css';
import bem from 'b_';
import Timeago from '../timeago/Timeago.jsx';

const b = bem.with('project');

export default function Project({project}) {
    return <div className={b()}>
        <h3 className={b('title')}>
            <a href={project.html_url}>{project.full_name}</a>
            {' '}
            <span className={b('lang')}>{project.language}</span>
        </h3>
        <p className={b('info')}><b>{project.stargazers_count}</b> stars, <b>{project.forks_count}</b> forks</p>
        <p className={b('info')}><i>Last push at <Timeago date={project.pushed_at} /></i></p>
    </div>
}
