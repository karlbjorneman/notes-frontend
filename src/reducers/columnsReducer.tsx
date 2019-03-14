import {
    FETCH_COLUMNS_SUCCESS,
    FETCH_COLUMNS_FAILURE,
    MOVE_NOTE,
    MOVE_NOTE_TO_OTHER_COLUMN
  } from './../actions/columnsActions';
import {arrayToObject} from '../helpers/arrayExtensions'
import { fromJS } from 'immutable';

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

        case MOVE_NOTE:


        case MOVE_NOTE_TO_OTHER_COLUMN:      
            let source = action.payload.source;
            let destination = action.payload.destination;

            if (!destination) {
                return;
            }    
            if (destination.droppableId === source.droppableId &&
                destination.index === source.index) {
                return;
            }
      
            const startColumn = immutableState.getIn(['byId', source.droppableId]); 
            const finishColumn = immutableState.getIn(['byId', destination.droppableId]); 
      
            // Moving within column
            if (startColumn.equals(finishColumn)) {
                moveItemWithinColumn(startColumn, source, destination);
                return immutableState.toJS();
            }
        
            // Moving to another column
            moveItemOutsideColumn(startColumn, finishColumn, source, destination);
            return immutableState.toJS();
        default:
        return state;
    }

    function moveItemOutsideColumn(startColumn:any, finishColumn:any, source:any, destination:any) {
        let startNotes = startColumn.get('noteIds');
        const itemToMoveOutside = startNotes.get(source.index);
        startNotes = startNotes.delete(source.index);
      
        let finishNotes = finishColumn.get('noteIds');
        finishNotes = finishNotes.insert(destination.index, itemToMoveOutside);

        immutableState = immutableState.setIn(['byId', startColumn.get('columnId'), 'noteIds'], startNotes);
        immutableState = immutableState.setIn(['byId', finishColumn.get('columnId'), 'noteIds'], finishNotes);
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

        return immutableState;
    }
}