const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname);

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-transformer-json',
  'gatsby-transformer-yaml',
  `svgo`,
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
    resolve: `gatsby-plugin-page-creator`,
    options: {
      path: `${PROJECT_ROOT}/_repos/core/site/pages`,
      name: 'pages'
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
      path: `${PROJECT_ROOT}/_repos/core/site/pages`,
      name: 'pages'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${PROJECT_ROOT}/_repos/core/site/_site`,
      name: 'site-components'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${PROJECT_ROOT}/_repos/core/site/img`,
      name: 'images'
    }
  },
  // {
  //   resolve: 'gatsby-transformer-remark',
  //   options: {
  //     plugins: [
  //       `gatsby-remark-autolink-headers`,
  //       {
  //         resolve: `gatsby-remark-prismjs`,
  //         options: {
  //           classPrefix: 'prism-language-'
  //         }
  //       }
  //     ]
  //   }
  // },
  {
    resolve: 'gatsby-remark-embed-snippet',
    options: {
      directory: `${PROJECT_ROOT}/_repos/core/patternfly`
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `components`,
      path: `${PROJECT_ROOT}/_repos/react/components`,
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `layouts`,
      path: `${PROJECT_ROOT}/_repos/react/layouts`,
    }
  },
  {
    resolve: `gatsby-plugin-page-creator`,
    options: {
      path: `${PROJECT_ROOT}/_repos/react-docs/pages`,
      name: 'pages'
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
    resolve: 'gatsby-plugin-transform-imports',
    options: {
      'react-bootstrap': {
        transform: './angle-double-left-icon',
        preventFullImport: true,
      },
      lodash: {
        transform: 'lodash/${member}',
        preventFullImport: true,
      },
      '@patternfly/react-icons': {
        kebabCase: true,
        preventFullImport: true,
        transform: '@patternfly/react-icons/dist/js/icons/${member}'
      }
    },
  },
];

module.exports = {
  siteMetadata: {
    title: 'PatternFly 4'
  },
  pathPrefix: '/pf-org/4.0',
  plugins
};

/*
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `examples`,
      path: `${PROJECT_ROOT}/_repos/react-docs/components/examples`
    }
  },
  'gatsby-transformer-react-docgen'
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        `gatsby-remark-autolink-headers`,
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: 'prism-language-'
          }
        }
      ]
    }
  },
*/