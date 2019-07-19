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