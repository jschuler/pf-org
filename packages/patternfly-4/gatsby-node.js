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

// const reactComponentPathRegEx = /(components|layouts)\//;
const reactComponentPathRegEx = /(\/react-docs\/pages\/components|\/react-docs\/pages\/layouts)\//;
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

  // console.log(`\nin here cause ${node.path} and ${node.internal.type}`);
  if (isSitePage) {
    // var output = '\n';
    // for (var property in node) {
    //   output += property + ': ' + node[property]+'; ';
    // }
    // console.log(`\n\nin here cause ${output}`);
    if (reactComponentPathRegEx.test(node.componentPath)) {
      console.log(`\n\nregex ok: ${node.path} and ${node.internal.type}`);
      const pathLabel = node.path
        .split('/')
        .filter(Boolean)
        .pop();
      // console.log(`creating react component ${pathLabel} for path ${node.path}`);
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
      var output = '';
      // console.log(`\nin here cause ${node.path} and ${node.internal.type}`);
      for (var property in node) {
        output += property + ': ' + node[property]+';\n';
      }
      // console.log(`\nno fileAbsolutePath: in here cause ${output}`);
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
      createNodeField({ node, name: 'path', value: pagePath });
      createNodeField({ node, name: 'type', value: 'page' });
      createNodeField({ node, name: 'contentType', value: 'page' });
    } else if (isComponent) {
      // console.log(`component path: ${node.fileAbsolutePath}`);
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
  const CATEGORY_PAGE_REGEX = /^\/(components|layouts|demos|utilities)\/$/;
  const CATEGORY_CHILD_PAGE_REGEX = /^\/(components|layouts|demos|utilities)\/([A-Za-z0-9_-]+)/;
  return new Promise((resolve, reject) => {
    const isCategoryPage = page.path.match(CATEGORY_PAGE_REGEX);
    const isCategoryChildPage = page.path.match(CATEGORY_CHILD_PAGE_REGEX);

    page.context.type = 'page';
    page.context.category = 'page';
    page.context.slug = '';
    page.context.name = '';
    page.context.title = '';
    page.layout = 'main';

    if (isCategoryPage) {
      page.context.type = 'category';
      page.context.category = page.path.match(CATEGORY_PAGE_REGEX)[1];
    } else if (isCategoryChildPage) {
      const pageCategory = page.path.match(CATEGORY_CHILD_PAGE_REGEX)[1];
      const pageSlug = page.path.match(CATEGORY_CHILD_PAGE_REGEX)[2];
      // console.log(`pageSlug ${pageSlug}`);
      // console.log(`page path ${page.path}`);
      const pageName = pageSlug.replace('-', ' ');
      const pageTitle = inflection.titleize(pageName);
      page.context.type = inflection.singularize(pageCategory);
      page.context.category = pageCategory;
      page.context.slug = pageSlug;
      page.context.name = pageName;
      page.context.title = pageTitle;
      // page.path = `/docs${page.path}`;
      page.path = `${page.path}`;
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
      }),
      new Webpack.NormalModuleReplacementPlugin(
        /^inactive-@patternfly\/patternfly-next/,
        function(resource) {
          console.log(`\nrequesting ${resource.request}`);
          var resolvedPath;
          var redirectedPath;
          // should be:
          // /Users/jschuler/Documents/GitHub/pf-org/packages/patternfly-4/_repos/react/components/Alert
          // but is:
          // /Users/jschuler/Documents/GitHub/pf-org/packages/patternfly-4/_repos/core/patternfly/layouts/Grid/styles.css
          // /Users/jschuler/Documents/GitHub/pf-org/packages/patternfly-4/_repos/core/patternfly/layouts/Grid/styles.scss
          if (resource.request.indexOf('components') > -1) {
            resolvedPath = path.resolve(__dirname, './_repos/core/patternfly/components');
            redirectedPath = resource.request.replace(/^@patternfly\/patternfly-next\/components/, resolvedPath);
            redirectedPath = redirectedPath.replace(/\.css$/, '.scss');
            // console.log(`now requesting ${redirectedPath}`);
          } else {
            resolvedPath = path.resolve(__dirname, './_repos/core/patternfly/layouts');
            redirectedPath = resource.request.replace(/^@patternfly\/patternfly-next\/layouts/, resolvedPath);
            redirectedPath = redirectedPath.replace(/\.css$/, '.scss');
            // console.log(`now requesting ${redirectedPath}`);
          }
          if (fs.existsSync(path.resolve(resource.context, redirectedPath))) {
            resource.request = redirectedPath;
            console.log(`instead requesting ${resource.request}`);
          } else {
            console.log(`resource does not exist at ${resource.context} and ${redirectedPath}`);
          }
        }
      )
    ]
  });
  return config;
};
