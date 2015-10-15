import {Component, PropTypes} from 'react';
import bem from 'b_';

const b = bem.with('button');

export default class Button extends Component {
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

    static propTypes = {
        theme: PropTypes.string,
        size: PropTypes.string,
        view: PropTypes.string,
        text: PropTypes.string
    };

    static defaultProps = {
        theme: 'islands',
        size: 'm'
    };
}
