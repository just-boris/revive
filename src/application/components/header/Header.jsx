import './styles.css';
import { Link } from 'react-router';

export default function Header() {
    return (<div className="header">
        <Link className="header__brand header__link" to="/">Revive</Link>
        <a className="header__link" href="https://github.com/just-boris/revive">Code on Github</a>
    </div>);
}
