import BemComponent from '../bem-component/BemComponent.jsx';
import bem from 'b_';

const b = bem.with('spin');

class Spin extends BemComponent {
    render() {
        const {theme, size} = this.props;
        const mods = {theme, size, visible: true};
        return <span className={b(mods)}></span>;
    }
}

export default Spin;
