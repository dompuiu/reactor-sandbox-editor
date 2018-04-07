export default {
  state: null, // initial state
  reducers: {
    setRules(state, payload) {
      return payload;
    },
    addRule(state, payload) {
      return state.push(payload.rule);
    },
    saveRule(state, payload) {
      return state.update(payload.id, item => payload.rule);
    },
    deleteRule(state, payload) {
      return state.delete(payload);
    }
  }
};
