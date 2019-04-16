import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import {getAllNotesDispatched} from '../services/notesService'
import {getAllColumnsDispatched} from '../services/columnsService'
import withAuth from '../services/withAuth'
import { connect } from 'react-redux';
import { moveNote } from '../actions/columnsActions'
import NotesAppBar from './NotesAppBar';

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
});

class Board extends React.Component<IBoardProps, IBoardState> {

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
        <NotesAppBar/>
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
