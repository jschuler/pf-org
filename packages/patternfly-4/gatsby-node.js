// exports.modifyWebpackConfig = ({ config, stage }) => {
//   if (stage === 'build-html') {
//     config.loader('null', {
//       test: /patternfly-react/,
//       loader: 'null-loader'
//     })
//   }
// }

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssRequire = require('gatsby-1-config-css-modules');
const path = require('path');
const fs = require('fs-extra');
const inflection = require('inflection');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const glob = require('util').promisify(require('glob'));
const resolveAliases = require('./build/resolveAliases');

const COMPONENTS_PATH = path.resolve(__dirname, './_repos/core/patternfly/components');
const DEMOS_PATH = path.resolve(__dirname, './_repos/core/patternfly/demos');
const LAYOUTS_PATH = path.resolve(__dirname, './_repos/core/patternfly/layouts');

const COMPONENT_PATHS = fs
  .readdirSync(COMPONENTS_PATH)
  .map(name => path.resolve(COMPONENTS_PATH, `./${name}`));

const DEMO_PATH = fs
  .readdirSync(DEMOS_PATH)
  .map(name => path.resolve(DEMOS_PATH, `./${name}`));

const LAYOUT_PATHS = fs
  .readdirSync(LAYOUTS_PATH)
  .map(name => path.resolve(LAYOUTS_PATH, `./${name}`));

const cssModulesConfig = cssRequire.cssModulesConfig;

exports.modifyWebpackConfig = function (_ref, options) {
    var config = _ref.config,
        stage = _ref.stage;

    var sassFiles = /\.s[ac]ss$/;
    var sassModulesFiles = /\.module\.s[ac]ss$/;
    options['sourceMap'] = 'sourceMap';
    var sassLoader = `sass?${JSON.stringify(options)}`;

    config.loader('markdown-loader', current => {
      current.test = /\.md$/;
      current.loader = 'html-loader!markdown-loader';
      return current;
    });
    config.loader('html-loader', current => {
      current.test = /\.html$/;
      current.loader = 'html-loader';
      return current;
    });
    config.loader('handlebars-loader', current => {
      current.test = /\.hbs$/;
      current.loader = 'handlebars-loader';
      current.query = {
        partialDirs: COMPONENT_PATHS.concat(LAYOUT_PATHS).concat(DEMO_PATH)
      };
      return current;
    });

    config.merge({
      resolve: {
        alias: resolveAliases
      }
    });

    switch (stage) {
        case `develop`:
        {
            config.loader(`sass`, {
                test: sassFiles,
                exclude: sassModulesFiles,
                loaders: [`style`, `css`, 'resolve-url-loader', sassLoader]
            });
            return config;
        }
        case `build-css`:
        {
            config.loader(`sass`, {
                test: sassFiles,
                exclude: sassModulesFiles,
                loader: ExtractTextPlugin.extract([`css?minimize`, 'resolve-url-loader', sassLoader])
            });

            config.loader(`sassModules`, {
                test: sassModulesFiles,
                loader: ExtractTextPlugin.extract(`style`, [cssModulesConfig(stage), 'resolve-url-loader', sassLoader])
            });
            return config;
        }
        case `develop-html`:
        case `build-html`:
        case `build-javascript`:
        {
            config.loader(`sass`, {
                test: sassFiles,
                exclude: sassModulesFiles,
                loader: `null`
            });

            config.loader(`sassModules`, {
                test: sassModulesFiles,
                loader: ExtractTextPlugin.extract(`style`, [cssModulesConfig(stage), 'resolve-url-loader', sassLoader])
            });
            return config;
        }
        default:
        {
            return config;
        }
    }
};

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  const PAGES_BASE_DIR = path.resolve(__dirname, './_repos/core/site/pages');
  const COMPONENTS_BASE_DIR = path.resolve(
    __dirname,
    './_repos/core/patternfly/components'
  );
  const DEMOS_BASE_DIR = path.resolve(__dirname, './_repos/core/patternfly/demos');
  const LAYOUTS_BASE_DIR = path.resolve(__dirname, './_repos/core/patternfly/layouts');
  const isMarkdown = node.internal.type === 'MarkdownRemark';

  if (isMarkdown) {
    const isPage = node.fileAbsolutePath.includes(PAGES_BASE_DIR);
    const isComponent = node.fileAbsolutePath.includes(COMPONENTS_BASE_DIR);
    const isLayout = node.fileAbsolutePath.includes(LAYOUTS_BASE_DIR);
    const isDemo = node.fileAbsolutePath.includes(DEMOS_BASE_DIR);
    if (isPage) {
      const relativePath = path.relative(PAGES_BASE_DIR, node.fileAbsolutePath);
      const pagePath = `/${relativePath}`.replace(/\.md$/, '');
      createNodeField({ node, name: 'path', value: pagePath });
      createNodeField({ node, name: 'type', value: 'page' });
      createNodeField({ node, name: 'contentType', value: 'page' });
    } else if (isComponent) {
      const componentName = path.basename(path.dirname(node.fileAbsolutePath));
      const pagePath = `/components/${componentName}/docs`;
      createNodeField({ node, name: 'path', value: pagePath });
      createNodeField({ node, name: 'type', value: 'documentation' });
      createNodeField({ node, name: 'contentType', value: 'component' });
    } else if (isLayout) {
      const layoutName = path.basename(path.dirname(node.fileAbsolutePath));
      const pagePath = `/layouts/${layoutName}/docs`;
      createNodeField({ node, name: 'path', value: pagePath });
      createNodeField({ node, name: 'type', value: 'documentation' });
      createNodeField({ node, name: 'contentType', value: 'layout' });
    } else if (isDemo) {
      const demoName = path.basename(path.dirname(node.fileAbsolutePath));
      const pagePath = `/demos/${demoName}/docs`;
      createNodeField({ node, name: 'path', value: pagePath });
      createNodeField({ node, name: 'type', value: 'documentation' });
      createNodeField({ node, name: 'contentType', value: 'demo' });
    }
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              type
              path
              contentType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.path,
        component: path.resolve(
          __dirname,
          `./_repos/core/site/templates/${node.fields.type}.js`
        ),
        layout: 'index',
        context: {
          pagePath: node.fields.path,
          type: node.fields.type,
          contentType: node.fields.contentType
        }
      });
    });
  });
};

