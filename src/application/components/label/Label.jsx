import './styles.css';
import BemComponent from '../bem-component/BemComponent.jsx';
import bem from 'b_';

const b = bem.with('label');

export default class Label extends BemComponent {
    render() {
        const {size} = this.props;
        return <label className={b({size})}>{this.props.children}</label>;
    }
}
