/* global graphql */

import React from 'react';
import './_pages.scss';

const IndexPage = ({data, props}) =>
  (
    <div className="container-fluid h-100">
      Main
      {/* <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>
            {node.frontmatter.title}{" "}
            <span>— {node.frontmatter.date}</span>
          </h3>
          <p>{node.excerpt}</p>
        </div>
      ))} */}
    </div>
  );

export default IndexPage;

// export const query = graphql`
//   query MainQuery {
//     allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `;
