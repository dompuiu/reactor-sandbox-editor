import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Map } from 'immutable';
import Modal from './Modal';
import './ModalCodeEditor.css';

class ModalCodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codeEditorModal: Map()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modals.size === 0) {
      return {
        codeEditorModal: Map()
      };
    }

    return { codeEditorModal: nextProps.modals.getIn(['codeEditorModal']) };
  }

  handleOnSave() {
    this.state.codeEditorModal.get('onSave')(
      this.state.codeEditorModal.get('code')
    );
    this.props.closeCodeEditorModal();
  }

  handleOnClose() {
    this.state.codeEditorModal.get('onClose')();
    this.props.closeCodeEditorModal();
  }

  handleCodeChange(event) {
    this.setState({
      codeEditorModal: this.state.codeEditorModal.set(
        'code',
        event.target.value
      )
    });
  }

  render() {
    const codeEditorModal = this.state.codeEditorModal;

    return (
      <div className="modal-code-editor">
        <Modal
          show={codeEditorModal.get('open')}
          onSave={this.handleOnSave.bind(this)}
          onClose={this.handleOnClose.bind(this)}
        >
          <textarea
            value={codeEditorModal.get('code')}
            onChange={this.handleCodeChange.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  modals: state.modals
});

const mapDispatch = ({ modals: { closeCodeEditorModal } }) => ({
  closeCodeEditorModal: payload => closeCodeEditorModal(payload)
});

export default withRouter(connect(mapState, mapDispatch)(ModalCodeEditor));
