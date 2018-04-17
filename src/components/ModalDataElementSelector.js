import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Map, List } from 'immutable';
import Modal from './Modal';
import './ModalDataElementSelector.css';

class ModalDataElementSelectorEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataElementSelectorModal: Map()
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modals.size === 0) {
      return {
        dataElementSelectorModal: Map()
      };
    }

    return {
      dataElementSelectorModal: nextProps.modals.getIn([
        'dataElementSelectorModal'
      ])
    };
  }

  handleOnSave() {
    this.state.dataElementSelectorModal.get('onSave')(
      '%' + this.state.dataElementSelectorModal.get('dataElement') + '%'
    );
    this.props.closeDataElementSelectorModal();
  }

  handleOnClose() {
    this.state.dataElementSelectorModal.get('onClose')();
    this.props.closeDataElementSelectorModal();
  }

  handleDataElementChange(event) {
    this.setState({
      dataElementSelectorModal: this.state.dataElementSelectorModal.set(
        'dataElement',
        event.target.value
      )
    });
  }

  dataElementList() {
    return (this.props.dataElements || List()).valueSeq().map(v => (
      <option
        value={v.get('name')}
        key={`extensionConfiguration${v.get('name')}`}
      >
        {v.get('name')}
      </option>
    ));
  }

  render() {
    const dataElementSelectorModal = this.state.dataElementSelectorModal;
    if (!dataElementSelectorModal) {
      return null;
    }

    return (
      <div className="modal-data-element-selector">
        <Modal
          title="Data Element Selector"
          show={dataElementSelectorModal.get('open')}
          onSave={this.handleOnSave.bind(this)}
          onClose={this.handleOnClose.bind(this)}
        >
          <select
            value={dataElementSelectorModal.get('dataElement')}
            onChange={this.handleDataElementChange.bind(this)}
          >
            <option>Please select...</option>
            {this.dataElementList()}
          </select>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  modals: state.modals,
  dataElements: state.dataElements
});

const mapDispatch = ({ modals: { closeDataElementSelectorModal } }) => ({
  closeDataElementSelectorModal: payload =>
    closeDataElementSelectorModal(payload)
});

export default withRouter(
  connect(mapState, mapDispatch)(ModalDataElementSelectorEditor)
);
