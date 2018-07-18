const repoMap = {
  'patternfly-core': {
    path: 'repos/patternfly-core',
    url: 'https://github.com/patternfly/patternfly.git',
    branch: 'master-dist'
  },
  'angular-patternfly': {
    path: 'repos/angular-patternfly',
    url: 'https://github.com/patternfly/angular-patternfly.git',
    branch: 'master-dist'
  },
  'patternfly-design': {
    path: 'repos/patternfly-design',
    url: 'https://github.com/patternfly/patternfly-design.git',
    branch: 'master'
  }
};

const keys = Object.keys(repoMap);
keys.forEach(function(key) {
  let repo = repoMap[key];

});