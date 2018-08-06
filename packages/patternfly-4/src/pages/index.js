import React from 'react';
import './_pages.scss';
// import styles from './index.styles';
// import { css } from '@patternfly/react-styles';
import logo from '../assets/logo.png';
import packageJson from '../../package.json';
import { Button } from 'reactstrap';

const REACT_VERSION = React.version;

const IndexPage = ({data, props}) =>
  (
    <div className="h-100">

      <div className="d-flex">
        <div className="p-5">
          <img src={logo} alt="PatternFly Logo" />
          <h1 className="pt-3 pb-3">Build better experiences with repeatable, scalable design.</h1>
          <h2 className="pt-3 pb-3">PatternFly is a design system for enterprise web applications, built and supported by a collaborative community of designers and developers.</h2>
          <p>Version: {packageJson.version}</p>
          <div>
            <span className="pr-3 font-weight-bold">Get Started for</span>
            <Button color="primary" className="m-3">Developers</Button>{' '}
            <Button color="secondary" className="m-3">Designers</Button>{' '}
          </div>
        </div>
        <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
      </div>

      <div className="p-5">
        <h1 className="pt-3 pb-3">This is who we are.</h1>
        <h2 className="pt-3 pb-3">PatternFly is an open source UI framework that offers code, patterns, styles, and community support to promote consistent design and delightful user experiences.</h2>
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col text-center">
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
              <h3>Modular & Flexible</h3>
              <h5>Arrange self-contained components in any number of ways to build a variety of applications and interfaces.</h5>
            </div>
            <div className="col text-center">
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
              <h3>Accessible Design</h3>
              <h5>Take advantage of accessible markup and guidance, because building applications that work for everyone is just the right thing to do.</h5>
            </div>
            <div className="col text-center">
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
              <h3>Built for teams, built to scale</h3>
              <h5>Enable consistency and unify teams. PatternFly 4 is built to support both designers and developers, making it easier than ever to translate wireframes into pixel-perfect user experiences.</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h1 className="pt-3 pb-3">Meet PatternFly 4.</h1>
        <h2 className="pt-3 pb-3">PatternFly is an open source UI framework that offers code, patterns, styles, and community support to promote consistent design and delightful user experiences.</h2>
        <div className="container-fluid p-3">
          <div className="row pt-5 pb-5">
            <div className="col">
              <h3>Stay grounded with Foundations.</h3>
              <h5>Foundations provide you with guidelines to follow to make the most of PatternFly 4. Get acquainted with our approach to accessibility, content, style, and more.</h5>
              <Button color="link" className="">Explore Foundations -></Button>{' '}
            </div>
            <div className="col">
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
            </div>
          </div>
          <div className="row pt-5 pb-5">
            <div className="col">
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
            </div>
            <div className="col">
              <h3>Start building with Components.</h3>
              <h5>Components are the building blocks of the PatternFly design system. Mix and match components to create the solution that works best for your use case.</h5>
              <Button color="link" className="">Explore Components -></Button>{' '}
            </div>
          </div>
          <div className="row pt-5 pb-5">
            <div className="col">
              <h3>Get going with Prototypes.</h3>
              <h5>Prototypes are full page application experiences made up of multiple components. Prototypes should give users a strong vision for robust experiences they can create using PatternFly 4. Prototypes are not partial experiences like modals.</h5>
              <Button color="link" className="">Explore Prototypes -></Button>{' '}
            </div>
            <div className="col">
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"></img>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 text-center">
        <h2 className="p-4">Ready to contribute to PatternFly?</h2>
        <h3 className="p-4">PatternFly 4 is a community that thrives off of people like you contributing. To learn how to get started contributing, check out our Contribute page.</h3>
        <Button color="primary" className="">Get Started</Button>{' '}
      </div>

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
