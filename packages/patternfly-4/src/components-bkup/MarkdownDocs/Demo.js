import React from 'react';
import PropTypes from 'prop-types';
import MarkdownElement from './MarkdownElement';

import { Button, Collapse } from 'reactstrap';
import { lightTheme, darkTheme, setPrismTheme } from './prism';

function uiThemeSideEffect(theme) {
  setPrismTheme(theme === 'light' ? lightTheme : darkTheme);
}

class Demo extends React.Component {
  state = {
    codeOpen: false,
  };

  handleClickCodeOpen = () => {
    this.setState(state => ({
      codeOpen: !state.codeOpen,
    }));
  };

  componentDidMount() {
    uiThemeSideEffect('dark');
  }

  componentDidUpdate() {
    uiThemeSideEffect('dark');
  }

  render() {
    const { classes, demoOptions, githubLocation, index, js: DemoComponent, raw } = this.props;
    const { codeOpen } = this.state;

    return (
      <div>
        <Button onClick={this.handleClickCodeOpen}>Show Code</Button>
        <Collapse isOpen={codeOpen}>
          <MarkdownElement
            text={`\`\`\`jsx\n${raw}\n\`\`\``}
          />
        </Collapse>
        <div><DemoComponent /></div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object,
  demoOptions: PropTypes.object.isRequired,
  githubLocation: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  js: PropTypes.func.isRequired,
  raw: PropTypes.string.isRequired,
};

export default Demo;
