import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import RulesList from './components/RulesList';
import Rule from './components/Rule';
import { init } from '@rematch/core';
import rules from './models/rules';
import { Provider } from 'react-redux';

const store = init({
  models: {
    rules: rules
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/rules" />} />
              <Route exact path="/rules" component={RulesList} />
              <Route path="/rules/new" component={Rule} />
              <Route path="/rules/:id" component={Rule} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
