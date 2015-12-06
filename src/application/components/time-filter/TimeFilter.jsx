import { Component } from 'react';
import SliderFilter from '../slider-filter/SliderFilter.jsx';

export default class StarsFilter extends Component {
    constructor(...args) {
        super(...args);
        this.dates = ['6 months', '1 year', '2 years', '5+ years'];
        this.values = [6, 12, 24, 60];
    }

    render() {
        return <SliderFilter marks={this.dates} values={this.values}
            defaultValue={this.props.defaultValue} onAfterChange={this.props.onAfterChange} />;
    }
}
