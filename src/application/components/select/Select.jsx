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
        const opened = !this.state.opened;
        setImmediate(() => {
            this.setState({opened});
        });
    }

    closeSelect() {
        this.setState({opened: false});
    }

    getDisplayValue(value) {
        const option = this.props.options.find((option) => option.value === value);
        return option ? option.name : 'Not selected';
    }

    setValue(value) {
        this.props.onSelect(value);
        this.closeSelect();
    }

    getMenuItem(option) {
        return <MenuItem onClick={() => this.setValue(option.value)} key={option.value}>{option.name}</MenuItem>;
    }

    render() {
        const {value, options, theme, size} = this.props;
        const {opened} = this.state;
        return (<div className={b({theme, size, opened})}>
            <Button className={b('button')} text={this.getDisplayValue(value)} onMouseDown={this.toggleSelect.bind(this)}>
                <i className={['icon', b('tick')].join(' ')}></i>
            </Button>
            <Popup visible={opened} direction="bottom-left" anchor={this} autoclosable={true} onClose={this.closeSelect.bind(this)}>
                <Menu className={b('menu')}>
                    {options.map(this.getMenuItem.bind(this))}
                </Menu>
            </Popup>
        </div>);
    }

    @extend
    static defaultProps = {
        onSelect() {},
        value: null
    };
}
