import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Logo from './images/logo.PNG';
import NavBarItems from './NavBarItems';
import NavClose from './NavClose';
import Head from './Head';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position:'absolute'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 9 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 11 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
  fullWidth:{
    width:'100%',
    height: 200
  }
});

class Draw extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState(()=>({open: false}));
  };

  render() {
    const { classes} = this.props;
    const {open} = this.state;
    return (
      <>
      <div className={classes.root} onClick={this.handleDrawerOpen}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>
          {open ? <Head/>: <img src={Logo} alt='logo' className={classes.fullWidth}/>}
          </div>
          <Divider />
          <List>
            <NavBarItems extended={open}/>
          </List>
        </Drawer>
      </div>
        {open && <NavClose onClick={this.handleDrawerClose}/>}
      </>
    );
  }
}

Draw.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Draw);
