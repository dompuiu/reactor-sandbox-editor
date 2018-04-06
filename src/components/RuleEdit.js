import React, { Component } from 'react';
import './RuleEdit.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';
import ComponentList from './ComponentList';

class RuleEdit extends Component {
  constructor(props) {
    super(props);

    const ruleId = props.match.params.rule_id;
    const rule = this.currentRule(props);

    props.setCurrentRule(rule);

    this.state = {
      rule: rule,
      newRule: ruleId === 'newRule'
    };
  }

  currentRule(props) {
    const ruleId = props.match.params.rule_id;
    if (props.currentRule) {
      return props.currentRule;
    } else if (ruleId === 'new') {
      return fromJS({});
    } else {
      return props.rules.get(ruleId);
    }
  }

  handleSave(event) {
    const ruleId = this.props.match.params.rule_id;
    const method = ruleId === 'new' ? 'addRule' : 'saveRule';

    this.props[method]({
      id: ruleId,
      rule: this.state.rule
    });

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
                placeholder="Rule name"
                value={this.state.rule.get('name') || ''}
                onChange={this.handleNameChange.bind(this)}
              />
            </fieldset>
          </form>
          <div className="component-group">
            <strong>Events</strong>
            <ComponentList
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              items={this.state.rule.get('events') || List()}
              type="events"
            />
          </div>
          <div className="component-group">
            <strong>Conditions</strong>
            <ComponentList
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              items={this.state.rule.get('conditions') || List()}
              type="conditions"
            />
          </div>
          <div className="component-group">
            <strong>Actions</strong>
            <ComponentList
              handleDeleteClick={this.handleDeleteClick.bind(this)}
              items={this.state.rule.get('actions') || List()}
              type="actions"
            />
          </div>
          <div className="button-container">
            <button
              onClick={this.handleSave.bind(this)}
              className="button-success pure-button"
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
