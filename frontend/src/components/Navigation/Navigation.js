import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { string, func, shape } from '../../types';
import userActions from '../../store/user/actions';
import s from './Navigation.module.scss';

const getLoginURL = () => {
  return `/auth/github?redirect_uri=${encodeURIComponent(
    window.location.href
  )}`;
};

function Navigation({ user, dispatch, title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
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
  title: string,
  user: shape({ name: string }).isRequired,
  dispatch: func.isRequired,
};

Navigation.defaultProps = {
  title: '',
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Navigation);
