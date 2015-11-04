import {PropTypes} from 'react';
import BemComponent from '../bem-component/BemComponent.jsx'
import {extend, hoverable} from '../../decorators';
import bem from 'b_';

const b = bem.with('button');

@hoverable
class Button extends BemComponent {
    render() {
        const {className, view, theme, size, hovered} = this.props;
        const mods = Object.assign({view, theme, size, hovered}, this.state);
        return <button className={[className, b(mods)].join(' ')}
                       onClick={this.props.onClick}
                       onMouseDown={this.onMouseDown.bind(this)}
                       onMouseUp={this.onMouseUp.bind(this)}>
            <span className={b('text')}>{this.props.text}</span>
            {this.props.children}
        </button>
    }

    onMouseDown() {
        this.setState({pressed: true});
        this.props.onMouseDown();
    }

    onMouseUp() {
        this.setState({pressed: false});
    }

    @extend
    static propTypes = {
        view: PropTypes.string,
        text: PropTypes.string
    };

    @extend
    static defaultProps = {
        onClick() {},
        onMouseDown() {}
    }
}

export default Button;
