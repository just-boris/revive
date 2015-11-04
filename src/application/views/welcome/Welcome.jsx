import './styles.css';
import { Component } from 'react';
import b from 'b_';

const bl = b.with('welcome');

export default class Welcome extends Component {
    render() {
        return <h1 className={bl()}>Welcome</h1>
    }
}
