import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from 'containers/app';
import Overview from 'containers/overview';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Overview} />
    </Route>
  </Router>,
  document.getElementById('app')
);
