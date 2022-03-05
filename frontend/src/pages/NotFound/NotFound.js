import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import RouterLink from '../../components/RouterLink';
import Container from '../../components/Container';

const NotFoundPage = styled(Container)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Typography).attrs({
  variant: 'h5',
  component: 'h3',
})`
  margin-bottom: 2rem !important;
`;

export default function NotFound() {
  return (
    <NotFoundPage>
      <Title>Not Found</Title>
      <RouterLink to="/" color="inherit" underline="always">
        homepage
      </RouterLink>
    </NotFoundPage>
  );
}
