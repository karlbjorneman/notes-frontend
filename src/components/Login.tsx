import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { withRouter, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Background from '../images/login_background.jpg';
import IUser from '../interfaces/IUser'


interface ILoginProps {
    login(token:string, googleAccessToken:string, user: IUser): any;
    auth: any,
    classes: any
  }
  
interface ILoginState {

    body?: string;
    header?: string;
    position: {column: string}
    imageUrl: string
}

const styles = (theme: any) => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

class Login extends Component<ILoginProps, ILoginState> {

  onFailure = (error:any) => {
    alert(error);
  };

  googleResponse = (response:any) => {
    if (!response.tokenId) {
      console.error("Unable to get tokenId from Google", response)
      return;
    }

    const tokenBlob = new Blob([JSON.stringify({ tokenId: response.tokenId, googleAccessToken: response.tokenObj.access_token }, null, 2)], { type: 'application/json' });
    fetch(String(process.env.REACT_APP_GOOGLE_AUTH_CALLBACK_URL), {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
          })
      .then(r => {
        r.json()
        .then(data => {
          const token = data.token;
          const user = data.user;
          this.props.login(token, response.tokenObj.access_token, user);
        });
      })
  };

  render() {
    const {classes} = this.props;

    let content = this.props.auth.isAuthenticated ?
      (
          <Redirect to={{
            pathname: '/'
          }} />
      ) :
      (
          <GoogleLogin
            clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
            buttonText="Sign in with Google"
            scope="profile email https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.appendonly"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}/>
      );

    return (
      <div className={classes.root}>
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
    login: (token:string, googleAccessToken:string, user:IUser) => {
      dispatch(login(token, googleAccessToken, user));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)) as any);