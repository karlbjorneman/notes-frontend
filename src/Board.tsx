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
import Background from './images/login_background.jpg'

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

const styles = (theme: any) => ({
  root: {
    width: '100%',
    paddingBottom: 50,
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
});

class Board extends React.Component<IBoardProps> {

  constructor (props: IBoardProps) {
    super(props);
  }

  public componentDidMount () {
    if (!this.props.auth.isAuthenticated)
      return;

      this.props.getAllNotesDispatched();
      this.props.getAllColumnsDispatched();
    }

  public render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid container={true} spacing={0}>
              {this.props.columns.allIds.map((columnId:any) => {
                  return (<Column key={columnId} id={columnId} column={this.props.columns.byId[columnId]} notes={this.props.notes} />)
            })}
          </Grid>
        </DragDropContext>
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
    )
  }

  private onDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
    const { destination, source } = result
    this.props.moveNote(source, destination);
  };
}

const mapStateToProps = (state:any) => ({
  notes: state.notes,
  columns: state.columns,
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  
    moveNote : (source: any, destination:any) => dispatch(moveNote(source, destination)),

    getAllNotesDispatched : () => dispatch(getAllNotesDispatched()),
    getAllColumnsDispatched : () => dispatch(getAllColumnsDispatched())
  });


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Board)))
