import {
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_FAILURE
  } from './../actions/notesActions';
import {arrayToObject} from '../helpers/arrayExtensions'

//   const initialState = {
//     columns: [
//         {
//           id: 'column-1',
//           notes: []
//         },
//         {
//           id: 'column-2',
//           notes: []
//         },
//         {
//           id: 'column-3',
//           notes: []
//         }
//       ]
//   }

  const initialState = {
          byId: {},
          allIds: []
  }

  export default function notesReducer(state = initialState, action:any) {
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
        default:
            return state;
    }
  }