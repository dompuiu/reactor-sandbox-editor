import React from 'react';
import './RulesList.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const RulesList = ({ rules, deleteRule }) => (
  <div className="rules-list">
    <table className="pure-table rule-list-table">
      <thead>
        <tr>
          <th>Rule Name</th>
          <th className="rule-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule, i) => (
          <tr key={`Rule${i}`}>
            <td className="rule-name">{rule.get('name')}</td>
            <td className="rule-actions">
              <Link to={`/rules/${i}`} className="button-success pure-button">
                Edit
              </Link>
              &nbsp;
              <button
                onClick={deleteRule.bind(this, i)}
                className="button-error pure-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {rules.size === 0 ? (
          <tr>
            <td colSpan="2">No rules found.</td>
          </tr>
        ) : null}
      </tbody>
    </table>
    <Link
      to="/rules/new"
      className="pure-button pure-button-primary create-new-rule-button"
    >
      Create new rule
    </Link>
  </div>
);

const mapState = state => ({
  rules: state.rules
});

const mapDispatch = ({ rules: { deleteRule } }) => ({
  deleteRule: i => deleteRule(i)
});

export default withRouter(connect(mapState, mapDispatch)(RulesList));
