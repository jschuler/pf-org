const shell = require('shelljs');
//shell.exec(comandToExecute, {silent:true}).stdout;

// shell.cd('./node_modules/patternfly-eng-release/scripts');
shell.exec('pwd');
shell.exec('./node_modules/patternfly-eng-release/scripts/_build.sh -o')