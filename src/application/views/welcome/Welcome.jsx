import './styles.css';
import { Component } from 'react';
import { Link } from 'react-router';
import languages from '../../data/languages';
import bem from 'b_';

const b = bem.with('welcome');
const linkStyle = bem('link', {theme: 'islands'});

export default class Welcome extends Component {
    render() {
        return (<div className={b()}>
            <h1 className={b('title')}>What is it</h1>
            <p>
                This is a list of projects from Github, with the latest push for
                a long time ago. That means that project author is not
                interested in it, or just doesn't have enough time. However, the
                project still can be useful and have users. We fetch this
                projects via Github API and show here ordered by stars. Then you
                can found something interesting for you and contact the author
                to help him.
            </p><p>
                Do not invent the wheel, invest your time in already created
                thing. Support existing project is better than create a new one.
                You will get an almost-done code and quite a big user base.
                Don'tcall them legacy, they just a bit outdated, but you can
                bring them back.
            </p><p>
                Pick a language bellow, to see interesting projects.
            </p>
            <h2 className={b('title')} id="languages">Languages</h2>
            <ul className={b('languages')}>
                {languages.map((lang) => (<li key={lang}>
                    <Link className={linkStyle} to="projects" query={{lang}}>{lang}</Link>
                </li>))}
            </ul>
        </div>);
    }
}
