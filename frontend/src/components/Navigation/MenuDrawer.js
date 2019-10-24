import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import BlogIcon from '@material-ui/icons/Subject';
import YumeHubIcon from '@material-ui/icons/Brightness4';
import StashIcon from '@material-ui/icons/CloudDownload';
// import PlayGroundIcon from '@material-ui/icons/Games';
import { bool, func, node } from 'prop-types';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const menuConfigs = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Blog', path: '/blog', icon: BlogIcon },
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

  return (
    <Fragment>
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
      <Hidden xsDown implementation="js">
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
    </Fragment>
  );
}

MenuDrawer.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  toolbarPlaceholder: node.isRequired,
};

export default MenuDrawer;
