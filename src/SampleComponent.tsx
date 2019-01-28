import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// import Note from './Note';
import Column from './Column';
import initialData from './initial-data'

// fake data generator
const getItems = (count: number, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        content: `item ${k + offset}`,
        id: `item-${k + offset}`
    }));

interface IItem
{
    content: string,
    id: string
}

export default class SampleComponent extends React.Component<{}, {items:IItem[], selected: IItem[], tasks:any, columns:any, columnOrder:string[]}> {

    constructor (props: {}) {
    super(props);

    this.state = {
        columnOrder: initialData.columnOrder,
        columns: initialData.columns,
        items: getItems(10),
        selected: getItems(5, 10),
        tasks: initialData.tasks
    };
  }

  public render () {
    return (
        <Grid container={true} spacing={0}>
            <DragDropContext onDragEnd={this.onDragEnd}>

            {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(
                (taskId: string) => this.state.tasks[taskId]
            )

            return (
              <Column key={column.id} column={column} tasks={tasks} />
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

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const updatedState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(updatedState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
    };
}