exports.createLayouts = ({
  graphql,
  store,
  boundActionCreators: { createLayout, deleteLayout }
}) =>
  glob(path.resolve(__dirname, '_repos/core/site/layouts/**.js')).then(matches => {
    matches.forEach(layoutFilePath => {
      const id = path.parse(layoutFilePath).name;
      deleteLayout(id);
      createLayout({
        id,
        component: layoutFilePath
      });
    });
  });

exports.onCreatePage = async ({ page, boundActionCreators }) => {
    /*
    const { createPage, deletePage } = boundActionCreators;
    return new Promise(resolve => {
      const oldPage = Object.assign({}, page);
      // Remove trailing slash unless page is /
      page.path = _path => (_path === `/` ? _path : _path.replace(/\/$/, ``));
      if (page.path !== oldPage.path) {
        // Replace new page with old page
        deletePage(oldPage);
        createPage(page);
      }
      resolve();
    });
    */
  const { createPage } = boundActionCreators;
  const CATEGORY_PAGE_REGEX = /^\/(components|layouts|demos)\/$/;
  const CATEGORY_CHILD_PAGE_REGEX = /^\/(components|layouts|demos)\/([A-Za-z0-9_-]+)/;
  return new Promise((resolve, reject) => {
    const isCategoryPage = page.path.match(CATEGORY_PAGE_REGEX);
    const isCategoryChildPage = page.path.match(CATEGORY_CHILD_PAGE_REGEX);

    page.context.type = 'page';
    page.context.category = 'page';
    page.context.slug = '';
    page.context.name = '';
    page.context.title = '';
    page.layout = 'index';

    if (isCategoryPage) {
      page.context.type = 'category';
      page.context.category = page.path.match(CATEGORY_PAGE_REGEX)[1];
    } else if (isCategoryChildPage) {
      const pageCategory = page.path.match(CATEGORY_CHILD_PAGE_REGEX)[1];
      const pageSlug = page.path.match(CATEGORY_CHILD_PAGE_REGEX)[2];
      const pageName = pageSlug.replace('-', ' ');
      const pageTitle = inflection.titleize(pageName);
      page.context.type = inflection.singularize(pageCategory);
      page.context.category = pageCategory;
      page.context.slug = pageSlug;
      page.context.name = pageName;
      page.context.title = pageTitle;
    }
    createPage(page);

    // create full demo page for each component
    const demoPage = Object.assign({}, page);
    demoPage.layout = 'demo';
    const nodePath = demoPage.path;
    demoPage.path = `${nodePath.substr(0, nodePath.length - 1)}-full/`;
    createPage(demoPage);

    resolve();
  });
};