import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import Routes from '../../ui/routes';


const Root = props => (
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>{Routes}
    </Router>
);
ReactDOM.render(<Root />, document.getElementById('main'));
