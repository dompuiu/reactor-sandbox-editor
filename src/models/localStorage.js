import { fromJS, Map } from 'immutable';

export default {
  extensionName: null,
  state: Map({
    dataElements: [],
    rules: [],
    extensions: []
  }),
  get() {
    return this.state;
  },
  loadStateFor(extensionName) {
    this.extensionName = extensionName;

    const state = JSON.parse(
      localStorage.getItem(`sandbox-rule-editor-container-${extensionName}`)
    );
    if (state) {
      this.state = fromJS(state);
    }
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
    this.state = this.state.set(key, value);

    if (this.extensionName) {
      localStorage.setItem(
        `sandbox-rule-editor-container-${this.extensionName}`,
        JSON.stringify(this.state.toJS())
      );
    }
  }
};
