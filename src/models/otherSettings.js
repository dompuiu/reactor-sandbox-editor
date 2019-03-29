import { Map } from 'immutable';
import localStorage from '../models/localStorage';

export default {
  state: Map(), // initial state
  reducers: {
    setOtherSettings(state, payload) {
      localStorage.update('otherSettings', payload);
      return payload;
    }
  }
};
