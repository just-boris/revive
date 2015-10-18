import {PropTypes} from 'react';
import BemComponent from '../bem-component/BemComponent.jsx'
import {extend} from '../../decorators';
import bem from 'b_';

const b = bem.with('button');

export default class Button extends BemComponent {
    render() {
        const {className, view, theme, size} = this.props;
        const mods = Object.assign({view, theme, size}, this.state);
        return <button className={[className, b(mods)].join(' ')}
                       onMouseEnter={this.onMouseEnter.bind(this)}
                       onMouseLeave={this.onMouseLeave.bind(this)}
                       onMouseDown={this.onMouseDown.bind(this)}
                       onMouseUp={this.onMouseUp.bind(this)}>
            <span className={b('text')}>{this.props.text}</span>
        </button>
    }

    onMouseEnter() {
        this.setState({hovered: true});
    }

    onMouseLeave() {
        this.setState({hovered: false});
    }

    onMouseDown() {
        this.setState({pressed: true});
    }

    onMouseUp() {
        this.setState({pressed: false});
    }

    @extend
    static propTypes = {
        view: PropTypes.string,
        text: PropTypes.string
    };
}
