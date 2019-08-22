import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getLoginURL } from '../../utils';
import { string, func, shape } from '../../types';
import userActions from '../../store/user/actions';
import s from './Navigation.module.scss';

function getAppBarTitleByPathName(pathname) {
  const appBarTitleMap = {
    stash: 'Stash',
    yume: 'YumeHub',
    blog: 'Blog',
  };
  const match = pathname.match(/\w+/);

  if (!match) {
    return null;
  }

  return appBarTitleMap[match[0]];
}

function Navigation({ onMenuClick, location, className }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSignOut() {
    dispatch(userActions.signOut());
    handleClose();
  }

  useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  const title = getAppBarTitleByPathName(location.pathname);

  return (
    <AppBar position="static" className={className}>
      <Toolbar variant="dense">
        <IconButton
          className={s.menu}
          edge="start"
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={s.title}>
          {title}
        </Typography>
        {user.signedIn ? (
          <Button color="inherit" onClick={handleMenu}>
            {user.name}
          </Button>
        ) : (
          <Button color="inherit" href={getLoginURL()}>
            Sign In
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  onMenuClick: func.isRequired,
  location: shape({ pathname: string }).isRequired,
  className: string.isRequired,
};

export default withRouter(Navigation);
