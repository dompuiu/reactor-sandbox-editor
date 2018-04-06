import { List } from 'immutable';

export default {
  state: null, // initial state
  reducers: {
    setCurrentRule(state, payload) {
      return payload;
    },
    saveComponent(state, payload) {
      return state.updateIn(
        [payload.type, payload.id],
        item => payload.component
      );
    },
    addComponent(state, payload) {
      return state.update(payload.type, item =>
        (state.get(payload.type) || List()).push(payload.component)
      );
    }
  }
};
