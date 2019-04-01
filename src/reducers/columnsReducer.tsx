import {
    FETCH_COLUMNS_SUCCESS,
    FETCH_COLUMNS_FAILURE,
    MOVE_NOTE
  } from './../actions/columnsActions';
import {arrayToObject} from '../helpers/arrayExtensions'
import { fromJS } from 'immutable';
import {updateColumn} from '../services/columnsService' 
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
                var newList = moveItemWithinColumn(startColumn, source, destination);
                newState = immutableState.toJS();
            }
            else {
                moveItemOutsideColumn(startColumn, finishColumn, source, destination);
                newState = immutableState.toJS();
            }
            
            const updateColumnCmd = Cmd.run(updateColumn, {
                args: [destination.droppableId, newList, action.payload.auth.user]
            });

            return loop(newState, updateColumnCmd);

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

        return newList;
    }
}