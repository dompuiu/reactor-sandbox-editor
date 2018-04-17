import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <div className="header">
            <div
              onClick={this.props.onClose}
              title="Delete"
              className="icono-cross"
            />
          </div>
          {this.props.children}
          <div className="footer">
            <button
              className="pure-button-primary pure-button"
              onClick={this.props.onSave}
            >
              Save
            </button>
            &nbsp;
            <button className="pure-button" onClick={this.props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
