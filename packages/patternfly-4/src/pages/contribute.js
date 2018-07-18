/* global graphql */

import React from 'react';
import SideNav from '../components/sideNav';
import Features from '../components/features';
import HowTo from '../components/how-to';
import './_pages.scss';
// import './_simple-sidebar.scss';

const ContributePage = props =>
  (
    <React.Fragment>
      <div className="container-fluid h-100">
          <div className="row h-100">
            How to contribute
          </div>
      </div>
    </React.Fragment>
  );

export default ContributePage;
