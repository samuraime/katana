import React from 'react';
import { useSelector } from 'react-redux';
import { elementType } from 'prop-types';
import SignIn from './SignIn';

function AuthRoute({ component: Component, ...props }) {
  const signedIn = useSelector(({ user }) => user.signedIn);

  if (!signedIn) {
    return <SignIn />;
  }

  return <Component {...props} />;
}

AuthRoute.propTypes = {
  component: elementType.isRequired,
};

export default AuthRoute;
