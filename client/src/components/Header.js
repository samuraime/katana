import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postLogin, deleteLogin } from '../actions';

const mapStateToProps = state => ({ ...state.auth });

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
    email: this.props.email,
    password: '',
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ email: nextProps.email });
  }
  handleChange = name => (e) => {
    this.setState({ [name]: e.target.value });
  }
  handleSignIn = () => {
    const { email, password } = this.state;
    // TODO: validate form
    this.props.dispatch(postLogin(email, password));
  }
  handleSignOut = () => {
    this.props.dispatch(deleteLogin());
  }
  render() {
    return (
      <div>
        <div>
          <NavLink to="/" exact activeClassName="selected">Home</NavLink>
          <NavLink to="/new" activeClassName="selected">New</NavLink>
          <NavLink to="/about" activeClassName="selected">About</NavLink>
        </div>
        {this.props.logged ?
          <div>
            <a>{this.props.email}</a><button onClick={this.handleSignOut}>Sign out</button>
          </div> :
          <div>
            <div>
              <label htmlFor="email">Email: </label>
              <input id="email" type="text" value={this.state.email} onChange={this.handleChange('email')} />
              <label htmlFor="email">katana@samuraime.com</label>
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input id="password" type="password" value={this.state.password} onChange={this.handleChange('password')} />
              <label htmlFor="password">000000</label>
            </div>
            <div><button onClick={this.handleSignIn}>Sign in</button></div>
          </div>
        }
      </div>
    );
  }
}
