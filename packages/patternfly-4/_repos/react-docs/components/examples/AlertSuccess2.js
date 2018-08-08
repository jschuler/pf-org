import React from 'react';
import { Alert } from '@patternfly/react-core';

const Example = (props) => {
  return (
    <Alert
      variant={'success'}
      action={<Button variant="secondary">Button</Button>}
      title={'Success notification title'}
    />
  );
};