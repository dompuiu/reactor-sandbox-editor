import { Map } from 'immutable';

export default {
  state: JSON.parse(localStorage.getItem('sandbox-rule-editor-container')) || {
    dataElements: [],
    rules: [],
    extensions: []
  },
  get() {
    return this.state;
  },
  update(key, value) {
    if (key === 'extensions' || key === 'dataElements') {
      value = value.reduce(
        (result, item) => result.set(item.get('name'), item.delete('name')),
        Map()
      );
    } else {
      value = value.toJS();
    }
    this.state[key] = value;

    localStorage.setItem(
      'sandbox-rule-editor-container',
      JSON.stringify(this.state)
    );
  }
};
