import React from 'react';
import List from './List';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const DataElementsList = ({ dataElements, deleteDataElement }) =>
  dataElements ? (
    <List
      items={dataElements}
      nameProperty="name"
      deleteFn={deleteDataElement}
      linkPrefix="/data_elements"
      className="data-elements-list"
    />
  ) : (
    <div className="big-text">Fetching data elements...</div>
  );

const mapState = state => ({
  dataElements: state.dataElements
});

const mapDispatch = ({ dataElements: { deleteDataElement } }) => ({
  deleteDataElement: i => deleteDataElement(i)
});

export default withRouter(connect(mapState, mapDispatch)(DataElementsList));
