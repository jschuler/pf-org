import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Link from 'gatsby-link';
import { push } from 'gatsby-link';
import ToggleButton from 'react-toggle-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'
import './_.main-nav.scss';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      active: 0,
      toggleValue: false
    };
  }

  setActive(id) {
    this.setState({
      active: id
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand>
            <Link to="/" className="navbar-brand">PatternFly</Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/getting-started/">Get Started</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/docs/foundations/">Documentation</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/demos/">Prototypes</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/contribution/">Contribute</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" activeClassName="nav-active" to="/blog/">Blog</Link>
              </NavItem>

              <FontAwesomeIcon icon={faSearch} size="lg" inverse className="search-icon" />
              
              <div className="toggle-container">
                <ToggleButton
                  inactiveLabel={<span>HTML</span>}
                  activeLabel={<span>React</span>}
                  value={this.state.toggleValue}
                  onToggle={(value) => {
                    this.setState({
                      toggleValue: !value,
                    });
                    // console.log(this.props.location);
                    // this.props.onToggleChange(this.state.toggleValue);
                    // push('/');
                  }}
                  colors={{
                    inactive: {
                      base: 'rgb(0,0,255)'
                    }
                  }}
                  containerStyle={{display:'inline-block',width:'90px',height:'30px'}} 
                  trackStyle={{width:'100px',height:'30px'}} 
                  thumbStyle={{
                    width: 30,
                    height: 30
                  }}
                  thumbAnimateRange={[1, 70]} 
                  activeLabelStyle={{ width:'45px',fontSize:'16px',left:'10px' }} 
                  inactiveLabelStyle={{ width:'45px',fontSize:'16px',right:'6px',color:'rgb(250,250,250)' }} />
              </div>

              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  PatternFly 4
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="https://jschuler.github.io/pf-org/">
                    PatternFly 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBar.defaultProps = {
  toggleValue: false
};