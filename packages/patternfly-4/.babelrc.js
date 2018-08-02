const babelENV = process.env.BABEL_ENV || 'development';
const modules = babelENV !== 'production:esm' ? 'commonjs' : false;

module.exports = {
  plugins: [
    [
      'transform-imports',
      {
        '@patternfly/react-icons': {
          kebabCase: true,
          preventFullImport: true,
          transform: importName => {
            if (importName.toLowerCase() === 'icon') {
              console.log('Icon import is not allowed');
              throw new Error('Icon import is not allowed');
            }
            const importPath = `icons/${importName}`;
            if (!modules) {
              console.log('No modules');
              return `@patternfly/react-icons/dist/esm/${importPath}`;
            }
            console.log(`cool: @patternfly/react-icons/dist/js/${importPath}`);
            return `@patternfly/react-icons/dist/js/${importPath}`;
          }
        }
      }
    ]
  ].filter(Boolean),
  ignore: (() => {
    const ignore = [
      'src/**/__snapshots__',
      'src/**/*.stories.js',
      'src/**/Stories'
    ];
    if (babelENV.includes('production')) {
      ignore.push('test.js', '__mocks__');
    }
    return ignore;
  })()
};