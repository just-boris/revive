import './styles.css';
import {Component} from 'react';
import Button from '../../components/button/Button.jsx';
import { Link } from 'react-router';
import bem from 'b_';

const b = bem.with('jumbotron');

export default function Jumbotron({expanded}) {
    return <div className={b({expanded})}>
        {expanded ? (
            <div>
                <h1 className={b('text')}>Some projects need your care</h1>
                <Link to="/projects">
                    <Button className={b('button')} text="Find projects" view="action" size="xl" />
                </Link>
            </div>
            ) : ''}
    </div>
}
