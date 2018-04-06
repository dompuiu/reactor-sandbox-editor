import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map, List, fromJS } from 'immutable';
import './ComponentEdit.css';
import ComponentIframe from './ComponentIframe';

class ComponentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: this.getComponent(props)
    };
  }

  getComponent(props) {
    const type = props.match.params.type;
    const componentId = props.match.params.component_id;

    if (componentId === 'new') {
      return fromJS({
        modulePath: '',
        settings: {}
      });
    }

    return this.currentRule(props).getIn([type, componentId]);
  }

  currentRule(props) {
    const ruleId = props.match.params.rule_id;
    if (props.currentRule) {
      return props.currentRule;
    } else {
      const rule = props.rules.get(ruleId);
      props.setCurrentRule(rule);
      return rule;
    }
  }

  handleComponentTypeChange(event) {
    this.setState({
      component: this.state.component.merge({
        settings: Map(),
        modulePath: event.target.value
      })
    });
  }

  componentList() {
    const type = this.props.match.params.type;

    return (this.props.registry.getIn(['components', type]) || List())
      .valueSeq()
      .map(v => (
        <option
          value={`${v.get('extensionName')}/${v.get('libPath')}`}
          key={`optionType${v.get('libPath')}`}
        >{`${v.get('displayName')} (${v.get('extensionDisplayName')})`}</option>
      ));
  }

  backLink() {
    const ruleId = this.props.match.params.rule_id;
    return `/rules/${ruleId}`;
  }

  handleSave(event) {
    const componentId = this.props.match.params.component_id;
    const type = this.props.match.params.type;
    const method = componentId === 'new' ? 'addComponent' : 'saveComponent';

    this.props.currentIframe.promise
      .then(api => Promise.all([api.validate(), api.getSettings()]))
      .then(([isValid, settings]) => {
        if (isValid) {
          this.props[method]({
            id: componentId,
            type: type,
            component: this.state.component.merge({ settings: settings })
          });

          this.props.history.push(this.backLink());
        }
      });
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
                <label htmlFor="componentType">Component Type</label>
                <select
                  id="componentType"
                  value={this.state.component.get('modulePath')}
                  onChange={this.handleComponentTypeChange.bind(this)}
                >
                  <option>Please select...</option>
                  {this.componentList()}
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

export default withRouter(connect(mapState, mapDispatch)(ComponentEdit));
