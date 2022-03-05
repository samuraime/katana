import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { bool, func, oneOfType, Yume } from '../../types';
import { formatDate } from '../../utils';
import styled from 'styled-components';

const StyledCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%; // 16:9
`;

const ToggleButton = styled(IconButton).attrs({
  size: 'large',
})`
  transform: rotate(0deg);
  margin-left: auto;
  transition: transform 150ms ease !important;
  transform: ${({ isExpanded }) => isExpanded && 'rotate(180deg)'};
`;

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
          <IconButton
            aria-label="Settings"
            onClick={handleMenuOpen}
            size="large"
          >
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
        <StyledCardMedia
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
        <ToggleButton
          isExpanded={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show interpretation"
        >
          <ExpandMoreIcon />
        </ToggleButton>
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
