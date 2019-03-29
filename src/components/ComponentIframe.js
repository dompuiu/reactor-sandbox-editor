import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { loadIframe, setPromise } from '@adobe/reactor-bridge';
import './ComponentIframe.css';

setPromise(Promise);

class ComponentIframe extends Component {
  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    this.renderIframe();
  }

  componentDidUpdate() {
    this.dom.innerHTML = '';
    this.renderIframe();
  }

  getUrl() {
    if (!this.props.component) {
      return '';
    }

    const host = this.props.server.get('host');
    const port = this.props.server.get('port');
    let path = this.props.component.get('viewPath');

    if (!path) {
      path = 'noConfigIframe.html';
    }

    return `${host}:${port}/${path}`;
  }

  renderIframe() {
    const url = this.getUrl();
    const openCodeEditorModal = this.props.openCodeEditorModal;
    const openDataElementSelectorModal = this.props
      .openDataElementSelectorModal;
    if (!url) {
      return;
    }

    const extensionInitOptions = {
      settings: this.props.settings && this.props.settings.toJS(),
      company: this.props.otherSettings.get('company').toJS(),
      propertySettings: this.props.propertySettings.toJS(),
      tokens: this.props.otherSettings.get('tokens').toJS()
    };

    if (this.props.extensionConfiguration) {
      extensionInitOptions.extensionSettings = this.props.extensionConfiguration
        .get('settings')
        .toJS();
    }

    const iframeApi = loadIframe({
      url: url,
      container: this.dom,
      extensionInitOptions: extensionInitOptions,
      connectionTimeoutDuration: 30000,
      openCodeEditor(options = {}) {
        return new Promise((resolve, reject) => {
          openCodeEditorModal({
            code: options.code,
            onSave: resolve,
            onClose: reject
          });
        });
      },
      openRegexTester(options = {}) {},
      openDataElementSelector(options = {}) {
        return new Promise((resolve, reject) => {
          openDataElementSelectorModal({
            onSave: resolve,
            onClose: reject
          });
        });
      },
      markAsDirty() {}
    });

    this.props.setCurrentIframe(iframeApi);
  }

  render() {
    return <div className="component-iframe" />;
  }
}

const mapState = state => ({
  propertySettings: state.propertySettings,
  otherSettings: state.otherSettings
});
const mapDispatch = ({
  currentIframe: { setCurrentIframe },
  modals: { openCodeEditorModal, openDataElementSelectorModal }
}) => ({
  setCurrentIframe: payload => setCurrentIframe(payload),
  openCodeEditorModal: payload => openCodeEditorModal(payload),
  openDataElementSelectorModal: payload => openDataElementSelectorModal(payload)
});

export default connect(
  mapState,
  mapDispatch
)(ComponentIframe);
