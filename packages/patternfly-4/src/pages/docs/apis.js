import React from 'react';
import { Title, Badge } from '@patternfly/react-core';
import Link from 'gatsby-link';

export default () => {
  return (
    <React.Fragment>
      <Title size="3xl" withMargins>
        API
      </Title>
      <Title size="xl" withMargins>
        A
      </Title>
      <div>
        <Link to="/docs/apis/alert"><Badge>Alert</Badge></Link>
        <Link to="/docs/apis/alertVariant"><Badge>AlertVariant</Badge></Link>
      </div>
      <Title size="xl" withMargins>
        B
      </Title>
      <div>
        <Link to="/docs/apis/button"><Badge>Button</Badge></Link>
      </div>
    </React.Fragment>
  );
}
