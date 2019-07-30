import React, { useState } from 'react';
import classnames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from './Navigation';
import MenuDrawer from './MenuDrawer';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    maxWidth: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: theme.mixins.toolbar,
}));

function withNavigation({ title }) {
  return function withNavigationComponent(Component) {
    return function EnhancedComponent(props) {
      const [open, setOpen] = useState(false);
      const classes = useStyles();

      function handleClose() {
        setOpen(false);
      }

      function handleToggle() {
        setOpen(!open);
      }

      const toolbarPlaceholder = <div className={classes.toolbar} />;

      return (
        <div className={classes.root}>
          <CssBaseline />
          <Navigation
            title={title}
            onMenuClick={handleToggle}
            className={classes.appBar}
          />
          <MenuDrawer
            open={open}
            onClose={handleClose}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            toolbarPlaceholder={toolbarPlaceholder}
          />
          <main
            className={classnames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            {toolbarPlaceholder}
            <Component {...props} />
          </main>
        </div>
      );
    };
  };
}

export default withNavigation;
