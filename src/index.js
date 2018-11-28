import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import {
    Router,
    Route,
    Switch
    } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import './index.scss';
import './toastr.scss';
import { Login } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const store = configureStore();

const app = document.getElementById('root');
const history = createBrowserHistory();

render(
    <Provider store={store}>
        <Router history={history}>
        <Switch>
            <Route
                exact
                path="/"
                component={Login}
            />
            <Route
                path="/dashboard"
                component={Dashboard}
            />
        </Switch>
        </Router>
    </Provider>, app);
registerServiceWorker();
