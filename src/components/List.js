import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';

const List = ({
  items,
  nameProperty,
  deleteFn,
  className,
  addLink,
  linkPrefix
}) => (
  <div className={`list-container ${className}`}>
    <table className="pure-table list-table">
      <thead>
        <tr>
          <th>Name</th>
          <th className="list-item-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={`List${i}`}>
            <td className="list-item-name">{item.get(nameProperty)}</td>
            <td className="list-item-actions">
              <Link
                to={`${linkPrefix}/${i}`}
                className="pure-button-primary pure-button"
              >
                Edit
              </Link>
              &nbsp;
              <button onClick={deleteFn.bind(this, i)} className="pure-button">
                Delete
              </button>
            </td>
          </tr>
        ))}
        {items.size === 0 ? (
          <tr>
            <td colSpan="2">No items found.</td>
          </tr>
        ) : null}
      </tbody>
    </table>
    <Link
      to={`${linkPrefix}/new`}
      className="pure-button pure-button-primary create-new-button"
    >
      Add
    </Link>
  </div>
);

export default List;
