import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';



class Header extends Component {
  state = {
    open: false,
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    const { menuItems } = this.props;
    return (
      <section className="header">
        <AppBar onLeftIconButtonTouchTap={this.handleToggle} title="Pole Admin Panel" />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem >SPARKS</MenuItem>
          <MenuItem >USERS</MenuItem>
          <MenuItem >NOTIFICATIONS</MenuItem>
          <MenuItem >SCHEDULING</MenuItem>
          <MenuItem >PARTNERS</MenuItem>
          <MenuItem >EVENTS</MenuItem>
          <MenuItem >ADMINS</MenuItem>
        </Drawer>
      </section>
    )
  }
}

Header.propTypes = {
  menuItems: PropTypes.array,
};

Header.defaultProps = {
  menuItems: [],
};

export default Header;
