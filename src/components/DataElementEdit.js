import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import './ComponentEdit.css';
import ComponentIframe from './ComponentIframe';

const isNewComponent = props => {
  const dataElementId = props.match.params.data_element_id;

  return (
    dataElementId === 'new' ||
    dataElementId >= (props.dataElements || List()).size
  );
};

const getDataElement = props => {
  const dataElementId = props.match.params.data_element_id;
  return (
    (props.dataElements || List()).get(dataElementId) ||
    Map({
      modulePath: '',
      settings: null
    })
  );
};

class DataElementEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.initialize && prevState.dataElement
      ? prevState
      : {
        dataElement: getDataElement(nextProps)
      };
  }

  handleComponentTypeChange(event) {
    this.setState({
      dataElement: this.state.dataElement.merge({
        settings: null,
        modulePath: event.target.value
      })
    });
  }

  dataElementsList() {
    const componentList = {};
    const groupList = [];

    (this.props.registry.getIn(['components', 'dataElements']) || List())
      .valueSeq()
      .forEach(v => {
        if (!componentList[v.get('extensionDisplayName')]) {
          componentList[v.get('extensionDisplayName')] = [];
        }
        componentList[v.get('extensionDisplayName')].push(
          <option
            value={`${v.get('extensionName')}/${v.get('libPath')}`}
            key={`optionType${v.get('libPath')}`}
          >
            {v.get('displayName')}
          </option>
        );
      });

    Object.keys(componentList).forEach(extenisonDisplayName => {
      groupList.push(
        <optgroup
          key={`optGroupExtension${extenisonDisplayName}`}
          label={extenisonDisplayName}
        >
          {componentList[extenisonDisplayName]}
        </optgroup>
      );
    });

    return groupList;
  }

  backLink() {
    return '/data_elements/';
  }

  handleNameChange(event) {
    const dataElement = this.state.dataElement;
    const newDataElement = dataElement.set('name', event.target.value);

    this.setState({ dataElement: newDataElement });
  }

  isValid() {
    const errors = {};

    if (!this.state.dataElement.get('name')) {
      errors.name = true;
    }

    if (!this.state.dataElement.get('modulePath')) {
      errors.modulePath = true;
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
      ? 'addDataElement'
      : 'saveDataElement';

    this.props.currentIframe.promise
      .then(api => Promise.all([api.validate(), api.getSettings()]))
      .then(([isValid, settings]) => {
        if (isValid) {
          this.props[method]({
            id: params.data_element_id,
            dataElement: this.state.dataElement.merge({ settings: settings })
          });

          this.props.history.push(this.backLink());
        }
      });
  }

  render() {
    const props = this.props;

    const componentIframeDetails = props.initialize
      ? props.registry.getIn([
        'components',
        'dataElements',
        this.state.dataElement.get('modulePath')
      ])
      : Map();

    return (
      <div style={{ height: '100%' }}>
        {props.initialize ? (
          <div className="pure-g component-edit-container">
            <div className="pure-u-1-4">
              <div className="component-edit-sidebar">
                <form className="pure-form pure-form-stacked">
                  <fieldset>
                    <h4>Data Element Details</h4>
                    <label htmlFor="dataElementType">Type</label>
                    <select
                      id="dataElementType"
                      className={
                        this.state.errors.modulePath ? 'border-error' : ''
                      }
                      value={this.state.dataElement.get('modulePath')}
                      onChange={this.handleComponentTypeChange.bind(this)}
                    >
                      <option value="">Please select...</option>
                      {this.dataElementsList()}
                    </select>
                    <br />
                    <label htmlFor="dataElementName">Name</label>
                    <input
                      className={this.state.errors.name ? 'border-error' : ''}
                      id="dataElementName"
                      type="text"
                      value={this.state.dataElement.get('name') || ''}
                      onChange={this.handleNameChange.bind(this)}
                    />
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
                settings={this.state.dataElement.get('settings')}
                server={props.registry.getIn(['environment', 'server'])}
              />
            </div>
          </div>
        ) : (
          <div className="big-text">Fetching data...</div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    dataElements: state.dataElements,
    currentIframe: state.currentIframe,
    registry: state.registry,
    initialize: state.initialize
  };
};

const mapDispatch = ({
  dataElements: { saveDataElement, addDataElement }
}) => ({
  saveDataElement: payload => saveDataElement(payload),
  addDataElement: payload => addDataElement(payload)
});

export default withRouter(connect(mapState, mapDispatch)(DataElementEdit));
