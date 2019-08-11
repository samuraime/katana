import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Octicon, { MarkGithub } from '@primer/octicons-react';
import { getLoginURL } from '../../utils';
import s from './SignIn.module.scss';

function SignIn() {
  return (
    <Paper className={s.root}>
      <Typography variant="h5" component="h3" className={s.title}>
        Please sign in
      </Typography>
      <Button href={getLoginURL()} variant="contained" color="default">
        <Octicon className={s.icon} icon={MarkGithub} size={20} />
        Sign In
      </Button>
    </Paper>
  );
}

export default SignIn;
