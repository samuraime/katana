import React from 'react';

const asyncComponent = getComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }
    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((mod) => {
          this.setState({ Component: mod.default ? mod.default : mod });
        });
      }
    }
    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  }
);

export default asyncComponent;
