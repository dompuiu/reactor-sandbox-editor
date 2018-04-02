import React, { Component } from 'react';
import './Rule.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';

class Rule extends Component {
  constructor(props) {
    super(props);

    const ruleId = props.match.params.id;
    this.state = {
      rule: Map(props.rules.get(ruleId) || {}),
      newRule: ruleId != null
    };
  }

  handleSave(event) {
    const ruleId = this.props.match.params.id;

    this.props.saveRule({
      id: ruleId,
      rule: this.state.rule
    });

    this.props.history.push('/rules');
  }

  handleNameChange(event) {
    const rule = this.state.rule;
    const newRule = rule.set('name', event.target.value);

    this.setState({ rule: newRule });
  }

  render() {
    return (
      <div className="pure-g container">
        <div className="pure-u-1-1">
          <form className="pure-form">
            <fieldset>
              <legend>
                <strong>{this.state.newRule ? 'Edit' : 'Create'} Rule</strong>
              </legend>
              <input
                type="text"
                placeholder="Rule name"
                value={this.state.rule.get('name')}
                onChange={this.handleNameChange.bind(this)}
              />
            </fieldset>
          </form>
          <h4>Events</h4>
          <h4>Conditions</h4>
          <h4>Actions</h4>
          <div className="button-container">
            <button
              onClick={this.handleSave.bind(this)}
              className="button-success pure-button"
            >
              Save
            </button>
            &nbsp;
            <Link to="/" className="pure-button">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    rules: state.rules
  };
};

const mapDispatch = ({ rules: { saveRule } }) => ({
  saveRule: payload => saveRule(payload)
});

export default withRouter(connect(mapState, mapDispatch)(Rule));
