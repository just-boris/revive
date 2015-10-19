import bem from 'b_' ;
import BemComponent from '../bem-component/BemComponent.jsx';
import Button from '../button/Button.jsx';
import Popup from '../popup/Popup.jsx';
import Menu from '../menu/Menu.jsx';
import MenuItem from '../menu/MenuItem.jsx';
import {extend} from '../../decorators';

var b = bem.with('select');

export default class Select extends BemComponent {

    constructor(props) {
        super(props);
        this.state = {opened: false};
    }

    toggleSelect() {
        this.setState({opened: !this.state.opened});
    }

    render() {
        const {value, theme, size} = this.props;
        const {opened} = this.state;
        return <div className={b({theme, size, opened})}>
            <Button className={b('button')} text={value} onClick={this.toggleSelect.bind(this)}>
                <i className={['icon', b('tick')].join(' ')}></i>
            </Button>
            <Popup visible={opened} direction="bottom-left">
                <Menu className={b('menu')}>
                    <MenuItem>Доклад</MenuItem>
                    <MenuItem>Мастер-класс</MenuItem>
                    <MenuItem>Круглый стол</MenuItem>
                </Menu>
            </Popup>
        </div>
    }

    @extend
    static defaultProps = {
        value: 'allowAll'
    };
}
