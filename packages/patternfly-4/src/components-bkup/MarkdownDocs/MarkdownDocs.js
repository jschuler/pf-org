import React from 'react';
import PropTypes from 'prop-types';
// import kebabCase from 'lodash/kebabCase';
// import warning from 'warning';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import MarkdownElement from './MarkdownElement';
// import Head from 'docs/src/modules/components/Head';
// import AppContent from 'docs/src/modules/components/AppContent';
import Demo from './Demo';
// import Carbon from 'docs/src/modules/components/Carbon';
// import AppFrame from 'docs/src/modules/components/AppFrame';
import {
  getHeaders,
  getContents,
  getTitle,
  getDescription,
} from './parseMarkdown';

const styles = theme => ({
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit}px`,
  },
});

const demoRegexp = /^"demo": "(.*)"/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/tree/master';

function MarkdownDocs(props, context) {
  const { demos, markdown, markdownLocationProp } = props;
  // const DemoComponent = demos[0].js;
  const contents = getContents(markdown);
  const headers = getHeaders(markdown);

  let markdownLocation = '/app-bar';//markdownLocationProp || context.activePage.pathname;

  if (!markdownLocationProp) {
    const token = markdownLocation.split('/');
    token.push(token[token.length - 1]);
    markdownLocation = token.join('/');

    if (headers.filename) {
      markdownLocation = headers.filename;
    } else {
      markdownLocation = `/src/demos${markdownLocation}.md`;
    }
  }

  const section = markdownLocation.split('/')[4];

  return (
    <div>
      <div>{getTitle(markdown)}</div>
      <div>{getDescription(markdown)}</div>

      {contents.map((content, index) => {
        const match = content.match(demoRegexp);

        if (match && demos) {
          const demoOptions = JSON.parse(`{${content}}`);
          const name = demoOptions.demo;
          let DemoComponent = demos[name].js;
          // warning(demos && demos[name], `Missing demo: ${name}.`);
          return (
            // <div>{DemoComponent}</div>
            <Demo
              key={content}
              js={demos[name].js}
              raw={demos[name].raw}
              index={index}
              demoOptions={demoOptions}
              githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
            />
          );
        }

        // return (
        //   <MarkdownElement className={classes.markdownElement} key={content} text={content} />
        // );
      })}
    </div>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object,
  demos: PropTypes.object,
  disableCarbon: PropTypes.bool,
  markdown: PropTypes.string.isRequired,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
};

MarkdownDocs.defaultProps = {
  disableCarbon: false,
};

MarkdownDocs.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default MarkdownDocs;
