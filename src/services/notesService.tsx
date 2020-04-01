import {addNoteSuccess, fetchNotesSuccess, fetchNotesFailure, updateNoteSuccess} from './../actions/notesActions'
import {addNoteToColumn} from '../actions/columnsActions'

export function updatenote(note:any, tokenId:any, googleAccessToken:string) {
    
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes/' + note.id, {
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + tokenId,
            'googleAccessToken': googleAccessToken
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function updateNoteDispatched(note: any) {
    return (dispatch:any, getState:any) => {
        const currentState = getState();
        updatenote(note, currentState.auth.tokenId, currentState.auth.googleAccessToken)
        .then((data:any) => {
            dispatch(updateNoteSuccess(note))
          })
    }
}

export function addNoteImageDispatched(header: string, body:string, image: any) {
    return (dispatch:any, getState:any) => {
        const currentState = getState();
     
        let form = new FormData();
        form.append('header', header);
        form.append('body', body);
        form.append('accessToken', currentState.auth.googleAccessToken)
        if (image) {
            form.append('file', image);
        }

        fetch(process.env.REACT_APP_BASEURL + '/api/notes/', {
            body: form,
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + currentState.auth.tokenId
            },       
            method: 'POST',
            mode: 'cors'
        })
        .then((data:any) => {
            return data.json();
        })
        .then((data:any) => {
            const notes = data;
            dispatch(addNoteSuccess(notes));
            dispatch(addNoteToColumn(notes));
          })
          .catch((error:any) => {
            //dispatch(addNotesFailure(error.message))
        });
    }
}

export function getAllNotesDispatched() {
    return (dispatch:any, getState:any) => {
        const currentState = getState();
        getAllNotes(currentState.auth.tokenId, currentState.auth.googleAccessToken)
        .then((data:any) => {
            const notes = data;
            dispatch(fetchNotesSuccess(notes))
          })
          .catch((error:any) => {
            dispatch(fetchNotesFailure(error.message))
        })
    }
}

function getAllNotes(tokenId:any, googleAccessToken:string) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes', {
        headers: {
            'Authorization': 'Bearer ' + tokenId,
            'googleAccessToken': googleAccessToken
        }
    })
    .then(results => {
        return results.json();
    });
}