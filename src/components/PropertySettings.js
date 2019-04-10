import React, { Component } from 'react';
import { List } from 'immutable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './PropertySettings.css';

class PropertySettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertySettings: props.propertySettings.set(
        'domains',
        props.propertySettings
          .get('domains')
          .toJS()
          .join(', ')
      ),
      errors: {}
    };
  }

  handleDomainsChange(event) {
    this.setState({
      propertySettings: this.state.propertySettings.set(
        'domains',
        event.target.value
      )
    });
  }

  isValid() {
    const errors = {};

    if (!this.state.propertySettings.get('domains')) {
      errors.domains = true;
    }

    this.setState({ errors: errors });
    return Object.keys(errors).length === 0;
  }

  handleSave(event) {
    if (!this.isValid()) {
      return false;
    }

    this.props.setPropertySettings(
      this.state.propertySettings.set(
        'domains',
        List(
          this.state.propertySettings
            .get('domains')
            .split(',')
            .map(s => s.trim())
        )
      )
    );

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="property-settings-container">
        <form className="pure-form pure-form-aligned">
          <fieldset>
            <legend>Property Settings</legend>
            <div className="pure-control-group">
              <label htmlFor="domainsList">Domains List</label>
              <input
                className={`pure-input-1-3 ${
                  this.state.errors.domains ? 'border-error' : ''
                }`}
                id="domainsList"
                type="text"
                value={this.state.propertySettings.get('domains') || ''}
                onChange={this.handleDomainsChange.bind(this)}
              />
              <span className="pure-form-message-inline">
                Comma separated values are accepted.
              </span>
            </div>
            <div className="pure-controls">
              <button
                className="pure-button pure-button-primary"
                onClick={this.handleSave.bind(this)}
              >
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  propertySettings: state.propertySettings
});

const mapDispatch = ({ propertySettings: { setPropertySettings } }) => ({
  setPropertySettings: payload => setPropertySettings(payload)
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(PropertySettings)
);
