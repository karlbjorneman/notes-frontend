import * as React from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from "react-router-dom";
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Board from './Board';
import Login from './containers/Login'
import Logout from './containers/Logout'

const styles = createStyles ({
  root: {
    backgroundColor: 'red',
    flexGrow: 1,
  },
});

interface IProps extends WithStyles<typeof styles> {}

class App extends React.Component<IProps> {
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className="App">
          <header className="App-header">
            <Typography component="h2" variant="h1" gutterBottom={true}>
              Welcome to Notes
            </Typography>
          </header>
          <div className={this.props.classes.root}>
            <Switch>
              <Route exact={true} path='/' component={Board}/>
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
