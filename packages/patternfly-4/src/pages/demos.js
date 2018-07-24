/* global graphql */

import React from 'react';
import { CardImg, CardBody, CardSubtitle, Card, Button, CardTitle, CardText } from 'reactstrap';
import Link from 'gatsby-link';
import './_pages.scss';

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

  let cards;
  if (allPages.demo) {
    cards = allPages.demo.map((card) => {
      const { path, text, className } = card;
      const isFullPage = path.endsWith('-full/');
      if (isFullPage) {
        return null;
      }
      return (
        <Link className="nav-link" activeClassName="nav-active" to={path} key={`navigation-${path}`}>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
              <CardTitle>{text}</CardTitle>
            </CardBody>
          </Card>
        </Link>
      );
    });
  }

  return (
    <div className="container-fluid h-100">
        <div className="row h-100">
          {cards}
        </div>
    </div>
  )
}
// const DemosPage = props =>
//   (
//     <div className="container-fluid h-100">
//         <div className="row h-100">
//           Demos
//         </div>
//     </div>
//   );

// export default DemosPage;

export const demosPageQuery = graphql`
  query GetDemosQuery {
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