import { init } from '@rematch/core';
import registry from './models/registry';
import currentIframe from './models/currentIframe';
import currentRule from './models/currentRule';
import rules from './models/rules';
import dataElements from './models/dataElements';
import propertySettings from './models/propertySettings';
import otherSettings from './models/otherSettings';
import extensionConfigurations from './models/extensionConfigurations';
import brain from './models/brain';
import modals from './models/modals';

const store = init({
  models: {
    brain: brain,
    rules: rules,
    dataElements: dataElements,
    extensionConfigurations: extensionConfigurations,
    registry: registry,
    currentIframe: currentIframe,
    currentRule: currentRule,
    propertySettings: propertySettings,
    otherSettings: otherSettings,
    modals: modals
  }
});

export default store;
export const { dispatch } = store;