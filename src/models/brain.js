import { fromJS, Map } from 'immutable';
import environment from './environment';
import localStorage from './localStorage';
import { dispatch } from '@rematch/core';

export default {
  state: Map(), // initial state
  reducers: {
    setContainerDataLoaded(state, payload) {
      return state.set('containerDataLoaded', payload);
    },
    setContainerDataReseted(state, payload) {
      return state.set('containerDataReseted', payload);
    },
    setInitialized(state, payload) {
      return state.set('initialized', payload);
    }
  },
  effects: {
    async initialize(payload, rootState) {
      const response = await fetch(
        `${environment.server.host}:${
          environment.server.port
        }/editor-registry.js`
      );

      if (response.ok) {
        const data = await response.json();

        dispatch.registry.setRegistry(fromJS(data));
        this.pushDataDown(localStorage.get());
        this.setInitialized(true);
      }
    },

    async loadContainerData(payload, rootState) {
      const response = await fetch(
        `${environment.server.host}:${
          environment.server.port
        }/editor-container.js`
      );

      if (response.ok) {
        const containerData = await response.json();
        this.pushDataDown(containerData);
        this.setContainerDataLoaded('success');
      } else {
        this.setContainerDataLoaded('failed');
      }
    },

    clearContainerData(payload, rootState) {
      this.pushDataDown({
        extensions: [],
        rules: [],
        dataElements: [],
        property: { settings: {} }
      });

      this.setContainerDataReseted('success');
    },

    pushDataDown(payload, rootState) {
      dispatch.extensionConfigurations.setExtensionConfigurations(
        fromJS(payload.extensions)
      );
      dispatch.rules.setRules(fromJS(payload.rules));
      dispatch.dataElements.setDataElements(fromJS(payload.dataElements));
      dispatch.propertySettings.setPropertySettings(
        fromJS((payload.property && payload.property.settings) || {})
      );
    }
  }
};
