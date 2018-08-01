import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import NavBar from '../components/navBar';
import SideNav from '../components/sideNav';
import Page from '../components/page';
import Navigation from '../components/navigation';

// This is a gatsby limitation will be fixed in newer version
// eslint-disable-next-line
// import '@patternfly/react-core/../dist/styles/base.css';
import '../../_repos/core/patternfly/patternfly-base.scss';
import '../../sass/style.scss';
import './_.main.scss';

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

// export default ({ data, location, children }) => {
  render() {
    
    const allPages = this.props.data.allSitePage.edges.reduce((accum, edge) => {
      let type = edge.node.context.type || 'page';
      let system = edge.node.fields.system || 'unknown';
      let layout = edge.node.layout;

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

      // if (system === 'core' && edge.node.context.name == null) {
      //   let bestGuessName = edge.node.path.match(/\/([A-Za-z0-9_-]+)$/g)[0].substring(1);
      //   bestGuessName = bestGuessName.replace(/-/g, ' ');

      //   edge.node.fields.label = bestGuessName;

      //   if (bestGuessName !== 'docs') {
      //     edge.node.context.name = bestGuessName;
      //   }
      // } else {
      //   console.log('react');
      // }

      accum[system][type].push({
        path: edge.node.path,
        to: edge.node.path,
        text: edge.node.context.name,
        className: `is-${type}`,
        label: edge.node.fields.label
      });
      return accum;
    }, {});

    let template;
    const allowedLocations = ['/docs/', '/layouts/', '/components/'];
    let allowed = false;
    for (let i = 0; i < allowedLocations.length; i++) {
      if (this.props.location.pathname.indexOf(allowedLocations[i]) > -1) {
        allowed = true;
        break;
      }
    }

    let componentRoutes;
    let layoutRoutes;

    if (this.state.toggleState) {
      // react
      componentRoutes = allPages.react.component;
      // componentRoutes = this.props.data.reactComponentPages.edges.map(e => ({
      //   to: e.node.path,
      //   label: e.node.fields.label
      // }));

      layoutRoutes = allPages.react.layout;
      // layoutRoutes = this.props.data.reactLayoutPages.edges.map(e => ({
      //   to: e.node.path,
      //   label: e.node.fields.label
      // }));
    } else {
      // core
      componentRoutes = allPages.core.component;

      layoutRoutes = allPages.core.layout;
    }

    return (
      <React.Fragment>

        <Page
          receiveFromChild={this.getToggleData}
          title="PatternFly"
          navigation={
            <Navigation
              componentRoutes={componentRoutes}
              layoutRoutes={layoutRoutes}
            />
          }
        >
          {this.props.children()}
        </Page>

      </React.Fragment>
    );

    if (allowed) {
      template = (
        <React.Fragment>

          <div>React version: {REACT_VERSION}</div>

          <Page
            title="PatternFly"
            navigation={
              <Navigation
                componentRoutes={componentRoutes}
                layoutRoutes={layoutRoutes}
              />
            }
          >
            {this.props.children()}
          </Page>

          {/* <NavBar onToggleChange={this.getToggleData} />

          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-3" id="sidebar">
                <SideNav links={allPages} forReact={this.state.toggleState} />
              </div>
              <div className="col pt-3">
                {this.props.children()}
              </div>
            </div>
          </div> */}
        </React.Fragment>
      )
    } else if (this.props.location.pathname.indexOf('/demos/') > -1) {
      template = (
        <div>
          <Helmet title={this.props.data.site.siteMetadata.title} />
          <NavBar />

          {this.props.children()}
        </div>
      )
    } else {
      template = (
        <div>
          <Helmet title={this.props.data.site.siteMetadata.title} />
          <NavBar />

          <div className="main-container">
            {this.props.children()}
          </div>
        </div>
      );
    }
    return template;
  }
  
}

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
            label
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
            label
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
            label
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
            label
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
            label
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