import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import Brightness4 from '@material-ui/icons/Brightness4';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import GameIcon from '@material-ui/icons/Games';
import { bool, func, node } from 'prop-types';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const menuConfigs = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Stash', path: '/stash', icon: CloudCircleIcon },
  { name: 'YumeHub', path: '/yume', icon: Brightness4 },
  { name: 'PlayGround', path: '/playground', icon: GameIcon },
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
