import * as React from 'react';
import 'typeface-roboto';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SampleComponent from './SampleComponent';

const styles = {
  root: {
    backgroundColor: 'red',
    flexGrow: 1,
  },
};

class App extends React.Component {
  constructor(props: Readonly<{}>) {
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
          <SampleComponent/>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
