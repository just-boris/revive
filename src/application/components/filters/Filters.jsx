import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import Select from '../select/Select.jsx';
import StatsFilter from '../stars-filter/StarsFilter.jsx';
import TimeFilter from '../time-filter/TimeFilter.jsx';
import Label from '../label/Label.jsx';
import languageData from './languages.js';

const languages = languageData.map((lang) => ({
    name: lang,
    value: lang
}));

const b = bem.with('filters');

export default class Filters extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.launguages = [{name: 'Any language', value: null}, ...languages];
    }

    onChange(filter) {
        this.props.onChange(Object.assign({}, this.props.filters, filter));
    }

    onChangeLang(lang) {
        if(lang === null) {
            lang = undefined;
        }
        this.onChange({lang});
    }

    render() {
        const filters = this.props.filters;
        return (<div className={b()}>
            <span className={b('filter')}>
                <Label>Language:</Label>
                <Select options={this.launguages} value={filters.lang} onSelect={this.onChangeLang.bind(this)} />
            </span>
            <span className={[b('filter'), b('slider')].join(' ')}>
                <Label>Stars count:</Label>
                <StatsFilter defaultValue={[filters.fromStars, filters.toStars]}
                    onAfterChange={([fromStars, toStars]) => this.onChange({fromStars, toStars})} />
            </span>
            <span className={[b('filter'), b('slider')].join(' ')}>
                <Label>Time since last commit:</Label>
                <TimeFilter defaultValue={[filters.fromMonths, filters.toMonths]}
                    onAfterChange={([fromMonths, toMonths]) => this.onChange({fromMonths, toMonths})} />
            </span>
        </div>);
    }
}
