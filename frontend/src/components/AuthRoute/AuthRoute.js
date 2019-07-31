import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, elementType } from 'prop-types';
import SignIn from './SignIn';

function AuthRoute({ signedIn, component: Component, ...rest }) {
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
  signedIn: bool.isRequired,
};

function mapStateToProps({ user }) {
  return {
    signedIn: user.signedIn,
  };
}

export default connect(mapStateToProps)(AuthRoute);
