import { Component } from 'react'
import Slider from '../slider/Slider.jsx';

export default class StarsFilter extends Component {
    constructor(...args) {
        super(...args);
        this.dates = ['6 months', '1 year', '2 years', '5 years+'];
        this.values = [6, 12, 24, undefined];
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    valToIndex(val) {
        const index = this.values.indexOf(val);
        return index > -1 ? index : this.stars.length - 1;
    }

    indexToVal(index) {
        return this.values[index];
    }

    onAfterChange(index) {
        this.props.onAfterChange(index.map(i => this.indexToVal(i)));
    }

    render() {
        const {defaultValue} = this.props
        const defaultIndex = defaultValue.map(val => this.valToIndex(val))
        return <Slider range marks={this.dates} defaultIndex={defaultIndex}
            onAfterChange={this.onAfterChange} />
    }
}
