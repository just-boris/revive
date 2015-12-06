import BemComponent from '../bem-component/BemComponent.jsx';
import {findDOMNode} from 'react-dom';
import Portal from 'react-portal';
import {extend} from '../../decorators';
import bem from 'b_';

const b = bem.with('popup');

const POSITION_STRATEGY = {
    'bottom-left': ({left, bottom}, {}, {mainOffset, secondaryOffset}) => {
        return {
            top: bottom + mainOffset + 'px',
            left: left + secondaryOffset +'px'
        };
    },
    'top-left': ({top, left}, {height}, {mainOffset, secondaryOffset}) => {
        return {
            top: top - height - mainOffset + 'px',
            left: left + secondaryOffset +'px'
        };
    }
};

export default class Popup extends BemComponent {

    componentDidUpdate() {
        const {anchor, visible, direction} = this.props;
        if(visible && anchor) {
            const anchorSize = findDOMNode(anchor).getBoundingClientRect();
            const popup = findDOMNode(this.refs.popup);
            const popupSize = popup.getBoundingClientRect();
            Object.assign(popup.style, POSITION_STRATEGY[direction](anchorSize, popupSize, this.props));
        }
    }

    shouldComponentUpdate({visible}) {
        return this.props.visible !== visible;
    }

    render() {
        const {theme, size, visible, direction, autoclosable, onClose} = this.props;
        return (<Portal isOpened={true} closeOnOutsideClick={autoclosable} onClose={onClose}>
            <div className={b({theme, size, visible, direction, js: 'inited'})} ref="popup">{this.props.children}</div>
        </Portal>);
    }

    @extend
    static defaultProps = {
        mainOffset: 5,
        secondaryOffset: 0
    };
}
