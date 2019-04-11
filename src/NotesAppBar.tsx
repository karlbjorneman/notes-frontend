import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Fab, Popover, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Card, CardContent, InputBase} from '@material-ui/core';

interface IAppBarProps {
    classes: any, 
}

interface IAppBarState {
    anchorEl: any
}

const grid = 8;

const styles = (theme: any) => ({
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor: theme.palette.primary.dark
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

    card: {
        backgroundColor: '#373740',
      },
      paper: {
        margin: `0 0 ${grid}px 0`,
      },
      header: {
          fontSize: 20
      },
      media: {
          height: 0,
          paddingTop: '56.25%', // 16:9
        }
  });

class NotesAppBar extends React.Component<IAppBarProps, IAppBarState> {
    constructor(props: IAppBarProps) {
        super(props)

        this.state = {
            anchorEl: null
        }

        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
    }

    handlePopoverOpen = (event:any) => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handlePopoverClose = () => {
    this.setState({ anchorEl: null });
    };

    public render() {
        const classes = this.props.classes;
        const open = Boolean(this.state.anchorEl);

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                <IconButton color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                </IconButton>
                <Fab color="secondary" onMouseDown={this.handlePopoverOpen} aria-label="Add" className={classes.fabButton}>
                    <AddIcon />
                </Fab>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                    paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                >
                    <Card className={classes.card} >
                        <CardContent>
                            <div className={classes.paper}>
                                <InputBase className={classes.header} fullWidth={true} value={"test header"} />
                                <InputBase fullWidth={true} value={"test body"} multiline={true} />
                            </div>
                        </CardContent>
                    </Card>
                </Popover>

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
        )
    }
}

export default withStyles(styles)(NotesAppBar)