const globCB = require(`glob`);
const Promise = require(`bluebird`);
const _ = require(`lodash`);
const chokidar = require(`chokidar`);
const systemPath = require(`path`);
const fs = require(`fs`);

const glob = Promise.promisify(globCB);

const createPath = require(`./create-path`);
const validatePath = require(`./validate-path`);

// Path creator.
// Auto-create pages.
// algorithm is glob /pages directory for js/jsx/cjsx files *not*
// underscored. Then create url w/ our path algorithm *unless* user
// takes control of that page component in gatsby-node.
exports.createPagesStatefully = async (
  { store, boundActionCreators, reporter },
  pluginOptions,
  doneCb
) => {
  const { createPage, deletePage } = boundActionCreators;
  const { program } = store.getState();
  const exts = program.extensions.map(e => `${e.slice(1)}`).join(`,`);

  if (!(pluginOptions && pluginOptions.path)) {
    reporter.panic(`
      "path" is a required option for gatsby-plugin-page-creator
      See docs here - https://www.gatsbyjs.org/packages/gatsby-plugin-page-creator/
      `);
  }

  // Validate that the path exists.
  if (!fs.existsSync(pluginOptions.path)) {
    reporter.panic(`
      The path passed to gatsby-plugin-page-creator does not exist on your file system:
      ${pluginOptions.path}
      Please pick a path to an existing directory.
      `);
  }

  const pagesDirectory = systemPath.posix.join(pluginOptions.path);
  const pagesGlob = `${pagesDirectory}/**/*.{${exts}}`;

  // Get initial list of files.
  let files = await glob(pagesGlob);
  files.forEach(file => _createPage(file, pagesDirectory, createPage));

  // Listen for new component pages to be added or removed.
  chokidar
    .watch(pagesGlob)
    .on(`add`, path => {
      if (!_.includes(files, path)) {
        _createPage(path, pagesDirectory, createPage);
        files.push(path);
      }
    })
    .on(`unlink`, path => {
      // Delete the page for the now deleted component.
      store
        .getState()
        .pages.filter(p => p.component === path)
        .forEach(page => {
          deletePage({
            path: createPath(pagesDirectory, path),
            component: path
          });
          files = files.filter(f => f !== path);
        });
    })
    .on(`ready`, () => doneCb());
};
const _createPage = (filePath, pagesDirectory, createPage) => {
  // Filter out special components that shouldn't be made into
  // pages.
  if (!validatePath(systemPath.posix.relative(pagesDirectory, filePath))) {
    return;
  }

  // took out 'demos' as it is displayed separately on Protoype page for now
  const coreComponentPathRegEx = /\/core\/patternfly\/(components|layouts|utilities)\//;

  const prefixThis = ['/components/', '/layouts/', '/demos/', '/styles/', '/utilities/'];
  let path = createPath(pagesDirectory, filePath);
  if (coreComponentPathRegEx.test(filePath)) {
    path = `/docs/core${path}`;
  }
  // console.log(`\n\npagesDirectory: ${pagesDirectory}\nfilePath ${filePath}`);

  // Create page object
  const page = {
    path,
    component: filePath,
    layout: 'index'
  };
  // Add page
  createPage(page);
};
