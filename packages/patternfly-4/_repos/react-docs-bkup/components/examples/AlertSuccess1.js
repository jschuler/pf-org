import React from 'react';
import { Alert } from '@patternfly/react-core';

const Example = (props) => {
  return (
    <Alert
      variant={'success'}
      title={'Success notification title'}
    >
      This is a description of the notification content
    </Alert>
  );
};