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

const styles = (theme: { spacing: { unit: number; }; palette: { text: { secondary: any; }; }; }) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%'
  }
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
