/* global graphql */

import React from 'react';
import './_pages.scss';

const REACT_VERSION = React.version;

const IndexPage = ({data, props}) =>
  (
    <div className="container-fluid h-100">
      <div>React version: {REACT_VERSION}</div>
      <h1>PatternFly 4</h1>
      <h3>Build better experiences with repeatable, scalable design.</h3>
      <p>PatternFly is a design system for enterprise web applications, built and supported by a collaborative community of designers and developers.</p>

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

// export const componentDocsFragment = graphql`
//   fragment ComponentDocs on ComponentMetadata {
//     displayName
//     props {
//       name
//       defaultValue {
//         value
//       }
//       type {
//         value
//         name
//         raw
//       }
//       required
//     }
//   }
// `;

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
