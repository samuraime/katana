import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postLogin, deleteLogin } from '../actions';
import Dialog from './Dialog';
import s from './Header.scss';

const mapStateToProps = state => ({ ...state.auth });

@withRouter
@connect(mapStateToProps)
export default class LoginPanel extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired,
    email: PropTypes.string,
  }
  static defaultProps = {
    email: '',
  }
  state = {
    showLogin: false,
    email: this.props.email,
    password: '',
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ email: nextProps.email });
  }
  showLoginPanel = () => {
    this.setState({ showLogin: true });
  }
  hideLoginPanel = () => {
    this.setState({ showLogin: false });
  }
  handleChange = name => (e) => {
    this.setState({ [name]: e.target.value });
  }
  handleSignIn = () => {
    const { email, password } = this.state;
    this.props.dispatch(postLogin(email, password));
  }
  handleSignOut = () => {
    this.props.dispatch(deleteLogin());
  }
  render() {
    const { props, state } = this;
    return (
      <div>
        <div className={s.header}>
          <div className={s.nav}>
            <NavLink to="/" exact activeClassName={s.active}>Archives</NavLink>
            {props.logged && <NavLink to="/upload" activeClassName={s.active}>Upload</NavLink>}
            <NavLink to="/about" activeClassName={s.active}>About</NavLink>
          </div>
          {props.logged
            ? <button onClick={this.handleSignOut}>Sign out</button>
            : <button onClick={this.showLoginPanel}>Sign in</button>
          }
        </div>
        <Dialog
          open={!props.logged && state.showLogin}
          contentClassName={s.loginFormPanel}
          bodyClassName={s.loginForm}
          actions={[
            <button className={s.login} onClick={this.handleSignIn}>Sign in</button>,
          ]}
          onRequestClose={this.hideLoginPanel}
        >
          <label htmlFor="email">
            <span>Email:</span>
            <input id="email" type="text" value={this.state.email} onChange={this.handleChange('email')} />
          </label>
          <label htmlFor="password">
            <span>Password:</span>
            <input id="password" type="password" value={this.state.password} onChange={this.handleChange('password')} />
          </label>
        </Dialog>
      </div>
    );
  }
}
