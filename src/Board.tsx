import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import initialData from './initial-data'

interface IBoardState {
    columns:any,
    isLoaded: boolean,
    error:string
}

const styles = (theme: { spacing: { unit: number; }; palette: { text: { secondary: any; }; }; }) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%'
  },
  // paper: {
  //   padding: theme.spacing.unit * 2,
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
});

class Board extends React.Component<{classes: any}, IBoardState> {

    constructor (props: {classes: any}) {
    super(props);

    this.state = {
        columns: [],
        error: '',
        isLoaded: false,
    };
  }

  public componentDidMount () {

    fetch('https://gustaftech-noteswebapi.azurewebsites.net/api/notes')
    .then(results => {
        return results.json();
    })
    .then(data => {

        const notes = data;
        const columnsWithNotes = initialData.columns.map((column:any) => {
            column.notes = notes.filter((note:any) => note.position.column === column.id);
            return column;
        });

        this.setState({
          columns: columnsWithNotes,
          isLoaded: true
        });
    },
        (error) => {
            this.setState({
              error: error.message,
              isLoaded: true
            });
          }

    )
    .catch(error => { 
        alert(error);
    } );
  }

  public render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
                  <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container={true} spacing={0}>

            {this.state.columns.map((column:any) => {
                return (
                  <Column key={column.id} column={column} />
            )
          })}

        </Grid>
        </DragDropContext>
      </div>
    )
  }

  private onDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = this.state.columns.find((column:any) => column.id === source.droppableId);
    const finishColumn = this.state.columns.find((column:any) => column.id === destination.droppableId);

    if (startColumn === finishColumn) {
      const newNotesIds = startColumn.notes
      const movedNote = newNotesIds.splice(source.index, 1).pop()
      newNotesIds.splice(destination.index, 0, movedNote)

      this.state.columns[startColumn] = {
        ...startColumn,
        notes: newNotesIds
      }

      const updatedState = {
        ...this.state,
        newColumns: this.state.columns
      }

      this.setState(updatedState)
      return
    }

    // Moving from one list to another
    const startNotes = startColumn.notes
    const removedNote = startNotes.splice(source.index, 1).pop()
    const newStart = {
      ...startColumn,
      notes: startNotes
    }

    const finishNotes = finishColumn.notes
    finishNotes.splice(destination.index, 0, removedNote)
    const newFinish = {
      ...finishColumn,
      notes: finishNotes
    }

    const startIndex = this.state.columns.findIndex((p:any) => p.id === newStart.id)
    const finishIndex = this.state.columns.findIndex((p:any) => p.id === newFinish.id)

    this.state.columns[startIndex] = newStart;
    this.state.columns[finishIndex] = newFinish;

    const newState = {
      ...this.state,
      newColumns: this.state.columns
    }
    this.setState(newState)
    };
}

export default withStyles(styles)(Board)