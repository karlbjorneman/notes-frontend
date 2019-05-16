import {
    FETCH_COLUMNS_SUCCESS,
    FETCH_COLUMNS_FAILURE,
    MOVE_NOTE,
    ADD_NOTE_TO_COLUMN
  } from './../actions/columnsActions';
import {arrayToObject} from '../helpers/arrayExtensions'
import { fromJS } from 'immutable';
import {updateColumns} from '../services/columnsService' 
import { loop, Cmd } from 'redux-loop';

const initialState = {
        byId: {},
        allIds: []
}

export default function columnsReducer(state = initialState, action:any) {
    let immutableState = fromJS(state);
    
    switch(action.type) {
        case FETCH_COLUMNS_SUCCESS:
            return Object.assign({}, state, {
                    byId: arrayToObject(action.payload.columns, "columnId"),
                    allIds: action.payload.columns.map((column:any) => {
                        return column.columnId;
                    }),
                }); 
        case FETCH_COLUMNS_FAILURE:
            return state;
        case MOVE_NOTE:      
            let source = action.payload.source;
            let destination = action.payload.destination;
            let newState;

            if (!destination) {
                return state;
            }    
            if (destination.droppableId === source.droppableId &&
                destination.index === source.index) {
                return state;
            }
      
            const startColumn = immutableState.getIn(['byId', source.droppableId]); 
            const finishColumn = immutableState.getIn(['byId', destination.droppableId]); 
      
            if (startColumn.equals(finishColumn)) {
                const updateColumnsCmd = moveItemWithinColumn(startColumn, source, destination);
                newState = immutableState.toJS();

                return loop(newState, updateColumnsCmd);
            }
            else {
                const updateColumnsCmd = moveItemOutsideColumn(startColumn, finishColumn, source, destination);
                newState = immutableState.toJS();

                return loop(newState, updateColumnsCmd);
            }
        case ADD_NOTE_TO_COLUMN:
            const note = action.payload.note;
            
            let columnNotes = immutableState.getIn(['byId', note.position.column, 'noteIds']);
            columnNotes = columnNotes.insert(0, note.id);

            immutableState = immutableState.setIn(['byId', note.position.column, 'noteIds'], columnNotes);

            const res = immutableState.toJS();
            return res;
        default:
            return state;
    }

    function moveItemOutsideColumn(startColumn:any, finishColumn:any, source:any, destination:any) {
        let sourceNotes = startColumn.get('noteIds');
        const itemToMoveOutside = sourceNotes.get(source.index);
        sourceNotes = sourceNotes.delete(source.index);
      
        let destinationNotes = finishColumn.get('noteIds');
        destinationNotes = destinationNotes.insert(destination.index, itemToMoveOutside);

        immutableState = immutableState.setIn(['byId', startColumn.get('columnId'), 'noteIds'], sourceNotes);
        immutableState = immutableState.setIn(['byId', finishColumn.get('columnId'), 'noteIds'], destinationNotes);

        const updateColumnsCmd = Cmd.run(updateColumns, {
            args: [source.droppableId, destination.droppableId, sourceNotes, destinationNotes, action.payload.auth.tokenId]
        })

        return updateColumnsCmd;
    }

    function moveItemWithinColumn(startColumn:any, source:any, destination:any) {
        let immutableNotes =startColumn.get('noteIds');
        let newList;

        if (source.index < destination.index) {
            const itemToMoveInside = immutableNotes.get(source.index);
            newList = immutableNotes.delete(source.index)
                                    .insert(destination.index, itemToMoveInside);
        }
        else {
            const sourceItem = immutableNotes.get(source.index);
            const targetItem = immutableNotes.get(destination.index);
            immutableNotes = immutableNotes.delete(source.index);
            const targetIndex = immutableNotes.indexOf(targetItem);
            newList = immutableNotes.insert(targetIndex, sourceItem);
        }

        immutableState = immutableState.setIn(['byId', startColumn.get('columnId'), 'noteIds'], newList);

        const updateColumnsCmd = Cmd.run(updateColumns, {
            args: [source.droppableId, destination.droppableId, newList, null, action.payload.auth.tokenId]
        })

        return updateColumnsCmd;
    }
}