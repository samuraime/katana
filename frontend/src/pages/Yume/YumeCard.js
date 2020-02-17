import React from 'react';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { bool, func, oneOfType, Yume } from '../../types';
import { formatDate } from '../../utils';
import s from './YumeCard.module.scss';

function YumeCard({ yume, onDelete, ...otherProps }) {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const menuOpen = Boolean(anchorEl);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleDeleteDialogOpen() {
    setDeleteDialogOpen(true);
    handleMenuClose();
  }

  function handleDeleteDialogClose() {
    setDeleteDialogOpen(false);
  }

  function handleDelete() {
    onDelete(yume);
  }

  const { dreamer } = yume;

  return (
    <Card {...otherProps}>
      <CardHeader
        avatar={
          <Avatar aria-label={dreamer.name} src={dreamer.avatar}>
            {dreamer.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={dreamer.name}
        subheader={formatDate(yume.createdAt)}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={menuOpen}
        onClose={handleMenuClose}
      >
        {onDelete && (
          <MenuItem onClick={handleDeleteDialogOpen}>Delete</MenuItem>
        )}
      </Menu>
      {!!yume.images.length && (
        <CardMedia
          className={s.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {yume.text}
        </Typography>
      </CardContent>
      {!!yume.interpretation && (
        <IconButton
          className={classnames(s.expand, {
            [s.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show interpretation"
        >
          <ExpandMoreIcon />
        </IconButton>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Interpretation:</Typography>
          <Typography paragraph>{yume.interpretation}</Typography>
        </CardContent>
      </Collapse>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Delete a record?</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to delete a record?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

YumeCard.propTypes = {
  yume: Yume.isRequired,
  onDelete: oneOfType([bool, func]),
};

YumeCard.defaultProps = {
  onDelete: false,
};

export default YumeCard;
