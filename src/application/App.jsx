import 'normalize-css/normalize.css';
import 'bem-components-dist/desktop/bem-components.css';
import './styles.css';

import { Component } from 'react';
import Header from './components/header/Header.jsx';
import { connect } from 'react-redux';
import Jumbotron from './components/jumbotron/Jumbotron.jsx';

@connect(state => state.router)
class App extends Component {
    isRootRoute() {
        return this.props.location.pathname === "/"
    }

    render() {
        return <div>
            <Header />
            <Jumbotron expanded={this.isRootRoute()} />
            {this.props.children}
        </div>
    }
}

export default App;
