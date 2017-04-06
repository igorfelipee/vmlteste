import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RepoDetails from './components/RepoDetails'
import './index.css';
import {Router,Route, browserHistory} from 'react-router';

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/:repo" component={RepoDetails} />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
