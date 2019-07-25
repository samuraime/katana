import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, elementType } from 'prop-types';
import { getLoginURL } from '../../utils';

function AuthRoute({ signedIn, component: Component, ...rest }) {
  function RedirectComponent(props) {
    if (!signedIn) {
      window.location.href = getLoginURL();
      return null;
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
