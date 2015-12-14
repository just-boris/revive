import useJsdom from '../useJsdom';
import { mount } from 'enzyme';
import {Component} from 'react';
import {findDOMNode, unmountComponentAtNode} from 'react-dom';
import Popup from 'application/components/popup/Popup';

class Block extends Component {
    render() {
        const {content = 'text', visible, direction, closeCallback} = this.props;
        const style = {
            width: '80px',
            height: '30px',
            position: 'absolute',
            top: '15px',
            left: '15px'
        };
        return <div style={style}>
            <Popup visible={visible} direction={direction} anchor={this} onClose={closeCallback}>{content}</Popup>
        </div>;
    }
}

xdescribe('<Popup />', function() {
    useJsdom();

    beforeEach(function() {
        this.block = mount(<Block />);
        const blockEl = findDOMNode(this.block.component);
        this.element = blockEl.parentElement;
        document.body.appendChild(this.element);
        console.log(blockEl.getBoundingClientRect());
    });

    afterEach(function() {
        unmountComponentAtNode(this.element);
        document.body.removeChild(this.element);
        expect(document.querySelectorAll('.popup').length).toBe(0);
    });

    it('should be invisible by default', function() {
        expect(document.querySelectorAll('.popup_visible').length).toBe(0);
    });

    it('should show with top-left direction', function() {
        this.block.setProps(Object.assign({}, this.block.props(), {visible: true, direction: 'top-left'}));
        console.log(document.querySelector('.popup').parentNode.innerHTML);
    });
});
