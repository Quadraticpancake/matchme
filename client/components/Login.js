import React, { Component, PropTypes } from 'react';

class Login extends Component {

  handleClick() {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds);
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div>
        <input
          type="text"
          ref="username"
          className="form-control"
          style={{ marginRight: '5px' }}
          placeholder="Username"
        />
        <input
          type="password"
          ref="password"
          className="form-control"
          style={{ marginRight: '5px' }}
          placeholder="Password"
        />
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>

        {errorMessage &&
          <p style={{ color: 'red' }}>{errorMessage}</p>
        }
      </div>
    );
  }

}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default Login;
