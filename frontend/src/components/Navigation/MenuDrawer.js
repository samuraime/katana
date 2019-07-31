import React, { Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
// import { Link } from 'react-router-dom';
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

// const AdapterLink = React.forwardRef((props, ref) => (
//   <Link innerRef={ref} {...props} />
// ));

function MenuDrawer(props) {
  const { open, onClose, toolbarPlaceholder, ...otherProps } = props;
  const icons = [
    <HomeIcon />,
    <CloudCircleIcon />,
    <Brightness4 />,
    <GameIcon />,
  ];
  const drawerContent = (
    <div role="presentation" onClick={onClose} onKeyDown={onClose}>
      {toolbarPlaceholder}
      <List>
        {['Home', 'Stash', 'YumeHub', 'PlayGround'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment>
      <Hidden smUp implementation="js">
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          // ModalProps={{
          //   keepMounted: true, // Better open performance on mobile.
          // }}
          {...otherProps}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          variant="persistent"
          open={open}
          onClose={onClose}
          {...otherProps}
        >
          {drawerContent}
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
