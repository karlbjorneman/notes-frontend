import { Grid } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import Note from './Note';

interface INoteItem {
    id: string;
    header: string;
    body: string;
}

// fake data generator
const getItems = (count: number, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        content: `item ${k + offset}`,
        id: `item-${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list: IItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: IItem[], destination: IItem[], droppableSource: { index: number; droppableId: string | number; }, droppableDestination: { index: number; droppableId: string | number; }) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {
        droppable: sourceClone,
        droppable2: destClone,
    };

    return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    margin: `0 0 ${grid}px 0`,
    padding: grid * 2,
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

interface IItem
{
    content: string,
    id: string
}

export default class SampleComponent extends React.Component<{}, {error:string, notes:INoteItem[], isLoaded: boolean, items:IItem[], selected: IItem[]}> {

    private id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    constructor (props: {}) {
    super(props);

    this.state = {
        error: '',
        isLoaded: false,
        items: getItems(10),
        notes: [],
        selected: getItems(5, 10)
    };
  }

  public componentDidMount () {

    fetch('http://localhost:5001/api/notes')
    .then(results => {
        return results.json();
    })
    .then(data => {
        this.setState({
            isLoaded: true,
            notes: data
        })
    },
        (error) => {
            this.setState({
              error: error.message,
              isLoaded: true
            });
          }
        // let fruits = data.map((fruit: string) => {
        // )

    )
    .catch(error => { 
        // tslint:disable-next-line:no-console
        console.debug(error) ; 
    } );
  }

  public render () {
    return (
        <Grid container={true} spacing={0}>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided: any, snapshot: any) => (
                    <div ref={provided.innerRef} 
                         style={getListStyle(snapshot.isDraggingOver)}>
                        <Grid item={true} xs={12}>
                            {this.state.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided2: any, snapshot2: any) => (
                                        <div
                                            ref={provided2.innerRef}
                                            {...provided2.draggableProps}
                                            {...provided2.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot2.isDragging,
                                                provided2.draggableProps.style
                                            )}
                                            >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </Grid>
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="droppable2">
                    {(provided:any, snapshot:any) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>

                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided2:any, snapshot2:any) => (
                                        <div
                                            ref={provided2.innerRef}
                                            {...provided2.draggableProps}
                                            {...provided2.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot2.isDragging,
                                                provided2.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                {/* {this.state.notes.map(note =>(
                    <Note key={note.id} id={note.id} header={note.header} body={note.body}/>         
                ))} */}
            </DragDropContext>
        </Grid>
    )
  }

  private getList = (id: string ) => this.state[this.id2List[id]];

  private onDragEnd = (result: { source: any; destination: any; }) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        const items = reorder(
            this.getList(source.droppableId),
            source.index,
            destination.index
        );

        if (source.droppableId === 'droppable2') {
            this.setState({ selected: items });
        }
        else {
            this.setState({items});
        }


    } else {
        const moveResult = move(
            this.getList(source.droppableId),
            this.getList(destination.droppableId),
            source,
            destination
        );

        this.setState({
            items: moveResult.droppable,
            selected: moveResult.droppable2
        });
    }
};
}

