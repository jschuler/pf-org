import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import NavBar from '../components/navBar';
import SideNav from '../components/sideNav';

import '../../sass/style.scss';

// const TemplateWrapper = ({ children }) => (
//   <div>
//     <Helmet
//       title="Gatsby React Boilerplate"
//     />
//     <NavBar />
//     {children()}
//   </div>
// );

export default ({ data, location, children }) => {
  const allPages = data.allSitePage.edges.reduce((accum, edge) => {
    const type = edge.node.context.type || 'page';

    if (!accum[type]) {
      accum[type] = [];
    }

    if (edge.node.context.name == null) {
      let bestGuessName = edge.node.path.match(/\/([A-Za-z0-9_-]+)$/g)[0].substring(1);
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
  
  let template;
  if (location.pathname.indexOf('/docs/') > -1) {
    template = (
      <div>
        TEST
        <Helmet title={data.site.siteMetadata.title} />
        <NavBar />

        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-2 collapse d-md-flex bg-light pt-2 h-100" id="sidebar">
              <SideNav links={allPages} />
            </div>
            <div className="col pt-2">
              {children()}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    template = (
      <div>
        <Helmet title={data.site.siteMetadata.title} />
        <NavBar />

        {children()}
      </div>
    )
  }
  return template;
}

/*
<Header />
<Footer />

<div className="container-fluid h-100">
    <div className="row h-100">
        <div className="col-2 collapse d-md-flex bg-light pt-2 h-100" id="sidebar">
          <SideNav />
        </div>
        <div className="col pt-2">
            <h2>
              Documentation
            </h2>
            <h6 className="hidden-sm-down">Shrink page width to see sidebar collapse</h6>
            <p>Documentation content here</p>
        </div>
    </div>
</div>
*/

// TemplateWrapper.propTypes = {
//   children: PropTypes.func,
// };

// export default TemplateWrapper;

export const indexPageQuery = graphql`
  query GetSitesQuery {
    site {
      siteMetadata {
        title
      }
    }
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