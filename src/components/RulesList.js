import React from 'react';
import List from './List';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const RulesList = ({ rules, deleteRule }) =>
  rules ? (
    <List
      items={rules}
      deleteFn={deleteRule}
      linkPrefix="/rules"
      className="rules-list"
    />
  ) : (
    <div className="big-text">Fetching rules...</div>
  );

const mapState = state => ({
  rules: state.rules
});

const mapDispatch = ({ rules: { deleteRule } }) => ({
  deleteRule: i => deleteRule(i)
});

export default withRouter(connect(mapState, mapDispatch)(RulesList));
