import './styles.css';
import bem from 'b_' ;
import { Component } from 'react';
import Select from '../select/Select.jsx';

export default class Filters extends Component {

    render() {
        return <div>
            Select value:
            <Select />
        </div>
    }
}
