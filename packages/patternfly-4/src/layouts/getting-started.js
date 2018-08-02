import React from 'react';
import Page from '../components/page';
import SideNav from '../components/sideNav';
// import './_pages.scss';

const routes = [{
  label: 'Overview',
  to: '/getting-started/overview'
}, {
  label: 'Developers',
  to: '/getting-started/developers'
}, {
  label: 'Designers',
  to: '/getting-started/designers'
}, {
  label: 'Upgrade Guide',
  to: '/getting-started/upgrade-guide'
}, {
  label: 'FAQs',
  to: '/getting-started/faqs'
}];

const getToggleData = function(data) {
  console.log(`getting-started: ${data}`);
};

export default ({ children }) =>
  <Page
    receiveFromChild={getToggleData}
    title="PatternFly"
    navigation={
      <SideNav
        routes={routes}
      />
    }
    >
    {children()}
  </Page>
