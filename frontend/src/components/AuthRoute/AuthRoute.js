import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { elementType } from 'prop-types';
import SignIn from './SignIn';

function AuthRoute({ component: Component, ...rest }) {
  const signedIn = useSelector(({ user }) => user.signedIn);

  function RedirectComponent(props) {
    if (!signedIn) {
      return <SignIn />;
    }

    return <Component {...props} />;
  }

  return <Route {...rest} component={RedirectComponent} />;
}

AuthRoute.propTypes = {
  component: elementType.isRequired,
};

export default AuthRoute;
