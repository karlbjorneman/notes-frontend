import {addNoteSuccess, fetchNotesSuccess, fetchNotesFailure} from './../actions/notesActions'
import {addNoteToColumn} from '../actions/columnsActions'

export function updatenote(state: any, user:any) {
    fetch(process.env.REACT_APP_BASEURL + '/api/notes/' + state.id, {
        body: JSON.stringify(state),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + user
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function addNoteDispatched(header:string, body:string) {
    return (dispatch:any, getState:any) => {
        const currentState = getState();
        addNote(header, body, currentState.auth.user)
        .then((data:any) => {
            const notes = data;
            dispatch(addNoteSuccess(notes));
            dispatch(addNoteToColumn(notes));
          })
          .catch((error:any) => {
            //dispatch(addNotesFailure(error.message))
        })
    }
}

function addNote(header: string, body: string, user:any) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes/', {
        body: JSON.stringify({
                Header: header,
                Body: body
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + user
        },       
        method: 'POST',
        mode: 'cors'
    })
    .then((data:any) => {
        return data.json();
    });
}

export function getAllNotesDispatched() {
    return (dispatch:any, getState:any) => {
        const currentState = getState();
        getAllNotes(currentState.auth.user)
        .then((data:any) => {
            const notes = data;
            dispatch(fetchNotesSuccess(notes))
          })
          .catch((error:any) => {
            dispatch(fetchNotesFailure(error.message))
        })
    }
}

function getAllNotes(user:any) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes', {
        headers: {
            'Authorization': 'Bearer ' + user
        }
    })
    .then(results => {
        return results.json();
    });
}