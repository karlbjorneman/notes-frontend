import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from "react-router-dom";
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Board from './Board';
import Login from './containers/Login'
import Logout from './containers/Logout'


// const drawerWidth = 240;

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
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
