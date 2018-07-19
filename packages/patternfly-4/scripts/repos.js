const fs = require('fs-extra');

const reposDir = '_repos';
const sourceCore = 'node_modules/@patternfly/patternfly-next/src';
const destinationCore = '_repos/core';
const sourceReact = 'node_modules/@patternfly/react-lerna-root/packages/react-core/src';
const destinationReact = '_repos/react';

fs.remove(reposDir, (errRemove) => {
  if (errRemove) {
    // eslint-disable-next-line no-console
    return console.error(errRemove);
  }
  // eslint-disable-next-line no-console
  console.log('Removed _repos dir');

  // create directory structure
  fs.ensureDir(destinationCore, (errCreateCore) => {
    if (errCreateCore) {
      // eslint-disable-next-line no-console
      return console.error(errCreateCore);
    }
    // eslint-disable-next-line no-console
    console.log('Created _repos/core dir');

    // Copy files
    fs.copy(sourceCore, destinationCore, (errCopyCore) => {
      if (errCopyCore) {
        // eslint-disable-next-line no-console
        return console.error(errCopyCore);
      }
      // eslint-disable-next-line no-console
      console.log('Copied core src into _repos/core dir');
    });
  });

  // create directory structure
  fs.ensureDir(destinationReact, (errCreateReact) => {
    if (errCreateReact) {
      // eslint-disable-next-line no-console
      return console.error(errCreateReact);
    }
    // eslint-disable-next-line no-console
    console.log('Created _repos/react dir');

    // Copy files
    fs.copy(sourceReact, destinationReact, (errCopyReact) => {
      if (errCopyReact) {
        // eslint-disable-next-line no-console
        return console.error(errCopyReact);
      }
      // eslint-disable-next-line no-console
      console.log('Copied react into _repos dir');
    });
  });
});