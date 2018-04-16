import React, { Component } from 'react';
import './RuleEdit.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import RuleComponentsList from './RuleComponentsList';

const isNewRule = props => {
  const ruleId = props.match.params.rule_id;
  return ruleId === 'new' || !props.rules || ruleId >= props.rules.size;
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

class RuleEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const rule = currentRule(nextProps);

    return {
      rule: rule,
      newRule: isNewRule(nextProps)
    };
  }

  isValid() {
    const errors = {};

    if (!this.state.rule.get('name')) {
      errors.name = true;
    }

    this.setState({ errors: errors });
    return Object.keys(errors).length === 0;
  }

  handleSave(event) {
    if (!this.isValid()) {
      return false;
    }

    const ruleId = this.props.match.params.rule_id;
    const method = this.state.newRule ? 'addRule' : 'saveRule';

    this.props[method]({
      id: ruleId,
      rule: this.state.rule
    });

    this.props.setCurrentRule(null);
    this.props.history.push('/rules');
  }

  handleNameChange(event) {
    const rule = this.state.rule;
    const newRule = rule.set('name', event.target.value);

    this.props.setCurrentRule(newRule);
    this.setState({ rule: newRule });
  }

  handleCancelClick() {
    this.props.setCurrentRule(null);
  }

  handleDeleteClick(type, index) {
    const rule = this.state.rule.deleteIn([type, index]);

    this.props.setCurrentRule(rule);
    this.setState({ rule: rule });
  }

  render() {
    return (
      <div className="pure-g container">
        <div className="pure-u-1-1">
          <form className="pure-form">
            <fieldset>
              <legend>
                <strong>{this.state.newRule ? 'Create' : 'Edit'} Rule</strong>
              </legend>
              <input
                type="text"
                className={this.state.errors.name ? 'border-error' : ''}
                placeholder="Rule name"
                value={this.state.rule.get('name') || ''}
                onChange={this.handleNameChange.bind(this)}
              />
            </fieldset>
          </form>
          <div className="component-group">
            <strong>Events</strong>
            <RuleComponentsList
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              items={this.state.rule.get('events') || List()}
              type="events"
            />
          </div>
          <div className="component-group">
            <strong>Conditions</strong>
            <RuleComponentsList
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              items={this.state.rule.get('conditions') || List()}
              type="conditions"
            />
          </div>
          <div className="component-group">
            <strong>Actions</strong>
            <RuleComponentsList
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              items={this.state.rule.get('actions') || List()}
              type="actions"
            />
          </div>
          <div className="button-container">
            <button
              onClick={this.handleSave.bind(this)}
              className="pure-button-primary pure-button"
            >
              Save
            </button>
            &nbsp;
            <Link
              onClick={this.handleCancelClick.bind(this)}
              to="/rules"
              className="pure-button"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    currentRule: state.currentRule,
    rules: state.rules
  };
};

const mapDispatch = ({
  rules: { saveRule, addRule },
  currentRule: { setCurrentRule, deleteComponent }
}) => ({
  addRule: payload => addRule(payload),
  saveRule: payload => saveRule(payload),
  setCurrentRule: payload => setCurrentRule(payload)
});

export default withRouter(connect(mapState, mapDispatch)(RuleEdit));
