export default {
  state: null, // initial state
  reducers: {
    setExtensionConfigurations(state, payload) {
      return payload
        .entrySeq()
        .map(([key, value]) => value.merge({ name: key }))
        .toList();
    },
    addExtensionConfiguration(state, payload) {
      return state.push(payload.extensionConfiguration);
    },
    saveExtensionConfiguration(state, payload) {
      return state.update(payload.id, item => payload.extensionConfiguration);
    },
    deleteExtensionConfiguration(state, payload) {
      return state.delete(payload);
    }
  }
};
