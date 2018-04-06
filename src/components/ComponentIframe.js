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
    if (!url) {
      return;
    }

    const iframeApi = loadIframe({
      url: url,
      container: this.dom,
      extensionInitOptions: {
        settings: this.props.settings.toJS()
      },
      connectionTimeoutDuration: 30000,
      openCodeEditor(options = {}) {},
      openRegexTester(options = {}) {},
      openDataElementSelector(options = {}) {},
      openCssSelector() {},
      markAsDirty() {}
    });

    this.props.setCurrentIframe(iframeApi);
  }

  render() {
    return <div className="component-iframe" />;
  }
}

const mapState = state => ({});
const mapDispatch = ({ currentIframe: { setCurrentIframe } }) => ({
  setCurrentIframe: payload => setCurrentIframe(payload)
});

export default connect(mapState, mapDispatch)(ComponentIframe);
