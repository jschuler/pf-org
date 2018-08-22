const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname);

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-transformer-json',
  'gatsby-transformer-yaml',
  'gatsby-plugin-preval',
  {
    resolve: `gatsby-plugin-postcss-sass`,
    options: {
      postCssPlugins: [],
      precision: 5
    }
  },
  {
    resolve: `gatsby-plugin-page-creator`,
    options: {
      path: `${PROJECT_ROOT}/_repos/core/patternfly`
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${PROJECT_ROOT}/_repos/core/patternfly`,
      name: 'patternfly'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${PROJECT_ROOT}/_repos/core/site/img`,
      name: 'images'
    }
  },
  {
    resolve: 'gatsby-remark-embed-snippet',
    options: {
      directory: `${PROJECT_ROOT}/_repos/core/patternfly`
    }
  },
  'gatsby-transformer-react-docgen',
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`
      ]
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `react-core`,
      path: `${PROJECT_ROOT}/_repos/react-core/src`
    }
  },
];

module.exports = {
  siteMetadata: {
    title: 'PatternFly 4'
  },
  pathPrefix: '/pf-org/4.0',
  plugins
};
