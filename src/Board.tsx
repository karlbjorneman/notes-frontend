import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import {getAllNotesDispatched} from './services/notesService'
import {getAllColumnsDispatched} from './services/columnsService'
import withAuth from './services/withAuth'
import { connect } from 'react-redux';
import { moveNote, moveNoteToOtherColumn } from './actions/columnsActions'


interface IBoardState {
    columns:any,
    isLoaded: boolean,
    error:string
}

interface IBoardProps {
  classes: any, 
  dispatch:any,
  columns: any,
  notes: any,
  error: string,
  moveNote: any,
  moveNoteToOtherColumn: any,
  getAllNotesDispatched: any,
  getAllColumnsDispatched: any
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
    this.props.getAllColumnsDispatched();
    this.props.getAllNotesDispatched();
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
    this.props.moveNoteToOtherColumn(source, destination);
  };
}

const mapStateToProps = (state:any) => ({
  notes: state.notes,
  columns: state.columns
});

const mapDispatchToProps = (dispatch: any) => ({
  
    moveNote : (column:any, source: any, destination:any) => dispatch(moveNote(column, source, destination)),
    moveNoteToOtherColumn : (source: any, destination:any) => 
        dispatch(moveNoteToOtherColumn(source, destination)),
    getAllNotesDispatched : () => dispatch(getAllNotesDispatched()),
    getAllColumnsDispatched : () => dispatch(getAllColumnsDispatched())
  });


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Board)))
