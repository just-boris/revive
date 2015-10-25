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

    getDisplayValue(value) {
        const option = this.props.options.find((option) => option.value === value);
        return option ? option.name : 'Not selected';
    }

    setValue(value) {
        this.props.onSelect(value);
        this.toggleSelect();
    }

    render() {
        const {value, options, theme, size} = this.props;
        const {opened} = this.state;
        return <div className={b({theme, size, opened})}>
            <Button className={b('button')} text={this.getDisplayValue(value)} onClick={this.toggleSelect.bind(this)}>
                <i className={['icon', b('tick')].join(' ')}></i>
            </Button>
            <Popup visible={opened} direction="bottom-left" anchor={this}>
                <Menu className={b('menu')}>
                    {options.map(opt => <MenuItem onClick={() => this.setValue(opt.value)} key={opt.value}>{opt.name}</MenuItem>)}
                </Menu>
            </Popup>
        </div>
    }

    @extend
    static defaultProps = {
        onSelect() {},
        value: null
    };
}
