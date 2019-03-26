import { Grid } from '@material-ui/core';
import * as React from 'react';
import {Draggable, Droppable } from 'react-beautiful-dnd';
import Note from './Note';

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    padding: grid * 2,
    ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
    width:'100%'
});

interface IColumn {
    noteIds: string[]
}

interface INoteRef {
    byId: any
    allIds: []
}

class Column extends React.Component<{id: string, column: IColumn, notes: INoteRef}> {
   
    constructor(props: {id: string, column: IColumn, notes: INoteRef}) {
        super(props);
    }
   
    public render() {
        return (
            <Droppable droppableId={this.props.id}>
            {(provided: any, snapshot: any) => (
                <Grid item={true} xs={4}>
                    <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {
                        this.props.column.noteIds.map((noteId: string, index:any) => {        
                        
                        if (this.props.notes.allIds.length == 0)
                            return(null);
                        
                        let note = this.props.notes.byId[noteId]

                        return(
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
                                        )}>                                        
                                        <Note key={note.id} id={note.id} header={note.header} body={note.body} position={note.position}/>
                                    </div>
                                )}
                            </Draggable>)
                        })
                    }

                    {provided.placeholder}
                    </div>
                </Grid>
            )}
            </Droppable>
        )
    }
}

export default Column