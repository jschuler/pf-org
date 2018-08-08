const path = require('path');
const fs = require('fs-extra');
const inflection = require('inflection');
const pascalCase = require('pascal-case');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const glob = require('util').promisify(require('glob'));
const resolveAliases = require('./build/resolveAliases');
const { createFilePath } = require('gatsby-source-filesystem');
const Webpack = require('webpack');

const COMPONENTS_PATH = path.resolve(__dirname, './_repos/core/patternfly/components');
const DEMOS_PATH = path.resolve(__dirname, './_repos/core/patternfly/demos');
const LAYOUTS_PATH = path.resolve(__dirname, './_repos/core/patternfly/layouts');
const UTILITIES_PATH = path.resolve(__dirname, './_repos/core/patternfly/utilities');

const COMPONENT_PATHS = fs.readdirSync(COMPONENTS_PATH).map(name => path.resolve(COMPONENTS_PATH, `./${name}`));
const DEMO_PATH = fs.readdirSync(DEMOS_PATH).map(name => path.resolve(DEMOS_PATH, `./${name}`));
const LAYOUT_PATHS = fs.readdirSync(LAYOUTS_PATH).map(name => path.resolve(LAYOUTS_PATH, `./${name}`));
const UTILITIES_PATHS = fs.readdirSync(UTILITIES_PATH).map(name => path.resolve(UTILITIES_PATH, `./${name}`));
const reactComponentPathRegEx = /\/react-docs\/pages\/(components|layouts|apis)\//;
const coreComponentPathRegEx = /(\/core\/patternfly\/components|\/core\/patternfly\/layouts)\//;

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  const PAGES_BASE_DIR = path.resolve(__dirname, './_repos/core/site/pages');
  const COMPONENTS_BASE_DIR = path.resolve(__dirname, './_repos/core/patternfly/components');
  const DEMOS_BASE_DIR = path.resolve(__dirname, './_repos/core/patternfly/demos');
  const LAYOUTS_BASE_DIR = path.resolve(__dirname, './_repos/core/patternfly/layouts');
  const UTILITIES_BASE_DIR = path.resolve(__dirname, './_repos/core/patternfly/utilities');
  const isMarkdown = node.internal.type === 'MarkdownRemark';
  const isSitePage = node.internal.type === 'SitePage';

  if (isSitePage) {
    if (reactComponentPathRegEx.test(node.componentPath)) {
      const pathLabel = node.path
        .split('/')
        .filter(Boolean)
        .pop();
      createNodeField({
        node,
        name: 'label',
        value: pascalCase(pathLabel)
      });
      createNodeField({
        node,
        name: 'system',
        value: 'react'
      });
    } else if (coreComponentPathRegEx.test(node.componentPath)) {
      createNodeField({
        node,
        name: 'system',
        value: 'core'
      });
    } else {
      createNodeField({
        node,
        name: 'system',
        value: 'something_else'
      });
    }

  } else if (isMarkdown) {
    if (!node.fileAbsolutePath) {
      return;
    }
    if (node.fileAbsolutePath.includes('react')) {
      console.log(`REACT COMPONENT`);
    }
    const isPage = node.fileAbsolutePath.includes(PAGES_BASE_DIR);
    const isComponent = node.fileAbsolutePath.includes(COMPONENTS_BASE_DIR);
    const isLayout = node.fileAbsolutePath.includes(LAYOUTS_BASE_DIR);
    const isDemo = node.fileAbsolutePath.includes(DEMOS_BASE_DIR);
    const isUtility = node.fileAbsolutePath.includes(UTILITIES_BASE_DIR);
    if (isPage) {
      const relativePath = path.relative(PAGES_BASE_DIR, node.fileAbsolutePath);
      const pagePath = `/${relativePath}`.replace(/\.md$/, '');
      console.log(`isPage: ${pagePath}`);
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
    } else if (isUtility) {
      const utilityName = path.basename(path.dirname(node.fileAbsolutePath));
      const pagePath = `/utilities/${utilityName}/docs`;
      createNodeField({ node, name: 'path', value: pagePath });
      createNodeField({ node, name: 'type', value: 'documentation' });
      createNodeField({ node, name: 'contentType', value: 'utility' });
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
      if (!node.fields) {
        var output = '';
        for (var property in node) {
          output += property + ': ' + node[property]+';\n';
        }
        // console.log(`\nAGAIN : in here cause ${output}`);
        return;
      }

      // console.log(`creating page at ${node.fields.path}`);
      createPage({
        path: node.fields.path,
        component: path.resolve(__dirname, `./_repos/core/site/templates/${node.fields.type}.js`),
        layout: 'main',
        context: {
          pagePath: node.fields.path,
          type: node.fields.type,
          contentType: node.fields.contentType
        }
      });
    });
  });
};

