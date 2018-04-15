import React, { Component } from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { dispatch } from '@rematch/core';

import Main from './components/Main';
import RulesList from './components/RulesList';
import RuleEdit from './components/RuleEdit';
import RuleComponentEdit from './components/RuleComponentEdit';
import DataElementsList from './components/DataElementsList';
import DataElementEdit from './components/DataElementEdit';
import ExtensionConfigurationsList from './components/ExtensionConfigurationsList';
import ExtensionConfigurationEdit from './components/ExtensionConfigurationEdit';

import registry from './models/registry';
import currentIframe from './models/currentIframe';
import currentRule from './models/currentRule';
import rules from './models/rules';
import dataElements from './models/dataElements';
import extensionConfigurations from './models/extensionConfigurations';
import initialize from './models/initialize';

const store = init({
  models: {
    initialize: initialize,
    rules: rules,
    dataElements: dataElements,
    extensionConfigurations: extensionConfigurations,
    registry: registry,
    currentIframe: currentIframe,
    currentRule: currentRule
  }
});

dispatch({ type: 'initialize/loadData' });

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
              component={RuleComponentEdit}
            />
            <Route exact path="/data_elements" component={DataElementsList} />
            <Route
              exact
              path="/data_elements/:data_element_id"
              component={DataElementEdit}
            />
            <Route
              exact
              path="/extension_configurations"
              component={ExtensionConfigurationsList}
            />
            <Route
              exact
              path="/extension_configurations/:extension_configuration_id"
              component={ExtensionConfigurationEdit}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
