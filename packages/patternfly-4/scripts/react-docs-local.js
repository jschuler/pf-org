const fs = require('fs-extra');

const sourceReactDocs = '/Users/jschuler/Documents/GitHub/patternfly-react-fork/packages/react-docs/src';
const destinationReactDocs = '_repos/react-docs';

fs.remove(destinationReactDocs, (errRemove) => {
if (errRemove) {
  // eslint-disable-next-line no-console
  return console.error(errRemove);
}
// eslint-disable-next-line no-console
console.log('Removed _repos dir');

  // create directory structure
  fs.ensureDir(destinationReactDocs, (errCreateReactDocs) => {
    if (errCreateReactDocs) {
      // eslint-disable-next-line no-console
      return console.error(errCreateReactDocs);
    }
    // eslint-disable-next-line no-console
    console.log('Created _repos/react-docs dir');

    // Copy files
    fs.copy(sourceReactDocs, destinationReactDocs, (errCopyReactDocs) => {
      if (errCopyReactDocs) {
        // eslint-disable-next-line no-console
        return console.error(errCopyReactDocs);
      }
      // eslint-disable-next-line no-console
      console.log('Copied react into _repos dir');
    });
  });

});