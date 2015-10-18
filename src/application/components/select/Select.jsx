import bem from 'b_' ;
import BemComponent from '../bem-component/BemComponent.jsx';
import Button from '../button/Button.jsx';
import Popup from '../popup/Popup.jsx';
import {extend} from '../../decorators';

var b = bem.with('select');

export default class Select extends BemComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {value, theme, size} = this.props;
        //const {displayVal} = this.state;
        return <div className={b({theme, size})}>
            <Button text={value}/>
            <Popup>
                <div class="menu menu_size_m menu_theme_islands menu_mode_check menu__control select__menu">
                    <div className="menu-item menu-item_theme_islands">Доклад</div>
                    <div className="menu-item menu-item_checked menu-item_theme_islands">Мастер-класс</div>
                    <div className="menu-item menu-item_checked menu-item_theme_islands">Круглый стол</div>
                </div>
            </Popup>
        </div>
    }

    @extend
    static defaultProps = {
        value: 'allowAll'
    };
}
