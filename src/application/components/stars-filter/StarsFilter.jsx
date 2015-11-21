import { Component } from 'react'
import SliderFilter from '../slider-filter/SliderFilter.jsx';

export default class StarsFilter extends Component {
    constructor(...args) {
        super(...args);
        this.stars = ['10', '100', '500', '1000', '5000+'];
        this.values = [10, 100, 500, 1000, 5000];
    }

    render() {
        return <SliderFilter marks={this.stars} values={this.values}
            defaultValue={this.props.defaultValue} onAfterChange={this.props.onAfterChange} />
    }
}
