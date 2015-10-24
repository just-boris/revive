import './styles.css';
import { Component } from 'react';
import { Link } from 'react-router';

export default function Header(props) {
    return <div className="header">
        <Link className="header__brand" to="/">Revive</Link>
    </div>
}
