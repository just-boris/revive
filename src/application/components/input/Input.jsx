import BemComponent from '../bem-component/BemComponent.jsx';
import { extend } from '../../decorators';
import bem from 'b_';

const b = bem.with('input');

export default class Input extends BemComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {focused: false};
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus() {
        this.setState({focused: true});
    }

    onBlur() {
        this.setState({focused: false});
    }

    getVal() {
        return this.refs.control.value;
    }

    render() {
        const {name, val, placeholder, maxLength, autocomplete, id, tabIndex} = this.props;
        const {width, disabled, type, theme, size} = this.props;
        const mods = Object.assign({width, disabled, type, theme, size}, this.state);
        return (<span className={b(mods)}>
            <span className={b('box')}>
                <input ref="control" className={b('control')} {...{name, placeholder, maxLength, autocomplete, id, tabIndex, type, defaultValue: val}}
                    onFocus={this.onFocus} onBlur={this.onBlur} />
            </span>
        </span>);
    }

    @extend
    static defaultProps = {
        type: 'text'
    }
}
