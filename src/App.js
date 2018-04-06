import React, { Component } from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import RulesList from './components/RulesList';
import RuleEdit from './components/RuleEdit';
import ComponentEdit from './components/ComponentEdit';
import registry from './models/registry';
import currentIframe from './models/currentIframe';
import currentRule from './models/currentRule';
import rules from './models/rules';

const store = init({
  models: {
    rules: rules,
    registry: registry,
    currentIframe: currentIframe,
    currentRule: currentRule
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/editor">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/rules" />} />
            <Route exact path="/rules" component={RulesList} />
            <Route exact path="/rules/:rule_id" component={RuleEdit} />
            <Route
              exact
              path="/rules/:rule_id/:type(events|conditions|actions)/:component_id"
              component={ComponentEdit}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
