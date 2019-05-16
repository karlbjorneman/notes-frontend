import {addNoteSuccess, fetchNotesSuccess, fetchNotesFailure} from './../actions/notesActions'
import {addNoteToColumn} from '../actions/columnsActions'

export function updatenote(state: any, tokenId:any) {
    fetch(process.env.REACT_APP_BASEURL + '/api/notes/' + state.id, {
        body: JSON.stringify(state),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + tokenId
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function addNoteDispatched(header:string, body:string) {
    return (dispatch:any, getState:any) => {
        const currentState = getState();
        addNote(header, body, currentState.auth.tokenId)
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

function addNote(header: string, body: string, tokenId:any) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes/', {
        body: JSON.stringify({
                Header: header,
                Body: body
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + tokenId
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
        getAllNotes(currentState.auth.tokenId)
        .then((data:any) => {
            const notes = data;
            dispatch(fetchNotesSuccess(notes))
          })
          .catch((error:any) => {
            dispatch(fetchNotesFailure(error.message))
        })
    }
}

function getAllNotes(tokenId:any) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes', {
        headers: {
            'Authorization': 'Bearer ' + tokenId
        }
    })
    .then(results => {
        return results.json();
    });
}