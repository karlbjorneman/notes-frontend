import {
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_FAILURE,
    ADD_NOTE_SUCCESS,
    UPDATE_NOTES_SUCCESS,
    UPDATE_NOTES_IMAGE_SUCCESS
  } from './../actions/notesActions';
import {arrayToObject} from '../helpers/arrayExtensions'
import {fromJS} from 'immutable'

  const initialState = {
          byId: {},
          allIds: []
  }

  export default function notesReducer(state = initialState, action:any) {

    let immutableState;

    switch(action.type) {
        case FETCH_NOTES_SUCCESS:

            return Object.assign({}, state, {
                    byId: arrayToObject(action.payload.notes, "id"),
                    allIds: action.payload.notes.map((note:any) => {
                        return note.id;
                    })
                }); 
        case FETCH_NOTES_FAILURE:
            return Object.assign({}, state, {
                error: action.payload.error
            });
        case ADD_NOTE_SUCCESS:
            immutableState = fromJS(state); 

            let allIds = immutableState.get('allIds');
            allIds = allIds.push(action.payload.note.id);
            immutableState = immutableState.set('allIds', allIds);
            
            immutableState = immutableState.setIn(['byId', action.payload.note.id], action.payload.note);

            return immutableState.toJS();            

        case UPDATE_NOTES_SUCCESS:
            immutableState = fromJS(state); 
            immutableState = immutableState.setIn(['byId', action.payload.note.id], action.payload.note);

            return immutableState.toJS();
        case UPDATE_NOTES_IMAGE_SUCCESS:
            immutableState = fromJS(state);
            immutableState = immutableState.setIn(['byId', action.payload.note.id], action.payload.note);

            return immutableState.toJS();
        default:
            return state;
    }
  }