import React, { Component } from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import RulesList from './components/RulesList';
import RuleEdit from './components/RuleEdit';
import ComponentEdit from './components/ComponentEdit';
import registry from './models/registry';
import currentIframe from './models/currentIframe';
import currentRule from './models/currentRule';
import rules from './models/rules';
import initialize from './models/initialize';
import { dispatch } from '@rematch/core';

const store = init({
  models: {
    initialize: initialize,
    rules: rules,
    registry: registry,
    currentIframe: currentIframe,
    currentRule: currentRule
  }
});

dispatch({ type: 'initialize/loadContainer' });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
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
