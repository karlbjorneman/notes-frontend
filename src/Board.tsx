import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import {getAllNotesDispatched} from './services/notesService'
import {getAllColumnsDispatched} from './services/columnsService'
import withAuth from './services/withAuth'
import { connect } from 'react-redux';
import { moveNote } from './actions/columnsActions'
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

interface IBoardProps {
  classes: any, 
  dispatch:any,
  columns: any,
  notes: any,
  error: string,
  moveNote: any,
  getAllNotesDispatched: any,
  getAllColumnsDispatched: any,
  auth:any
}

interface IBoardState {
  anchorEl: any,
  open: boolean
}

const styles = (theme: any) => ({
  root: {
    width: '100%',
    paddingBottom: 50,
  },
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
    typography: {
    padding: theme.spacing.unit * 2,
  },
});

class Board extends React.Component<IBoardProps, IBoardState> {

  constructor (props: IBoardProps) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false
    }
  }

  handleClick = (event:any) => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  public componentDidMount () {
    if (!this.props.auth.isAuthenticated)
      return;

      this.props.getAllNotesDispatched();
      this.props.getAllColumnsDispatched();
    }

  public render () {
    const {classes} = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : undefined;

    return (
      <div className={classes.root}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid container={true} spacing={0}>
              {this.props.columns.allIds.map((columnId:any) => {
                  return (<Column key={columnId} id={columnId} column={this.props.columns.byId[columnId]} notes={this.props.notes} />)
            })}
          </Grid>
        </DragDropContext>
        <AppBar position="fixed" className={this.props.classes.appBar}>
            <Toolbar className={this.props.classes.toolbar}>
              <IconButton color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <Fab color="secondary" aria-describedby={id} onMouseDown={this.handleClick} aria-label="Add" className={this.props.classes.fabButton}>
                <AddIcon />
              </Fab>
              <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography className={classes.typography}>The content of the Popper.</Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>

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
    )
  }

  private onDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
    const { destination, source } = result
    this.props.moveNote(source, destination, this.props.auth);
  };
}

const mapStateToProps = (state:any) => ({
  notes: state.notes,
  columns: state.columns,
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  
    moveNote : (source: any, destination:any, auth:any) => dispatch(moveNote(source, destination, auth)),

    getAllNotesDispatched : () => dispatch(getAllNotesDispatched()),
    getAllColumnsDispatched : () => dispatch(getAllColumnsDispatched())
  });


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Board)))
