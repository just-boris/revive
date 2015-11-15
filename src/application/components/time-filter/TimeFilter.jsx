import { Component } from 'react'
import Slider from '../slider/Slider.jsx';

export default class StarsFilter extends Component {
    constructor(...args) {
        super(...args);
        this.dates = ['6 months', '1 year', '2 years', '5 years+'];
        this.values = [6, 12, 24, 60];
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    valToIndex(val) {
        const index = this.values.indexOf(val);
        return index > -1 ? index : this.dates.length - 1;
    }

    onAfterChange([left, right]) {
        left = this.values[left];
        right = (right !== this.values.length - 1) ? this.values[right] : undefined;
        this.props.onAfterChange([left, right]);
    }

    render() {
        const {defaultValue} = this.props
        const defaultIndex = defaultValue.map(val => this.valToIndex(val))
        return <Slider range marks={this.dates} defaultIndex={defaultIndex}
            onAfterChange={this.onAfterChange} />
    }
}
