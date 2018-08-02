import React from 'react';
import PropTypes from 'prop-types';
import styles from './page.styles';
import { css } from '@patternfly/react-styles';
import Helmet from 'react-helmet';
import NavBar from '../navBar';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  navigation: PropTypes.node,
  receiveFromChild: PropTypes.func
};

const defaultProps = {
  title: 'PatternFly',
  children: null,
  navigation: null,
  receiveFromChild: null
};

// const getToggleData = function(data) {
//   console.log(`page: ${data}`);
//   propTypes.receiveFromChild(data);
//   // this.setState({
//   //   toggleState: data
//   // });
// };

const Page = ({ navigation, children, title, receiveFromChild }) => {
  
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
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
      <NavBar onToggleChange={receiveFromChild} />
      <div className={css(styles.page)}>
        {navigation &&
          <aside className={css(styles.nav)}>{navigation}</aside>
        }
        <main className={css(styles.main)}>{children}</main>
      </div>
    </React.Fragment>
  )
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
