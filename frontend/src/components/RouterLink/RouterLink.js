import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function RouterLink(props) {
  return <Link component={ReactRouterLink} {...props} underline="hover" />;
}
