const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  pathPrefix: '/pf-org/4.0',
  siteMetadata: {
    title: `PatternFly 4`,
  },
  plugins: [
    `gatsby-plugin-react-next`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `svgo`,
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [],
        precision: 5
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
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
    {
      resolve: 'gatsby-remark-embed-snippet',
      options: {
        directory: `${__dirname}/_repos/core/patternfly`
      }
    },
  ],
}

/*
{
  resolve: 'gatsby-plugin-replace-path',
  options: {
    pattern: /(components)/g,
    replacement: (_, match) => match.toUpperCase(),
  },
},
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `data`,
    path: `${__dirname}/src/data/`,
  },
},
{
  resolve: 'custom-sass-loader',
  options: {
    postCssPlugins: [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ],
    precision: 8,
  },
},
{
  resolve: 'custom-sass-loader',
  options: {
    postCssPlugins: [
      pixrem(),
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ],
    precision: 8,
  },
},
*/
