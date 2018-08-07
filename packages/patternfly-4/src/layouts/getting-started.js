import React from 'react';
import Page from '../components/page';
import SideNav from '../components/sideNav';

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

export default ({ children, location }) =>
  <Page
    receiveFromChild={getToggleData}
    location={location.pathname}
    title="PatternFly"
    navigation={
      <SideNav
        routes={routes}
      />
    }
    >
    {children()}
  </Page>
