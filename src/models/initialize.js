import { fromJS } from 'immutable';
import environment from './environment';
import { dispatch } from '@rematch/core';

export default {
  state: null, // initial state
  reducers: {
    setInitialize(state, payload) {
      return payload;
    }
  },
  effects: {
    async loadData(payload, rootState) {
      const responses = await Promise.all([
        fetch(
          `${environment.server.host}:${
            environment.server.port
          }/editor-container.js`
        ),
        fetch(
          `${environment.server.host}:${
            environment.server.port
          }/editor-registry.js`
        )
      ]);

      const containerDataResponse = await responses[0];
      if (containerDataResponse.ok) {
        const containerData = containerDataResponse.json();
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

      const registryDataResponse = await responses[1];
      if (registryDataResponse.ok) {
        const registryData = registryDataResponse.json();

        dispatch.registry.setRegistry(fromJS(registryData));
        dispatch.initialize.setInitialize(true);
      }
    }
  }
};
