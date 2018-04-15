import React from 'react';
import './RuleComponentsList.css';
import RuleComponentCard from './RuleComponentCard';
import { withRouter } from 'react-router-dom';

const handleOnClick = (type, match, history) => {
  history.push(`/rules/${match.params.rule_id}/${type}/new`);
};

const RuleComponentsList = ({
  items,
  type,
  match,
  history,
  handleDeleteClick
}) => (
  <div>
    <div className="rule-components-list">
      {items.map((item, i) => (
        <RuleComponentCard
          key={`RuleComponentCard${i}`}
          item={item}
          type={type}
          index={i}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>

    <button
      onClick={handleOnClick.bind(this, type, match, history)}
      className="add-button pure-button pure-button-primary"
    >
      Add
    </button>
  </div>
);

export default withRouter(RuleComponentsList);
