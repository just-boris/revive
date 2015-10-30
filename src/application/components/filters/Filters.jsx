import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import Select from '../select/Select.jsx';
import Label from '../label/Label.jsx';

const languages = ['JavaScript', 'Java', 'Ruby', 'Objective-C'].map((lang) => ({
    name: lang,
    value: lang
}));

const stars = [
    {name: '> 1000', value: 1000},
    {name: '> 500', value: 500},
    {name: '> 100', value: 100}
];

const dates = [
    {name: 'more than 2 years', value: 24},
    {name: 'more than a year', value: 12},
    {name: 'more than six months', value: 6}
];

const b = bem.with('filters');

export default class Filters extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            languages: [{name: 'Any language', value: null}, ...languages],
            stars,
            dates
        }
    }

    onChange(filter) {
        this.props.onChange(Object.assign({}, this.props.filters, filter));
    }

    render() {
        const filters = this.props.filters;
        return <div>
            <span className={b('filter')}>
                <Label>Language:</Label>
                <Select options={this.state.languages} value={filters.lang} onSelect={(lang)=> this.onChange({lang})} />
            </span>
            <span className={b('filter')}>
                <Label>Stars count:</Label>
                <Select options={this.state.stars} value={filters.fromStars} onSelect={(fromStars)=> this.onChange({fromStars})} />
            </span>
            <span className={b('filter')}>
                <Label>Abandoned time:</Label>
                <Select options={this.state.dates} value={filters.months} onSelect={(months)=> this.onChange({months})} />
            </span>
        </div>
    }
}
