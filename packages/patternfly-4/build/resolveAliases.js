const path = require('path');

module.exports = {
  '@siteComponents': path.resolve(__dirname, '../_repos/core/site/_site'),
  '@components': path.resolve(__dirname, '../_repos/core/patternfly/components'),
  '@layouts': path.resolve(__dirname, '../_repos/core/patternfly/layouts'),
  '@demos': path.resolve(__dirname, '../_repos/core/demos'),
  '@project': path.resolve(__dirname, '../_repos/core'),
  '@patternfly/react-core': path.resolve(__dirname, '../_repos/react-core/src')
};

/*
'@patternfly/react-core': path.resolve(__dirname, '../node_modules/@patternfly/react-lerna-root/packages/react-core/src')
'@reactComponents': path.resolve(__dirname, '../_repos/react/components'),
'@patternfly/react-icons': path.resolve(
  __dirname,
  '../node_modules/@patternfly/react-lerna-root/packages/react-icons/src'
),
'@patternfly/react-styles': path.resolve(
  __dirname,
  '../node_modules/@patternfly/react-lerna-root/packages/react-styles/src'
),
react: path.resolve(__dirname, '../node_modules/react'),
'react-dom': path.resolve(__dirname, '../node_modules/react-dom')
*/