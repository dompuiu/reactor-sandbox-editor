import { List } from 'immutable';

export default {
  state: List(), // initial state
  reducers: {
    setDataElements(state, payload) {
      return payload
        .entrySeq()
        .map(([key, value]) => value.merge({ name: key }))
        .toList();
    },
    addDataElement(state, payload) {
      return state.push(payload.dataElement);
    },
    saveDataElement(state, payload) {
      return state.update(payload.id, item => payload.dataElement);
    },
    deleteDataElement(state, payload) {
      return state.delete(payload);
    }
  }
};
