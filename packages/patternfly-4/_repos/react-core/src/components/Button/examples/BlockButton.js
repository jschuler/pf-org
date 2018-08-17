import React from 'react';
import { Button } from '@patternfly/react-core';

class BlockButton extends React.Component {
  static title = 'Block Button';

  render() {
    return <Button isBlock>Block Button</Button>;
  }
}

export default BlockButton;
