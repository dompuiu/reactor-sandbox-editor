import { fromJS } from 'immutable';
import environment from './environment';
import { dispatch } from '@rematch/core';

export default {
  state: null, // initial state
  reducers: {
    initCompleted() {
      return true;
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

      const containerData = await responses[0].json();
      const registryData = await responses[1].json();

      dispatch.extensionConfigurations.setExtensionConfigurations(
        fromJS(containerData.extensions)
      );
      dispatch.rules.setRules(fromJS(containerData.rules));
      dispatch.dataElements.setDataElements(fromJS(containerData.dataElements));
      dispatch.registry.setRegistry(fromJS(registryData));
      dispatch.initialize.initCompleted();
    }
  }
};
