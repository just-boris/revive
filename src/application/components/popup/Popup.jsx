import BemComponent from '../bem-component/BemComponent.jsx';
import bem from 'b_';

const b = bem.with('popup');

export default class Popup extends BemComponent {

    render() {
        const {theme, size} = this.props;
        return <div className={b({theme, size})}>{this.props.children}</div>;
    }
}
