import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import store from './store';

import App from './App.jsx';
import Welcome from './views/welcome/Welcome.jsx';
import Projects from './views/projects/Projects.jsx';


ReactDOM.render((
    <Provider store={store}>
        <ReduxRouter>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="projects" component={Projects} />
            </Route>
        </ReduxRouter>
    </Provider>
), document.getElementById('app'));
