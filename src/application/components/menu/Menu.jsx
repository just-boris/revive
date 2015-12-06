import BemComponent from '../bem-component/BemComponent.jsx';
import bem from 'b_';

const b = bem.with('menu');

export default class Menu extends BemComponent {
    render() {
        const {className, theme, size} = this.props;
        return <div className={className + ' ' + b({theme, size})}>{this.props.children}</div>;
    }
}
