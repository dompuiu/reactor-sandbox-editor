import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import './ComponentEditSidebar.css';
import ComponentIframe from './ComponentIframe';

const isNewComponent = props => {
  const componentId = props.match.params.component_id;
  const type = props.match.params.type;

  return (
    componentId === 'new' ||
    !props.currentRule ||
    componentId >= (props.currentRule.get(type) || List()).size
  );
};

const currentRule = props => {
  const ruleId = props.match.params.rule_id;
  let rule;

  if (props.currentRule && props.currentRule.get('rule_id') === ruleId) {
    rule = props.currentRule;
  } else {
    rule = (props.rules || List()).get(ruleId) || Map();
  }
  rule = rule.set('rule_id', ruleId);
  return rule;
};

const getComponent = props => {
  const type = props.match.params.type;
  const componentId = props.match.params.component_id;

  const rule = currentRule(props);
  return (
    rule.getIn([type, componentId]) ||
    Map({
      modulePath: '',
      settings: null
    })
  );
};

class RuleComponentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    nextProps.setCurrentRule(currentRule(nextProps));

    return prevState.component
      ? prevState
      : {
        component: getComponent(nextProps)
      };
  }

  handleComponentTypeChange(event) {
    this.setState({
      component: this.state.component.merge({
        settings: null,
        modulePath: event.target.value
      })
    });
  }

  handleInputChange(fieldName, event) {
    const component = this.state.component;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newComponent = component.set(fieldName, value);

    this.setState({ component: newComponent });
  }

  handleSave(event) {
    if (!this.isValid()) {
      return false;
    }

    const params = this.props.match.params;

    const method = isNewComponent(this.props)
      ? 'addComponent'
      : 'saveComponent';

    this.props.currentIframe.promise
      .then(api => Promise.all([api.validate(), api.getSettings()]))
      .then(([isValid, settings]) => {
        if (isValid) {
          this.props[method]({
            id: params.component_id,
            type: params.type,
            component: this.state.component.merge({ settings: settings })
          });

          this.props.history.push(this.backLink());
        }
      });
  }

  componentList() {
    const type = this.props.match.params.type;
    const componentList = {};
    const groupList = [];

    (this.props.registry.getIn(['components', type]) || List())
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

  isValid() {
    const errors = {};

    if (!this.state.component.get('modulePath')) {
      errors.modulePath = true;
    }

    this.setState({ errors: errors });
    return Object.keys(errors).length === 0;
  }

  backLink() {
    const ruleId = this.props.match.params.rule_id;
    return `/rules/${ruleId}`;
  }

  render() {
    const props = this.props;

    const componentIframeDetails = props.registry.getIn([
      'components',
      props.match.params.type,
      this.state.component.get('modulePath')
    ]);

    return (
      <div className="pure-g component-edit-container">
        <div className="pure-u-1-4">
          <div className="component-edit-sidebar">
            <form className="pure-form pure-form-stacked">
              <fieldset>
                <h4>Component Details</h4>
                <label htmlFor="componentType">Type</label>
                <select
                  id="componentType"
                  className={this.state.errors.modulePath ? 'border-error' : ''}
                  value={this.state.component.get('modulePath')}
                  onChange={this.handleComponentTypeChange.bind(this)}
                >
                  <option value="">Please select...</option>
                  {this.componentList()}
                </select>
                <br />
                <label htmlFor="order">Order</label>
                <input
                  id="order"
                  type="text"
                  value={this.state.component.get('order') || '50'}
                  onChange={this.handleInputChange.bind(this, 'order')}
                />
              </fieldset>
            </form>

            <div className="button-container">
              <button
                className="pure-button-primary pure-button"
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
            settings={this.state.component.get('settings')}
            server={props.registry.getIn(['environment', 'server'])}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    rules: state.rules,
    currentRule: state.currentRule,
    currentIframe: state.currentIframe,
    registry: state.registry
  };
};

const mapDispatch = ({
  rules: { saveRule },
  currentRule: { setCurrentRule, saveComponent, addComponent }
}) => ({
  saveRule: payload => saveRule(payload),
  setCurrentRule: payload => setCurrentRule(payload),
  saveComponent: payload => saveComponent(payload),
  addComponent: payload => addComponent(payload)
});

export default withRouter(connect(mapState, mapDispatch)(RuleComponentEdit));
