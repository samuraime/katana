import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Octicon, { MarkGithub } from '@primer/octicons-react';
import Container from '../Container';
import { getLoginURL } from '../../utils';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const Title = styled(Typography).attrs({
  variant: 'h5',
  component: 'h3',
})`
  margin-bottom: 2rem !important;
`;

const GitHubIcon = styled(Octicon).attrs({
  icon: MarkGithub,
  size: 20,
})`
  margin-right: 1rem;
`;

function SignIn() {
  return (
    <StyledContainer>
      <Title>游人止步区</Title>
      <Button href={getLoginURL()} variant="contained">
        <GitHubIcon />
        Sign In
      </Button>
    </StyledContainer>
  );
}

export default SignIn;
