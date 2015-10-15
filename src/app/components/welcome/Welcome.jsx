import './styles.css';
import {Component} from 'react';
import Button from '../button/Button.jsx'
import b from 'b_';

const bl = b.with('welcome');

export default class Welcome extends Component {
    render() {
        return <div className={bl()}>
            <h1 className={bl('text')}>Some projects need your care</h1>
            <Button className={bl('button')} text="Find projects" view="action" size="xl" />
        </div>
    }
}
