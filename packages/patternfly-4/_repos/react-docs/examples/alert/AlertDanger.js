import React from 'react';
import { Alert, AlertVariant, Button } from '@patternfly/react-core';

const AlertDanger = (props) => {
  const type = AlertVariant.danger;
  return (
    <React.Fragment>
      <Alert
        variant={type}
        title={`${type} notification title`}
      >
        This is a description of the notification content
      </Alert>
      <br />
      <Alert
        variant={type}
        action={<Button variant="secondary">Button</Button>}
        title={`${type} notification title`}
      />
      <br />
      <Alert
        variant={type}
        title={`${type} notification title`}
      />
    </React.Fragment>
  );
};

export default AlertDanger;