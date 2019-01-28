import * as React from 'react';
import 'typeface-roboto';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SampleComponent from './Board';

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
            <SampleComponent/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
