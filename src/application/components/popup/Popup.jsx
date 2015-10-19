import BemComponent from '../bem-component/BemComponent.jsx';
import {extend} from '../../decorators';
import bem from 'b_';

const b = bem.with('popup');

export default class Popup extends BemComponent {

    render() {
        const {theme, size, visible, direction} = this.props;
        return <div className={b({theme, size, visible, direction, js: 'inited'})}>{this.props.children}</div>;
    }
}
