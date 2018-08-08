import React from 'react';
import ComponentDocs from '../../components/componentDocs';
import PropTypes from 'prop-types';
import { AlertAction } from '@patternfly/react-core';
import Example from '../../components/example';

const propTypes = {
  data: PropTypes.any.isRequired
};

function capitalizeFirstLetter(displayString) {
  return displayString.charAt(0).toUpperCase() + displayString.slice(1);
}

const AlertDocs = ({ data }) => (
  <ComponentDocs data={data}>
  </ComponentDocs>
);

AlertDocs.propTypes = propTypes;

export const query = graphql`
  query AlertActionDocsQueryApi {
    componentMetadata(displayName: { eq: "Alert" }) {
      ...ComponentDocs
    }
  }
`;

export default AlertDocs;
