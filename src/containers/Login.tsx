import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import config from '../config.json';
import { withRouter, Redirect } from "react-router-dom";


interface ILoginProps {
    login(token:any): any;
    auth: any
  }
  
interface ILoginState {

    body?: string;
    header?: string;
    position: {column: string}
    imageUrl: string
}

class Login extends Component<ILoginProps, ILoginState> {

  onFailure = (error:any) => {
    alert(error);
  };

  googleResponse = (response:any) => {
    if (!response.tokenId) {
      console.error("Unable to get tokenId from Google", response)
      return;
    }

    const tokenBlob = new Blob([JSON.stringify({ tokenId: response.tokenId }, null, 2)], { type: 'application/json' });
    fetch(config.GOOGLE_AUTH_CALLBACK_URL, {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
          })
      .then(r => {
        r.json().then(user => {
          const token = user.token;
          console.log(token);
          this.props.login(token);
        });
      })
  };

  render() {
    let content = this.props.auth.isAuthenticated ?
      (
        <div>
          <Redirect to={{
            pathname: '/'
          }} />
        </div>
      ) :
      (
        <div>
          <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Google Login"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
          />
        </div>
      );

    return (
      <div><h1>Login</h1>
          {content}
      </div>
    );
  }
};

const mapStateToProps = (state:any) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    login: (token:any) => {
      dispatch(login(token));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login) as any);