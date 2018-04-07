import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';
import './Main.css';

const Main = ({ initialize }) => (
  <div>
    <Menu />
    <div className="big-text">
      {initialize ? (
        <div>
          <div>Welcome to the sandbox editor! </div>
          <div>Start by selecting any option from the menu.</div>
        </div>
      ) : (
        'Fetching data...'
      )}
    </div>
  </div>
);

const mapState = state => ({
  initialize: state.initialize
});

const mapDispatch = () => ({});

export default withRouter(connect(mapState, mapDispatch)(Main));
