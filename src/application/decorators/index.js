import {Component} from 'react';
import {findDOMNode} from 'react-dom';

export function extend(target, prop, descriptor) {
    var origin = Object.getPrototypeOf(target)[prop];
    target[prop] = Object.assign({}, origin, descriptor.initializer());
    delete descriptor.initializer;
}


export function hoverable(Target) {
    class Hoverable extends Component {

        constructor(props) {
            super(props);
            this.state = {hovered: false};
            this.onMouseEnter = this.onMouseEnter.bind(this);
            this.onMouseLeave = this.onMouseLeave.bind(this);
        }

        componentDidMount() {
            findDOMNode(this).addEventListener('mouseenter', this.onMouseEnter);
            findDOMNode(this).addEventListener('mouseleave', this.onMouseLeave);
        }

        componentWillUnmount() {
            findDOMNode(this).removeEventListener('mouseenter', this.onMouseEnter);
            findDOMNode(this).removeEventListener('mouseleave', this.onMouseLeave);
        }

        onMouseEnter() {
            this.setState({hovered: true});
        }
        onMouseLeave() {
            this.setState({hovered: false});
        }
        render() {
            return <Target onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)} {...this.props} {...this.state}/>
        }
    }
    return Hoverable;
}
