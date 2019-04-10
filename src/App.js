import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import store, { dispatch } from './store';
import PreloaderRoute from './components/PreloaderRoute';
import Main from './components/Main';
import Settings from './components/Settings';
import PropertySettings from './components/PropertySettings';
import RulesList from './components/RulesList';
import RuleEdit from './components/RuleEdit';
import RuleComponentEdit from './components/RuleComponentEdit';
import DataElementsList from './components/DataElementsList';
import DataElementEdit from './components/DataElementEdit';
import ExtensionConfigurationsList from './components/ExtensionConfigurationsList';
import ExtensionConfigurationEdit from './components/ExtensionConfigurationEdit';

dispatch({ type: 'brain/initialize' });

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <LastLocationProvider>
            <Switch>
              <PreloaderRoute exact path="/" component={Main} />
              <PreloaderRoute exact path="/settings" component={Settings} />
              <PreloaderRoute
                exact
                path="/property_settings"
                component={PropertySettings}
              />
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
          </LastLocationProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
