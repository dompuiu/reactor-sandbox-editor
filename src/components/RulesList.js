import React from 'react';
import './RulesList.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const RulesList = props => (
  <div className="rules-list">
    <table className="pure-table">
      <thead>
        <tr>
          <th>Rule Name</th>
          <th className="rule-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.rules.map((rule, i) => (
          <tr key={i}>
            <td className="rule-name">{rule.get('name')}</td>
            <td className="rule-actions">
              <Link to={`/rules/${i}`} className="button-success pure-button">
                Edit
              </Link>
              &nbsp;
              <button onClick={props.deleteRule.bind(this, i)} className="button-error pure-button">
                Delete
              </button>
            </td>
          </tr>
        ))}
        {props.rules.size === 0 ? (
          <tr>
            <td colSpan="2">No rules found.</td>
          </tr>
        ) : null}
      </tbody>
    </table>
    <Link to="/rules/new" className="pure-button pure-button-primary create-new-rule-button">
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
