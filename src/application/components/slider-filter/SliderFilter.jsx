import { Component } from 'react';
import Slider from '../slider/Slider.jsx';

export default class StarsFilter extends Component {
    constructor(...args) {
        super(...args);
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    valToIndex(val) {
        const index = this.props.values.indexOf(val);
        return index > -1 ? index : this.props.marks.length - 1;
    }

    onAfterChange([left, right]) {
        left = this.props.values[left];
        right = (right !== this.props.values.length - 1) ? this.props.values[right] : undefined;
        this.props.onAfterChange([left, right]);
    }

    render() {
        const {defaultValue, marks} = this.props;
        const defaultIndex = defaultValue.map(val => this.valToIndex(val));
        return <Slider min={0} max={marks.length-1} range marks={marks} step={null}
            defaultValue={defaultIndex} onAfterChange={this.onAfterChange} />;
    }
}
