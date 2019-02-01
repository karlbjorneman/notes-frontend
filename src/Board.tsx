import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// import Note from './Note';
import Column from './Column';
import initialData from './initial-data'

interface IBoardState {
    tasks:any, 
    columns:any, 
    newColumns:any,
    columnOrder:string[],
    isLoaded: boolean,
    error:string
}

export default class SampleComponent extends React.Component<{}, IBoardState> {

    constructor (props: {}) {
    super(props);

    this.state = {
        columnOrder: initialData.columnOrder,
        columns: initialData.columns,
        error: '',
        isLoaded: false,
        newColumns: [],
        tasks: initialData.tasks
    };
  }

  public componentDidMount () {

    fetch('http://localhost:5001/api/notes')
    .then(results => {
        return results.json();
    })
    .then(data => {

        const notes = data;
        const columnsWithNotes = this.state.columns.map((column:any) => {
            column.notes = notes.filter((note:any) => note.position.column === column.id);
            return column;
        });

        this.setState({
          isLoaded: true,
          newColumns: columnsWithNotes
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
    return (
        <Grid container={true} spacing={0}>
            <DragDropContext onDragEnd={this.onDragEnd}>

            {this.state.newColumns.map((column:any) => {
                return (
                  <Column key={column.id} column={column} />
            )
          })}
            </DragDropContext>
        </Grid>
    )
  }

  private onDragEnd = (result: { destination: any; source: any; draggableId: any; }) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = this.state.newColumns.find((column:any) => column.id === source.droppableId);
    const finishColumn = this.state.newColumns.find((column:any) => column.id === destination.droppableId);

    if (startColumn === finishColumn) {
      const newNotesIds = Array.from(startColumn.notes)
      newNotesIds.splice(source.index, 1)
      newNotesIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newNotesIds
      }

      const updatedState = {
        ...this.state,
        newColumns: {
          ...this.state.newColumns,
          [newColumn.id]: newColumn
        }
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

    const startIndex = this.state.newColumns.findIndex((p:any) => p.id === newStart.id)
    const finishIndex = this.state.newColumns.findIndex((p:any) => p.id === newFinish.id)

    this.state.newColumns[startIndex] = newStart;
    this.state.newColumns[finishIndex] = newFinish;

    const newState = {
      ...this.state,
      newColumns: this.state.newColumns
    }
    this.setState(newState)
    };
}

