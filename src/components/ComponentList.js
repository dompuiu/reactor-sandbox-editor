import React from 'react';
import './ComponentList.css';
import ComponentCard from './ComponentCard';
import { withRouter } from 'react-router-dom';

const handleOnClick = (type, match, history) => {
  history.push(`/rules/${match.params.rule_id}/${type}/new`);
};

const ComponentList = ({ items, type, match, history, handleDeleteClick }) => (
  <div>
    <div className="component-list">
      {items.map((item, i) => (
        <ComponentCard
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

export default withRouter(ComponentList);
