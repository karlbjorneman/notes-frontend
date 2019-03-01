import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { logout } from "../actions/authActions";

interface ILogoutProps {
    logout(): any;
}

class Logout extends Component<ILogoutProps> {
    componentWillMount(){
        this.props.logout();
    }

    componentDidMount() {
        //this.props.logout();
    }

    render(){
        return(
            <div><Redirect to={{
                pathname: '/'
            }} /></div>
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
      logout: () => {
        dispatch(logout());
      }
    }
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout) as any);