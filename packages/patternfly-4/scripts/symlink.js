'use strict'
const symlinkDir = require('symlink-dir')
const path = require('path')
 
symlinkDir('node_modules/@patternfly/patternfly-next/src/patternfly/components', 'node_modules/@patternfly/patternfly-next/components')
  .then(result => {
    console.log(result)
    //> { reused: false }
 
    return symlinkDir('src', 'node_modules/src')
  })
  .then(result => {
    console.log(result)
    //> { reused: true }
  })
  .catch(err => console.error(err))