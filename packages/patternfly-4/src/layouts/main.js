import React from 'react';
import Page from '../components/page';
import Navigation from '../components/navigation';
import { toggleEnums } from '../components/navBar';
import Prisim from 'prismjs'; // eslint-disable-line no-unused-vars

// import 'prismjs/themes/prism-coy.css';
import '../../_repos/core/patternfly/patternfly-base.scss';
import '../../sass/style.scss';
import './main.scss';

export default class MainTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { toggleState: false};
    this.getToggleData = this.getToggleData.bind(this);
  }

  getToggleData(data) {
    console.log(`main: ${data}`);
    this.setState({
      toggleState: data
    });
  }

  render() {
    
    const allPages = this.props.data.allSitePage.edges.reduce((accum, edge) => {
      let type = edge.node.context.type || 'page';
      const system = edge.node.fields.system || 'unknown';
      const layout = edge.node.layout;

      if (layout === 'demo') {
        type = 'demo';
      }

      if (!accum[system]) {
        accum[system] = [];
      }

      if (!accum[system][type]) {
        accum[system][type] = [];
      }

      if (edge.node.context.name === null) {
        let bestGuessNameArr = edge.node.path.match(/\/([A-Za-z0-9_-]+)$/g);
        let bestGuessName;
        if (bestGuessNameArr && bestGuessNameArr.length > 0) {
          bestGuessName = bestGuessNameArr[0].substring(1);
          bestGuessName = bestGuessName.replace(/-/g, ' ');
          edge.node.fields.label = bestGuessName;
        }
      } else {
        edge.node.fields.label = edge.node.fields.label === null ? edge.node.context.name : edge.node.fields.label;
      }

      accum[system][type].push({
        path: edge.node.path,
        to: edge.node.path,
        text: edge.node.context.name,
        className: `is-${type}`,
        label: edge.node.fields.label
      });
      return accum;
    }, {});

    const allowedLocations = ['/docs/'];
    let allowed = false;
    for (let i = 0; i < allowedLocations.length; i++) {
      if (this.props.location.pathname.indexOf(allowedLocations[i]) > -1) {
        allowed = true;
        break;
      }
    }

    let routes;
    if (this.state.toggleState === toggleEnums.REACT) {
      // react
      routes = [{
        title: 'Component Demos',
        children: allPages.react.component
      }, {
        title: 'Layouts',
        children: allPages.react.layout
      }];
    } else {
      // core
      routes = [{
        title: 'Components',
        children: allPages.core.component
      }, {
        title: 'Layouts',
        children: allPages.core.layout
      }];
    }

    return (
      <Page
        receiveFromChild={this.getToggleData}
        location={this.props.location.pathname}
        title="PatternFly"
        navigation={allowed &&
          <Navigation
            routes={routes}
          />
        }
      >
        {this.props.children()}
      </Page>
    );

  }
  
}

// TODO: had to remove label field
/*
fields {
  label
  system
}
*/
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
          layout
          componentPath
          fields {
            system
          }
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
    coreComponentPages: allSitePage(filter: { path: { regex: "/components/" }, layout: { ne: "demo" }, fields: { system: { eq: "core" }} }) {
      edges {
        node {
          path
          layout
          componentPath
          fields {
            system
          }
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
    reactComponentPages: allSitePage(filter: { path: { regex: "/components/" }, fields: { system: { eq: "react" }} }) {
      edges {
        node {
          path
          layout
          internalComponentName
          component
          componentPath
          fields {
            system
          }
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
    coreLayoutPages: allSitePage(filter: { path: { regex: "/layouts/" }, layout: { ne: "demo" }, fields: { system: { eq: "core" }} }) {
      edges {
        node {
          path
          layout
          internalComponentName
          component
          componentPath
          fields {
            system
          }
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
    reactLayoutPages: allSitePage(filter: { path: { regex: "/layouts/" }, fields: { system: { eq: "react" }} }) {
      edges {
        node {
          path
          layout
          internalComponentName
          component
          componentPath
          fields {
            system
          }
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