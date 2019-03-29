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
        const jsData = fromJS(data);

        dispatch.registry.setRegistry(jsData.delete('currentExtensionName'));
        localStorage.loadStateFor(jsData.get('currentExtensionName'));

        this.pushDataDown(localStorage.get());

        setTimeout(() => {
          this.setInitialized(true);
        }, 0);
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
      this.pushDataDown(
        Map({
          extensions: [],
          rules: [],
          dataElements: [],
          property: { settings: {} }
        })
      );

      this.setContainerDataReseted('success');
    },

    pushDataDown(payload, rootState) {
      dispatch.extensionConfigurations.setExtensionConfigurations(
        fromJS(payload.get('extensions'))
      );
      dispatch.rules.setRules(fromJS(payload.get('rules')));
      dispatch.dataElements.setDataElements(
        fromJS(payload.get('dataElements'))
      );

      dispatch.propertySettings.setPropertySettings(
        fromJS(
          payload.getIn(['property', 'settings']) || {
            domains: ['example.com']
          }
        )
      );
      dispatch.otherSettings.setOtherSettings(
        fromJS(
          payload.get('otherSettings') || {
            company: {
              orgId: 'ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg'
            },
            tokens: {
              imsAccess: 'fake-ims-access-token'
            }
          }
        )
      );
    },

    async save() {
      const response = await fetch(
        `${environment.server.host}:${
          environment.server.port
        }/editor-container.js`,
        {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(localStorage.get().delete('otherSettings'))
        }
      );

      if (response.ok) {
        window.location = `${environment.server.host}:${
          environment.server.port
        }/libSandbox.html`;
      } else {
        alert('Something went bad!');
      }
    }
  }
};
