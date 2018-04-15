import React from 'react';
import List from './List';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ExtensionConfigurationsList = ({
  extensionConfigurations,
  deleteExtensionConfiguration
}) =>
  extensionConfigurations ? (
    <List
      items={extensionConfigurations}
      deleteFn={deleteExtensionConfiguration}
      linkPrefix="/extension_configurations"
      className="extension-configurations-list"
    />
  ) : (
    <div className="big-text">Fetching extension configurations...</div>
  );

const mapState = state => ({
  extensionConfigurations: state.extensionConfigurations
});

const mapDispatch = ({
  extensionConfigurations: { deleteExtensionConfiguration }
}) => ({
  deleteExtensionConfiguration: i => deleteExtensionConfiguration(i)
});

export default withRouter(
  connect(mapState, mapDispatch)(ExtensionConfigurationsList)
);
