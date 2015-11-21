import './styles.css';
import { Component } from 'react';
import { Link } from 'react-router';

export default function Header() {
    return (<div className="header">
        <Link className="header__brand header__link" to="/">Revive</Link>
        <Link className="header__link" to="https://github.com/just-boris/revive">Code on Github</Link>
    </div>);
}
