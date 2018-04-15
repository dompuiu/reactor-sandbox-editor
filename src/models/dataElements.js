export default {
  state: null, // initial state
  reducers: {
    setDataElements(state, payload) {
      return payload
        .entrySeq()
        .map(([key, value]) => value.merge({ name: key }));
    },
    addDataElement(state, payload) {
      return state.push(payload.data_element);
    },
    saveDataElement(state, payload) {
      return state.update(payload.id, item => payload.data_element);
    },
    deleteDataElement(state, payload) {
      return state.delete(payload);
    }
  }
};
