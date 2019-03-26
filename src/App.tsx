import * as React from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from "react-router-dom";
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Board from './Board';
import Login from './containers/Login'
import Logout from './containers/Logout'
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Background from './images/login_background.jpg'

// const drawerWidth = 240;

const styles = (theme:any) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundImage: `url(${Background})`,
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    //position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  content: {
    paddingBottom: 50,
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

    // const drawer = (
    //   <div>
    //     <div className={this.props.classes.toolbar} />
    //     <Divider />
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );

    return (
        <div id="app" className={this.props.classes.root}>
          <CssBaseline/>
          <main className={this.props.classes.content}>
            <Switch>
              <Route exact={true} path='/' component={Board}/>
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
            </Switch>
          </main>
          <AppBar position="fixed" color="primary" className={this.props.classes.appBar}>
            <Toolbar className={this.props.classes.toolbar}>
              <IconButton color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <Fab color="secondary" aria-label="Add" className={this.props.classes.fabButton}>
                <AddIcon />
              </Fab>
              <div>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <IconButton color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
