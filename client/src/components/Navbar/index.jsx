import Gravatar from '../Gravatar';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
  };

  handleLogoutClick(e) {
    this.props.onLogoutClick(e);
  }

  render() {
    const { user, isAuthenticated, isAuthenticating } = this.props;

    return (
      <nav className="navbar bg-primary">
        <Link to={isAuthenticated ? '/accounts' : '/'} className="navbar-brand">Ekto</Link>
        {!isAuthenticated && !isAuthenticating &&
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a href="https://ekto.readme.io/" className="nav-link">Docs</a>
            </li>
            <li className="nav-item">
              <a href="https://github.com/bnhansn/ekto/" className="nav-link">Github</a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" activeClassName="active">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" activeClassName="active">
                Signup
              </Link>
            </li>
          </ul>
        }
        {isAuthenticated &&
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Dropdown ref="dropdown">
                <DropdownTrigger className="user-dropdown-trigger">
                  <i className="icon icon-menu7 user-dropdown-icon"></i>
                  <Gravatar
                    size={30}
                    className="img-circle"
                    email={user.email || ''}
                  />
                </DropdownTrigger>
                <DropdownContent className="dropdown-right">
                  <Link
                    to="/accounts"
                    className="dropdown-item"
                    onClick={() => this.refs.dropdown.hide()}
                  >
                    <i className="icon icon-database2 user-dropdown-icon"></i>
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => this.refs.dropdown.hide()}
                  >
                    <i className="icon icon-equalizer2 user-dropdown-icon"></i>
                    <span>Settings</span>
                  </Link>
                  <a
                    href="#"
                    onClick={(e) => { ::this.handleLogoutClick(e); }}
                    className="dropdown-item"
                  >
                    <i className="icon icon-exit user-dropdown-icon"></i>
                    <span>Logout</span>
                  </a>
                </DropdownContent>
              </Dropdown>
            </li>
          </ul>
        }
      </nav>
    );
  }
}

export default Navbar;
