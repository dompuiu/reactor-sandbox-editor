import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import './ComponentEditSidebar.css';
import ComponentIframe from './ComponentIframe';

const isNewComponent = props => {
  const extensionConfigurationId =
    props.match.params.extension_configuration_id;

  return (
    extensionConfigurationId === 'new' ||
    extensionConfigurationId >= (props.extensionConfigurations || List()).size
  );
};

const getExtensionConfiguration = props => {
  const extensionConfigurationId =
    props.match.params.extension_configuration_id;
  return (
    (props.extensionConfigurations || List()).get(extensionConfigurationId) ||
    Map({
      name: '',
      settings: null
    })
  );
};

class ExtensionConfigurationEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.extensionConfiguration
      ? prevState
      : {
        extensionConfiguration: getExtensionConfiguration(nextProps)
      };
  }

  handleNameChange(event) {
    this.setState({
      extensionConfiguration: this.state.extensionConfiguration.merge({
        settings: null,
        name: event.target.value
      })
    });
  }

  extensionConfigurationList() {
    return (this.props.registry.get('extensions') || List())
      .filter(i => i.get('viewPath'))
      .valueSeq()
      .map(v => (
        <option
          value={v.get('name')}
          key={`extensionConfiguration${v.get('name')}`}
        >
          {v.get('displayName')}
        </option>
      ));
  }

  backLink() {
    return '/extension_configurations/';
  }

  isValid() {
    const errors = {};

    if (!this.state.extensionConfiguration.get('name')) {
      errors.name = true;
    }

    this.setState({ errors: errors });
    return Object.keys(errors).length === 0;
  }

  handleSave(event) {
    if (!this.isValid()) {
      return false;
    }

    const params = this.props.match.params;
    const method = isNewComponent(this.props)
      ? 'addExtensionConfiguration'
      : 'saveExtensionConfiguration';

    const displayName = this.props.registry.getIn([
      'extensions',
      this.state.extensionConfiguration.get('name'),
      'displayName'
    ]);

    this.props.currentIframe.promise
      .then(api => Promise.all([api.validate(), api.getSettings()]))
      .then(([isValid, settings]) => {
        if (isValid) {
          this.props[method]({
            id: params.extension_configuration_id,
            extensionConfiguration: this.state.extensionConfiguration.merge({
              displayName: displayName,
              settings: settings
            })
          });

          this.props.history.push(this.backLink());
        }
      });
  }

  render() {
    const props = this.props;

    const componentIframeDetails = props.registry.getIn([
      'extensions',
      this.state.extensionConfiguration.get('name')
    ]);

    return (
      <div className="pure-g component-edit-container">
        <div className="pure-u-1-4">
          <div className="component-edit-sidebar">
            <form className="pure-form pure-form-stacked">
              <fieldset>
                <h4>Extension Configuration Name</h4>
                <label htmlFor="extensionConfigurationName">Name</label>
                <select
                  id="extensionConfigurationName"
                  className={this.state.errors.name ? 'border-error' : ''}
                  value={this.state.extensionConfiguration.get('name')}
                  onChange={this.handleNameChange.bind(this)}
                >
                  <option value="">Please select...</option>
                  {this.extensionConfigurationList()}
                </select>
              </fieldset>
            </form>

            <div className="button-container">
              <button
                className="button-success pure-button"
                onClick={this.handleSave.bind(this)}
              >
                Save
              </button>
              &nbsp;
              <Link to={this.backLink()} className="pure-button">
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <div className="pure-u-3-4">
          <ComponentIframe
            component={componentIframeDetails}
            settings={this.state.extensionConfiguration.get('settings')}
            server={props.registry.getIn(['environment', 'server'])}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    extensionConfigurations: state.extensionConfigurations,
    currentIframe: state.currentIframe,
    registry: state.registry
  };
};

const mapDispatch = ({
  extensionConfigurations: {
    saveExtensionConfiguration,
    addExtensionConfiguration
  }
}) => ({
  saveExtensionConfiguration: payload => saveExtensionConfiguration(payload),
  addExtensionConfiguration: payload => addExtensionConfiguration(payload)
});

export default withRouter(
  connect(mapState, mapDispatch)(ExtensionConfigurationEdit)
);
