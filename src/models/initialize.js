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
    async loadContainer(payload, rootState) {
      const response = await fetch(
        `${environment.server.host}:${
          environment.server.port
        }/editor-container.js`
      );
      const data = await response.json();
      dispatch.rules.setRules(fromJS(data.rules));
      dispatch.initialize.initCompleted();
    }
  }
};
