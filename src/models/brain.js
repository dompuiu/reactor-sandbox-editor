import { fromJS, Map } from 'immutable';
import environment from './environment';
import { dispatch } from '@rematch/core';

export default {
  state: Map(), // initial state
  reducers: {
    setInitialized(state, payload) {
      return state.set('initialized', payload);
    }
  },
  effects: {
    async loadRegistryData(payload, rootState) {
      const response = await fetch(
        `${environment.server.host}:${
          environment.server.port
        }/editor-registry.js`
      );

      if (response.ok) {
        const data = await response.json();

        dispatch.registry.setRegistry(fromJS(data));
        dispatch.brain.setInitialized(true);
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
        dispatch.extensionConfigurations.setExtensionConfigurations(
          fromJS(containerData.extensions)
        );
        dispatch.rules.setRules(fromJS(containerData.rules));
        dispatch.dataElements.setDataElements(
          fromJS(containerData.dataElements)
        );
      } else {
        dispatch.extensionConfigurations.setExtensionConfigurations(fromJS([]));
        dispatch.rules.setRules(fromJS([]));
        dispatch.dataElements.setDataElements(fromJS([]));
      }
    }
  }
};
