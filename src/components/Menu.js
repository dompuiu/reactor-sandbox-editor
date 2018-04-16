import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';

const Menu = ({ match }) => (
  <div className="main-menu">
    <div className="pure-menu pure-menu-horizontal">
      <Link className="pure-menu-heading pure-menu-link" to="/">
        Editor
      </Link>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link
            to="/extension_configurations"
            className={`pure-menu-link ${
              match.path === '/extension_configurations' ? 'menu-selected' : ''
            }`}
          >
            Extension Configurations
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
            to="/settings"
            className={`pure-menu-link ${
              match.path === '/settings' ? 'menu-selected' : ''
            }`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

const mapState = state => ({});
const mapDispatch = () => ({});

export default withRouter(connect(mapState, mapDispatch)(Menu));
