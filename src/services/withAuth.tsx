import React, { Component } from "react";
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface IWithAuthProps {
    auth: any
    history: any
}

/* A higher order component is frequently written as a function that returns a class. */
export default function withAuth(AuthComponent:any) {

  class AuthWrapped extends Component<IWithAuthProps> {

    /* In the componentDid<ount, we would want to do a couple of important tasks in order to verify the current users authentication status
    prior to granting them enterance into the app. */
    componentDidMount() {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.replace("/login");
      }
    }

    render() {
        return (
              <AuthComponent/>
        );
      }
  };

  return withRouter(connect(mapStateToProps)(AuthWrapped) as any);
}

const mapStateToProps = (state:any) => {
    return {
      auth: state.auth
    };
  };


