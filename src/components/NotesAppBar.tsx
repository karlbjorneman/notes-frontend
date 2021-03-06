import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Fab, Popover} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddNote from './AddNote';

interface IAppBarProps {
    classes: any, 
}

interface IAppBarState {
    anchorEl: any,
    body: string
}

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
  });

class NotesAppBar extends React.Component<IAppBarProps, IAppBarState> {
    constructor(props: IAppBarProps) {
        super(props)

        this.state = {
            anchorEl: null,
            body: ""
        }

        this.updatePopover = null;

        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    updatePopover: any;

    handlePopoverOpen = (event:any) => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    private handleBodyChange(event: any) {
        this.setState({
            ...this.state,
            body: event.target.value
        });

        if (this.updatePopover != null) {
            this.updatePopover.updatePosition();
        }
    }

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
                    id="addPopover"
                    className={classes.popover}
                    open={open}
                    action = {((actions: any) => {
                         this.updatePopover = actions
                        })}
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
                    disableRestoreFocus>

                    <AddNote id={""} header={"Heading"} body={"Make a note..."} imageUrl={undefined}/>
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