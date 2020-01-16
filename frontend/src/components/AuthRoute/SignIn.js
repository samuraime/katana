import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Octicon, { MarkGithub } from '@primer/octicons-react';
import Container from '../Container';
import { getLoginURL } from '../../utils';
import s from './SignIn.module.scss';

function SignIn() {
  return (
    <Container className={s.root}>
      <Typography variant="h5" component="h3" className={s.title}>
        游人止步区
      </Typography>
      <Button href={getLoginURL()} variant="contained" color="default">
        <Octicon className={s.icon} icon={MarkGithub} size={20} />
        Sign In
      </Button>
    </Container>
  );
}

export default SignIn;
