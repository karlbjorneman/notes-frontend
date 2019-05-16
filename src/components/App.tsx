import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from "react-router-dom";
import { WithStyles, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Board from './Board';
import Login from './Login'
import Logout from './Logout'
import { red } from '@material-ui/core/colors';


// const drawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#1eb980',
      dark: '#045d56',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ff6859',
      contrastText: '#000'
    },
    background: {
      default: '#33333d'
    },
    text: {
      primary: '#33333d',
      secondary: '#a3a3a3'
    }
  },
});

const styles = (theme:any) => ({
  root: {
    minHeight: '100%',
    height: '100%',
  },
  content: {
    height: '100%',
    width: '100%',
  },
});

interface IAppProps extends WithStyles<typeof styles> {
  theme: any;
}
interface IAppState {
  mobileOpen: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);

    this.state = {
      mobileOpen: false,
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: state.mobileOpen }));
  };

  public render() {

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div id="app" className={this.props.classes.root}>
          <main className={this.props.classes.content}>
            <Switch>
              <Route exact={true} path='/' component={Board}/>
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
