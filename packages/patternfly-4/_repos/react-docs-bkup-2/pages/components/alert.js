import React from 'react';
import ComponentDocs from '../../components/componentDocs';
import PropTypes from 'prop-types';
import { Alert, AlertVariant, Button } from '@patternfly/react-core';
import Example from '../../components/example';
// import AlertExample from '../../components/examples/Alert';
// import { PrismCode } from 'react-prism';
// require('prismjs');
// require('prismjs/themes/prism.css');

const propTypes = {
  data: PropTypes.any.isRequired
};

function capitalizeFirstLetter(displayString) {
  return displayString.charAt(0).toUpperCase() + displayString.slice(1);
}

const examples = [
  {
    title: `Notification - ${AlertVariant.success}`,
    js: require('../../examples/alert/AlertSuccess'),
    raw: require('!!raw!../../examples/alert/AlertSuccess'),
    github: 'components/alert.js'
  },
  {
    title: `Notification - ${AlertVariant.danger}`,
    js: require('../../examples/alert/AlertDanger'),
    raw: require('!!raw!../../examples/alert/AlertDanger'),
    github: 'components/alert.js'
  },
  {
    title: `Notification - ${AlertVariant.warning}`,
    js: require('../../examples/alert/AlertWarning'),
    raw: require('!!raw!../../examples/alert/AlertWarning'),
    github: 'components/alert.js'
  },
  {
    title: `Notification - ${AlertVariant.info}`,
    js: require('../../examples/alert/AlertInfo'),
    raw: require('!!raw!../../examples/alert/AlertInfo'),
    github: 'components/alert.js'
  }
];

const AlertDocs = ({ data }) => (
  <ComponentDocs data={data}>
    <Example examples={examples} />
  </ComponentDocs>
);

AlertDocs.propTypes = propTypes;

export const query = graphql`
  query AlertDocsQuery {
    componentMetadata(displayName: { eq: "Alert" }) {
      ...ComponentDocs
    }
  }
`;

export default AlertDocs;
