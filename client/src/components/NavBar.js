/*eslint no-restricted-globals: ["error", "event"]*/

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Auth from '../utils/auth';

class LoginButton extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" onClick={() => {location.href = '/login'; }}/>
    );
  }
}

const logout = () => {
    Auth.signout();
    // TODO clean this whole thing up, move this to react-router <Redirect> in AppBar component
    location.href = '/';
    
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" onClick={() => logout()} />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class AppBarExampleComposition extends Component {

  state = {
    logged: Auth.isAuthenticated,
  };

  render() {
    return (
      <div>
        <AppBar
          title="Welcome To The App"
          iconElementRight={this.state.logged ? <Logged /> : <LoginButton />}
        />
      </div>
    );
  }
}

export default AppBarExampleComposition;