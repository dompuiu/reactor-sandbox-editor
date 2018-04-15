import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';

const Menu = ({ initialize, match }) => (
  <div className={initialize ? 'main-menu' : 'hide'}>
    <div className="pure-menu pure-menu-horizontal">
      <Link className="pure-menu-heading pure-menu-link" to="/">
        Editor
      </Link>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link
            to="/rules"
            className={`pure-menu-link ${
              match.path === '/rules' ? 'menu-selected' : ''
            }`}
          >
            Rules
          </Link>
        </li>

        <li className="pure-menu-item">
          <Link
            to="/data_elements"
            className={`pure-menu-link ${
              match.path === '/data_elements' ? 'menu-selected' : ''
            }`}
          >
            Data Elements
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

const mapState = state => ({
  initialize: state.initialize
});

const mapDispatch = () => ({});

export default withRouter(connect(mapState, mapDispatch)(Menu));
