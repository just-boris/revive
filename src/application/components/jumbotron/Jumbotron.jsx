import './styles.css';
import {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Button from '../../components/button/Button.jsx';
import { Link } from 'react-router';
import Header from '../header/Header.jsx';
import bem from 'b_';

const b = bem.with('jumbotron');


export default class Jumbotron extends Component {

    componentDidUpdate(prevProps) {
        if(prevProps.expanded != this.props.expanded) {
            const node = findDOMNode(this);
            node.addEventListener('transitionend', function onScroll() {
                const event = document.createEvent('Event');
                event.initEvent('scroll', false, false);
                window.dispatchEvent(event);
                node.removeEventListener('transitionend', onScroll);
            });
        }
    }
    render() {
        const {expanded} = this.props;
        return (<div className={b({expanded})}>
            <Header />
            {expanded ? (
                <div className={b('body')}>
                    <div className={b('box')}>
                        <p className={b('row')}>Let's help projects to</p>
                        <h1 className={b('text')}>Revive</h1>
                        <p className={b('row')}>
                            There are a lot of abandoned projects on Github. Some of
                            them were popular in the past, but not now. You can find
                            them here and turn back to life.
                        </p>
                        <Link to="/projects" className={b('button')}>
                            <Button text="Find projects" view="action" size="xl" />
                        </Link>
                        <Link to="/" hash="#languages" className={b('button')}>
                            <Button text="Choose language" size="xl" />
                        </Link>
                    </div>
                </div>
                ) : ''}
        </div>);
    }
}
