import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import NavBar from '../components/navBar';
import SideNav from '../components/sideNav';

import '../../sass/style.scss';
import './_.main-layout.scss';

export default class MainTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = { toggleState: false};
    this.getToggleData = this.getToggleData.bind(this);
  }

  getToggleData(data) {
    console.log(data);
    this.setState({
      toggleState: data
    });
  }

// export default ({ data, location, children }) => {
  render() {
    const allPages = this.props.data.allSitePage.edges.reduce((accum, edge) => {
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
    const allowedLocations = ['/docs/', '/layouts/', '/components/'];
    let allowed = false;
    for (let i = 0; i < allowedLocations.length; i++) {
      if (this.props.location.pathname.indexOf(allowedLocations[i]) > -1) {
        allowed = true;
        break;
      }
    }
    if (allowed) {
      template = (
        <div>
          <Helmet title={this.props.data.site.siteMetadata.title} />
          <NavBar onToggleChange={this.getToggleData} />

          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-3" id="sidebar">
                <SideNav links={allPages} forReact={this.state.toggleState} />
              </div>
              <div className="col pt-3">
                {this.props.children()}
              </div>
            </div>
          </div>
        </div>
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
      )
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