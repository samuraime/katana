import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Hidden from '@mui/material/Hidden';
import HomeIcon from '@mui/icons-material/Home';
import YumeHubIcon from '@mui/icons-material/Brightness4';
import StashIcon from '@mui/icons-material/CloudDownload';
// import PlayGroundIcon from '@mui/icons-material/Games';
import { bool, func, node } from 'prop-types';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link ref={ref} {...props} />
));

const menuConfigs = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Stash', path: '/stash', icon: StashIcon },
  { name: 'YumeHub', path: '/yume', icon: YumeHubIcon },
  // { name: 'PlayGround', path: '/playground', icon: PlayGroundIcon },
];

function MenuDrawer(props) {
  const { open, onClose, toolbarPlaceholder, ...otherProps } = props;
  const menuList = (
    <List>
      {menuConfigs.map(menu => (
        <ListItem key={menu.name} button component={AdapterLink} to={menu.path}>
          <ListItemIcon>
            <menu.icon />
          </ListItemIcon>
          <ListItemText primary={menu.name} />
        </ListItem>
      ))}
    </List>
  );

  return (<>
    <Hidden smUp implementation="js">
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        {...otherProps}
      >
        {menuList}
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="js">
      <Drawer
        variant="persistent"
        open={open}
        onClose={onClose}
        {...otherProps}
      >
        {toolbarPlaceholder}
        {menuList}
      </Drawer>
    </Hidden>
  </>);
}

MenuDrawer.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  toolbarPlaceholder: node.isRequired,
};

export default MenuDrawer;
