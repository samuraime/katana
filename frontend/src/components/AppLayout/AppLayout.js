import React, { useState } from 'react';
import classnames from 'classnames';
import { node } from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
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
    width: `calc(100% - ${drawerWidth}px)`,
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

function AppLayout({ children }) {
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
    <Box className={classes.root}>
      <Navigation onMenuClick={handleToggle} className={classes.appBar} />
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
          {children}
        </main>
      </div>
    </Box>
  );
}

AppLayout.propTypes = {
  children: node,
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
