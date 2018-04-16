import React, { Component } from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { dispatch } from '@rematch/core';

import PreloaderRoute from './components/PreloaderRoute';
import Main from './components/Main';
import Settings from './components/Settings';
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
import brain from './models/brain';

const store = init({
  models: {
    brain: brain,
    rules: rules,
    dataElements: dataElements,
    extensionConfigurations: extensionConfigurations,
    registry: registry,
    currentIframe: currentIframe,
    currentRule: currentRule
  }
});

dispatch({ type: 'brain/initialize' });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PreloaderRoute exact path="/" component={Main} />
            <PreloaderRoute exact path="/settings" component={Settings} />
            <PreloaderRoute exact path="/rules" component={RulesList} />
            <PreloaderRoute exact path="/rules/:rule_id" component={RuleEdit} />
            <PreloaderRoute
              exact
              path="/rules/:rule_id/:type(events|conditions|actions)/:component_id"
              component={RuleComponentEdit}
            />
            <PreloaderRoute
              exact
              path="/data_elements"
              component={DataElementsList}
            />
            <PreloaderRoute
              exact
              path="/data_elements/:data_element_id"
              component={DataElementEdit}
            />
            <PreloaderRoute
              exact
              path="/extension_configurations"
              component={ExtensionConfigurationsList}
            />
            <PreloaderRoute
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
