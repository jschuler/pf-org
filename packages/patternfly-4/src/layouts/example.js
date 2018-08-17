// This is a gatsby limitation will be fixed in newer version
// eslint-disable-next-line
// import '@patternfly/react-core/../dist/styles/base.css';
import '../../_repos/core/patternfly/patternfly-base.scss';
import './example.scss';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.func.isRequired
};

const Layout = ({ children }) => children();

Layout.propTypes = propTypes;

export default Layout;
