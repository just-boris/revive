import 'normalize-css/normalize.css';
import 'bem-components-dist/desktop/bem-components.css';

import { Component } from 'react';
import Header from './components/header/Header.jsx';

export default class App extends Component {
    render() {
        return <div>
            <Header />
            {this.props.children}
        </div>
    }
}
