import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Navigation from '@siteComponents/Navigation';
import Prisim from 'prismjs'; // eslint-disable-line no-unused-vars
import NavBar from '../../components/navBar';

import 'prismjs/themes/prism-coy.css';
import '../../patternfly/patternfly-base.scss';
import '../workspace.scss';
import '../../../sass/style.scss';

export default ({ children, data, location }) => {
  const allPages = data.allSitePage.edges.reduce((accum, edge) => {
    const type = edge.node.context.type || 'page';

    if (!accum[type]) {
      accum[type] = [];
    }

    if (edge.node.context.name == null) {
      let bestGuessName = edge.node.path
        .match(/\/([A-Za-z0-9_-]+)$/g)[0]
        .substring(1);
      bestGuessName = bestGuessName.replace(/-/g, ' ');

      if (bestGuessName !== 'docs') {
        edge.node.context.name = bestGuessName;
      }
    }

    accum[type].push({
      path: edge.node.path,
      text: edge.node.context.name,
      className: `is-${type}`
    });
    return accum;
  }, {});

  let siding;
  if (location.pathname.indexOf('/docs/') > -1) {
    siding = (
      <div className="layout__sidebar">
        <div className="layout__sidebar__item">
          <h3 className="layout__sidebar_heading">Components</h3>
          <Navigation links={allPages.component} />
        </div>
        <div className="layout__sidebar__item">
          <h3 className="layout__sidebar_heading">Layouts</h3>
          <Navigation links={allPages.layout} />
        </div>
        <div className="layout__sidebar__item">
          <h3 className="layout__sidebar_heading">Demos</h3>
          <Navigation links={allPages.demo} />
        </div>
      </div>
    );
  } else {
    siding = (
      <div></div>
    )
  }

  return (
    <div className="layout">
      <Helmet>
        <title>PF Next</title>
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
          integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
          integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
          crossOrigin="anonymous"
        />
      </Helmet>
      <NavBar />
      <Navigation links={allPages.page} isHorizontal />

      <main className="layout__main">
        {siding}
        <div className="layout__content">{children()}</div>
      </main>
      <footer className="layout__footer" />
    </div>
  );
};

export const indexPageQuery = graphql`
  query IndexOtherPageQuery {
    allSitePage(filter: { path: { regex: "/^((?!(404)).)*$/" } }) {
      edges {
        node {
          path
          context {
            type
            category
            slug
            name
            title
          }
        }
      }
    }
  }
`;