exports.createLayouts = ({ graphql, store, boundActionCreators: { createLayout, deleteLayout } }) => {
  // glob(path.resolve(__dirname, '_repos/react-docs/layouts/**.js')).then(matches => {
  //   matches.forEach(layoutFilePath => {
  //     const id = path.parse(layoutFilePath).name;
  //     deleteLayout(id);
  //     createLayout({
  //       id,
  //       component: layoutFilePath
  //     });
  //   });
  // });
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
  glob(path.resolve(__dirname, 'src/layouts/**.js')).then(matches => {
    matches.forEach(layoutFilePath => {
      const id = path.parse(layoutFilePath).name;
      deleteLayout(id);
      createLayout({
        id,
        component: layoutFilePath
      });
    });
  });
};

exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const CATEGORY_PAGE_REGEX = /^\/docs\/(components|layouts|demos|utilities)\/$/;
  const CATEGORY_CHILD_PAGE_REGEX = /^\/docs\/(components|layouts|demos|utilities)\/([A-Za-z0-9_-]+)/;
  const DEMO_PAGE_REGEX = /^\/demos\/([A-Za-z0-9_-]+)/;
  const GETTING_STARTED_PAGE_REGEX = /\/src\/pages\/getting-started\//;
  return new Promise((resolve, reject) => {
    const isCategoryPage = page.path.match(CATEGORY_PAGE_REGEX);
    const isCategoryChildPage = page.path.match(CATEGORY_CHILD_PAGE_REGEX);
    const isGettingStartedPage = page.componentPath.match(GETTING_STARTED_PAGE_REGEX);
    const isDemoPage = page.path.match(DEMO_PAGE_REGEX);

    page.context.type = 'page';
    page.context.category = 'page';
    page.context.slug = '';
    page.context.name = '';
    page.context.title = '';
    page.layout = 'main';

    // console.log(`page.path: ${page.path} and therefore isCategoryChildPage: ${isCategoryChildPage}`);

    if (isGettingStartedPage) {
      page.layout = 'getting-started';
    } else if (isCategoryPage) {
      page.context.type = 'category';
      page.context.category = page.path.match(CATEGORY_PAGE_REGEX)[1];
    } else if (isDemoPage) {
      // console.log(page.path);
      const pageSlug = page.path.match(DEMO_PAGE_REGEX)[1];
      const pageName = pageSlug.replace('-', ' ');
      const pageTitle = inflection.titleize(pageName);
      page.context.type = 'demo';
      page.context.category = 'demo';
      page.context.slug = pageSlug;
      page.context.name = pageName;
      page.context.title = pageTitle;
      page.path = `${page.path}`;
    } else if (isCategoryChildPage) {
      // console.log(page.path);
      const pageCategory = page.path.match(CATEGORY_CHILD_PAGE_REGEX)[1];
      const pageSlug = page.path.match(CATEGORY_CHILD_PAGE_REGEX)[2];
      const pageName = pageSlug.replace('-', ' ');
      const pageTitle = inflection.titleize(pageName);
      page.context.type = inflection.singularize(pageCategory);
      page.context.category = pageCategory;
      page.context.slug = pageSlug;
      page.context.name = pageName;
      page.context.title = pageTitle;
      page.path = `${page.path}`;

      // create full demo page for each component
      const demoPage = Object.assign({}, page);
      demoPage.layout = 'demo';
      const nodePath = demoPage.path;
      demoPage.path = `${nodePath.substr(0, nodePath.length - 1)}-full/`;
      createPage(demoPage);
    }
    createPage(page);

    resolve();
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  const oldCSSLoader = config._loaders.css;
  const pfStylesTest = /patternfly-next.*(components|layouts).*\.*css$/;
  config.removeLoader('css');
  if (
    oldCSSLoader.config.loaders &&
    oldCSSLoader.config.loaders.includes('postcss')
  ) {
    oldCSSLoader.config.loaders.splice(
      oldCSSLoader.config.loaders.indexOf('postcss'),
      1
    );
  }
  config
    .loader('pf-styles', {
      test: pfStylesTest,
      loaders: [
        'babel-loader',
        require.resolve('@patternfly/react-styles/loader')
      ]
    })
    .loader('css', {
      ...oldCSSLoader.config,
      exclude: pfStylesTest
    });

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
      partialDirs: COMPONENT_PATHS.concat(LAYOUT_PATHS)
        .concat(DEMO_PATH)
        .concat(UTILITIES_PATHS)
    };
    return current;
  });

  config.merge({
    resolve: {
      alias: resolveAliases
    },
    plugins: [
      new WebpackNotifierPlugin({
        title: 'PF-4',
        skipFirstNotification: true
      })
    ]
  });
  return config;
};
