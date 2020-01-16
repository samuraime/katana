import React from 'react';
import Typography from '@material-ui/core/Typography';
import RouterLink from '../../components/RouterLink';
import Container from '../../components/Container';
import s from './NotFound.module.scss';

export default function NotFound() {
  return (
    <Container className={s.root}>
      <Typography variant="h5" component="h3" className={s.title}>
        Not Found
      </Typography>
      <RouterLink to="/" color="inherit" underline="always">
        homepage
      </RouterLink>
    </Container>
  );
}
