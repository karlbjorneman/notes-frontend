import { Grid } from '@material-ui/core';
import * as React from 'react';
import {Draggable, Droppable } from 'react-beautiful-dnd';

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


interface IColumn {
    id: string,
    tasks: string[]
}

interface INoteItem {
    id: string;
    header: string;
    body: string;
    position: {column: string}
}

export default class Column extends React.Component<{column: IColumn, tasks: any}, {error:string, notes:INoteItem[], isLoaded: boolean}> {
   
    constructor(props: {column: IColumn, tasks: any}) {
        super(props);

        this.state = {
            error: '',
            isLoaded: false,
            notes: []
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
    
        )
        .catch(error => { 
            // tslint:disable-next-line:no-console
            console.debug(error) ; 
        } );
      }
   
    public render() {
        return (
            <Droppable droppableId={this.props.column.id}>
            {(provided: any, snapshot: any) => (
                <div ref={provided.innerRef} 
                     style={getListStyle(snapshot.isDraggingOver)}>
                    <Grid item={true} xs={12}>
                        {this.state.notes.map((note: INoteItem, index:any) => (
                            <Draggable
                                key={note.id}
                                draggableId={note.id}
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
                                        {note.header}
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </Grid>
                </div>
            )}
        </Droppable>
        )
    }
}