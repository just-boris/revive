import './styles.css';
import bem from 'b_';

const b = bem.with('project');

export default function Project({project}) {
    return <div className={b()}>
        <h3 className={b('title')}><a href={project.html_url}>{project.full_name}</a></h3>
        <p className={b('info')}><b>{project.stargazers_count}</b> stars, <b>{project.language}</b>, pushed at {project.pushed_at}</p>
    </div>
}
