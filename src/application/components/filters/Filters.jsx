import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import Select from '../select/Select.jsx';
import Label from '../label/Label.jsx';

const languages = ['JavaScript', 'Java', 'Ruby', 'Objective-C'].map((lang) => ({
    name: lang,
    value: lang
}));

export default class Filters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [{name: 'Any language', value: null}, ...languages]
        }
    }

    onLanguageChange(lang) {
        this.setState({lang})
    }

    render() {
        return <div>
            <Label>Select value:</Label>
            <Select options={this.state.options} value={this.state.lang} onSelect={this.onLanguageChange.bind(this)} />
        </div>
    }
}
