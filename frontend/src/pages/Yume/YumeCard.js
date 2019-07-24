import React from 'react';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Yume } from '../../types';
import s from './YumeCard.module.scss';

function YumeCard({ yume }) {
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const { dreamer } = yume;

  return (
    <Card className={s.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label={dreamer.name}
            src={dreamer.avatar}
            className={s.avatar}
          >
            {dreamer.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">{<MoreVertIcon />}</IconButton>
        }
        title={dreamer.name}
        subheader={yume.createdAt}
      />
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
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        {!!yume.interpretation && (
          <IconButton
            className={classnames(s.expand, {
              [s.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Interpretation:</Typography>
          <Typography paragraph>{yume.interpretation}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

YumeCard.propTypes = {
  yume: Yume.isRequired,
};

export default YumeCard;
