import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import userActions from '../../store/user/actions';

function Navigation({ user, getUser }) {
  useEffect(getUser, [user.id]);

  return (
    <nav>
      {user.signedIn ? (
        <div>
          <span>{user.name}</span>
        </div>
      ) : (
        <a href="/auth/github">Sign In</a>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  user: shape().isRequired,
  getUser: func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(userActions.getUser()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
