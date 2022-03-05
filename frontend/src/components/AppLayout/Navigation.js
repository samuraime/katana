import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getLoginURL } from '../../utils';
import { func } from '../../types';
import userActions from '../../store/user/actions';

const MenuButton = styled(IconButton).attrs({
  edge: 'start',
  color: 'inherit',
  size: 'large',
})`
  margin-right: 0.5rem !important;
`;

const Title = styled(Typography).attrs({
  variant: 'h6',
})`
  flex-grow: 1;
`;

function getAppBarTitleByPathName(pathname) {
  const appBarTitleMap = {
    stash: 'Stash',
    yume: 'YumeHub',
  };
  const match = pathname.match(/\w+/);

  if (!match) {
    return null;
  }

  return appBarTitleMap[match[0]];
}

function Navigation({ onMenuClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
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

  const title = getAppBarTitleByPathName(pathname);

  return (
    <AppBar color="default" position="static">
      <Toolbar variant="dense">
        <MenuButton aria-label="Menu" onClick={onMenuClick}>
          <MenuIcon />
        </MenuButton>
        <Title>{title}</Title>
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
};

export default Navigation;
