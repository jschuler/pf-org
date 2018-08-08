import React from 'react';
import ComponentDocs from '../../components/componentDocs';
import PropTypes from 'prop-types';
import { Alert, AlertVariant, Button } from '@patternfly/react-core';
import Example from '../../components/example';
import { PrismCode } from 'react-prism';
require('prismjs');
require('prismjs/themes/prism-solarizedlight.css');
const AlertExample1Source = require('!!raw!../../components/examples/AlertSuccess1');
const AlertExample2Source = require('!!raw!../../components/examples/AlertSuccess2');
const AlertExample3Source = require('!!raw!../../components/examples/AlertSuccess3');

const propTypes = {
  data: PropTypes.any.isRequired
};

function capitalizeFirstLetter(displayString) {
  return displayString.charAt(0).toUpperCase() + displayString.slice(1);
}

const AlertDocs = ({ data }) => (
  <ComponentDocs data={data}>
    {Object.values(AlertVariant).map((type, key) => (
      <Example title={`Notification - ${type}`} key={key}>
        <Alert
          variant={type}
          title={`${capitalizeFirstLetter(type)} notification title`}
        >
          This is a description of the notification content
        </Alert>
        <pre>
          <PrismCode className="language-jsx">
            {AlertExample1Source}
          </PrismCode>
        </pre>

        <Alert
          variant={type}
          action={<Button variant="secondary">Button</Button>}
          title={`${capitalizeFirstLetter(type)} notification title`}
        />
        <pre>
          <PrismCode className="language-jsx">
            {AlertExample2Source}
          </PrismCode>
        </pre>

        <Alert
          variant={type}
          title={`${capitalizeFirstLetter(type)} notification title`}
        />
        <pre>
          <PrismCode className="language-jsx">
            {AlertExample3Source}
          </PrismCode>
        </pre>
      </Example>
    ))}
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
