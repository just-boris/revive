import BemComponent from '../bem-component/BemComponent.jsx'
import {extend, hoverable} from '../../decorators';
import bem from 'b_';

const b = bem.with('menu-item');

@hoverable
class MenuItem extends BemComponent {
    render() {
        const {className, theme, size, hovered} = this.props;
        return <div className={className + ' ' + b({theme, size, hovered})} onClick={this.props.onClick}>{this.props.children}</div>
    }

    @extend
    static defaultProps = {
        onClick() {}
    }
}

export default MenuItem;
