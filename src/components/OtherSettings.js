import React, { Component } from 'react';
import { Map } from 'immutable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './OtherSettings.css';

class OtherSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otherSettings: Map({
        company: {
          orgId: ''
        }
      }),
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  handleOrgIdChange(event) {
    this.setState({
      otherSettings: this.state.otherSettings.setIn(
        ['company', 'orgId'],
        event.target.value
      )
    });
  }

  handleImsChange(event) {
    this.setState({
      otherSettings: this.state.otherSettings.setIn(
        ['tokens', 'imsAccess'],
        event.target.value
      )
    });
  }

  isValid() {
    const errors = {};

    if (!this.state.otherSettings.getIn(['company', 'orgId'])) {
      errors.orgId = true;
    }

    if (!this.state.otherSettings.getIn(['tokens', 'imsAccess'])) {
      errors.imsAccess = true;
    }

    this.setState({ errors: errors });
    return Object.keys(errors).length === 0;
  }

  handleSave(event) {
    if (!this.isValid()) {
      return false;
    }

    this.props.setOtherSettings(this.state.otherSettings);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="other-settings-container">
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <legend>Company Settings</legend>
            <div className="pure-control-group">
              <label htmlFor="orgId">Organization ID</label>
              <input
                className={`pure-input-2-3 ${
                  this.state.errors.orgId ? 'border-error' : ''
                }`}
                id="orgId"
                type="text"
                value={
                  this.state.otherSettings.getIn(['company', 'orgId']) || ''
                }
                onChange={this.handleOrgIdChange.bind(this)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Tokens</legend>
            <div className="pure-control-group">
              <label htmlFor="imsAccess">IMS Token</label>
              <input
                className={`pure-input-2-3 ${
                  this.state.errors.imsAccess ? 'border-error' : ''
                }`}
                id="imsAccess"
                type="text"
                value={
                  this.state.otherSettings.getIn(['tokens', 'imsAccess']) || ''
                }
                onChange={this.handleImsChange.bind(this)}
              />
            </div>
            <div className="pure-controls">
              <a
                className="pure-button pure-button-primary"
                onClick={this.handleSave.bind(this)}
              >
                Save
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  otherSettings: state.otherSettings
});

const mapDispatch = ({ otherSettings: { setOtherSettings } }) => ({
  setOtherSettings: payload => setOtherSettings(payload)
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(OtherSettings)
);
