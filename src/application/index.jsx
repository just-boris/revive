import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App.jsx';
import Welcome from './views/welcome/Welcome.jsx';
import Projects from './views/projects/Projects.jsx';
import createHistory from 'history/lib/createHashHistory';

const history = createHistory({queryKey: false});

ReactDOM.render((
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Welcome} />
            <Route path="projects" component={Projects} />
        </Route>
    </Router>
), document.getElementById('app'));
