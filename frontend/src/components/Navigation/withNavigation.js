import React, { Fragment } from 'react';
import Navigation from './Navigation';

function withNavigation({ title }) {
  return function withNavigationComponent(Component) {
    return function EnhancedComponent(props) {
      return (
        <Fragment>
          <Navigation title={title} />
          <Component {...props} />
        </Fragment>
      );
    };
  };
}

export default withNavigation;
