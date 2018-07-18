import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mockNavItems } from './mockNavItems';
// import { Masthead, MastheadCollapse, MastheadDropdown, MenuItem, Icon } from 'patternfly-react';
import pfBrand from './img/brand-alt.svg';
import pfLogo from './img/logo-alt.svg';
import { VerticalNav } from 'patternfly-react';

const { Masthead, Brand, IconBar, Item, SecondaryItem, TertiaryItem } = VerticalNav;

const basicExample = (props, firstItemClass) => (
  <VerticalNav {...props} showBadges>
    <VerticalNav.Masthead title="Patternfly React" />
    <VerticalNav.Item
      title="Item 1"
      iconClass="fa fa-home"
      initialActive
      onClick={() => alert('Item 1!')}
      className={firstItemClass}
    >
      <VerticalNav.Badge count={42} />
    </VerticalNav.Item>
    <VerticalNav.Item title="Item 2" iconClass="fa fa-star">
      <VerticalNav.SecondaryItem
        title="Item 2-A"
        onClick={() => alert('Item 2-A!')}
      >
        <VerticalNav.Badge count={9999} tooltip="Whoa, that's a lot" />
      </VerticalNav.SecondaryItem>
      <VerticalNav.SecondaryItem
        title="Item 2-B (external link)"
        href="http://www.patternfly.org"
      />
      <VerticalNav.SecondaryItem title="Divider" isDivider />
      <VerticalNav.SecondaryItem title="Item 2-C" />
    </VerticalNav.Item>
    <VerticalNav.Item title="Item 3" iconClass="fa fa-info-circle">
      <VerticalNav.SecondaryItem title="Item 3-A" />
      <VerticalNav.SecondaryItem title="Divider" isDivider />
      <VerticalNav.SecondaryItem title="Item 3-B">
        <VerticalNav.TertiaryItem title="Item 3-B-i" />
        <VerticalNav.TertiaryItem title="Item 3-B-ii" />
        <VerticalNav.TertiaryItem title="Item 3-B-iii" />
      </VerticalNav.SecondaryItem>
      <VerticalNav.SecondaryItem title="Item 3-C" />
    </VerticalNav.Item>
  </VerticalNav>
);

const mockBodyContainer = className => (
  <div
    className={classNames(
      'container-fluid container-cards-pf container-pf-nav-pf-vertical nav-pf-persistent-secondary',
      className
    )}
  >
    <div className="row row-cards-pf">
      <p>Body Content Here! Body Content Here! Body Content Here! 1</p>
      <p>Body Content Here! Body Content Here! Body Content Here! 2</p>
      <p>Body Content Here! Body Content Here! Body Content Here! 3</p>
      <p>Body Content Here! Body Content Here! Body Content Here! 4</p>
      <p>Body Content Here! Body Content Here! Body Content Here! 5</p>
    </div>
  </div>
);

// Vertical Nav CSS uses position: fixed, but storybook doesn't render components at the top of the page body.
// We need this little bit of magic to force position: fixed children to render relative to the storybook body.
// translateZ trick found at https://stackoverflow.com/a/38796408.
// This emulates the effects of <html class="layout-pf layout-pf-fixed"> too (60px padding)
const MockFixedLayout = props => (
  <div>
    {props.children}
  </div>
);
MockFixedLayout.propTypes = { children: PropTypes.node.isRequired };

class Header extends React.Component {
  handleNavToggle(e) {
    try {
      alert(`nav toggle click: ${e}`); // eslint-disable-line no-alert
    } catch (error) {
      console.log(`nav toggle click: ${e}`); // eslint-disable-line no-console
    }
  }

  handleTitleClick(e) {
    try {
      alert(`title click: ${e}`); // eslint-disable-line no-alert
    } catch (error) {
      console.log(`title click: ${e}`); // eslint-disable-line no-console
    }
  }

  render() {
    return (
      <MockFixedLayout>
        <div className="layout-pf layout-pf-fixed faux-layout">
          <VerticalNav
            sessionKey="storybookItemsAsObjects"
            items={mockNavItems}
            showBadges
          >
            <Masthead title="Patternfly React" />
          </VerticalNav>
          {mockBodyContainer('nav-pf-vertical-with-badges')}
        </div>
      </MockFixedLayout>
      // <MockFixedLayout>
      //   <div className="layout-pf layout-pf-fixed faux-layout">
      //     {basicExample({ sessionKey: 'storybookItemsAsJsx' })}
      //     {mockBodyContainer('nav-pf-vertical-with-badges')}
      //   </div>
      // </MockFixedLayout>
      // <Masthead
      //   iconImg={pfLogo}
      //   titleImg={pfBrand}
      //   title="Patternfly React"
      //   navToggle
      //   onTitleClick={this.handleTitleClick}
      //   onNavToggleClick={this.handleNavToggle}
      // >
      //   <Masthead.Collapse>
      //     <Masthead.Dropdown id="app-help-dropdown" noCaret title={<span title="Help" className="pficon pficon-help" />}>
      //       <MenuItem eventKey="1">Help</MenuItem>
      //       <MenuItem eventKey="2">About</MenuItem>
      //     </Masthead.Dropdown>
      //     <Masthead.Dropdown
      //       id="app-user-dropdown"
      //       title={[
      //         <Icon type="pf" name="user" key="user-icon" />,
      //         <span className="dropdown-title" key="dropdown-title">
      //           Brian Johnson
      //         </span>,
      //       ]}
      //     >
      //       <MenuItem eventKey="1">User Preferences</MenuItem>
      //       <MenuItem eventKey="2">Logout</MenuItem>
      //     </Masthead.Dropdown>
      //   </Masthead.Collapse>
      // </Masthead>
    )
  }
}

// import './_header.scss';

// const Header = () =>
//   (<header className="header">
//     <div className="container">
//       <div className="row">
//         <div className="col-12">
//           <div className="header-content">
//             <span className="header-logo">
//               Gatsby React Boilerplate
//             </span>
//             <nav className="header-nav">
//               <ul className="header-nav-list">
//                 <li className="header-nav-list-item">
//                   <a href="#features">Features</a>
//                 </li>
//                 <li className="header-nav-list-item">
//                   <a href="#howto">How To</a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>);

export default Header;
