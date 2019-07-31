import React, { useState } from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from './Navigation';
import MenuDrawer from './MenuDrawer';

const drawerWidth = 220;
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
  contentRoot: {
    display: 'flex',
    width: '100%',
  },
  content: {
    width: '100vw',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
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
          <Navigation
            title={title}
            onMenuClick={handleToggle}
            className={classes.appBar}
          />
          <div className={classes.contentRoot}>
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
              <Component {...props} />
            </main>
          </div>
        </div>
      );
    };
  };
}

export default withNavigation;
