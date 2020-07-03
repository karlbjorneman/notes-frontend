import {addNoteSuccess, fetchNotesSuccess, fetchNotesFailure, updateNoteSuccess, updateNoteImageSuccess} from './../actions/notesActions'
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
            dispatch(updateNoteSuccess(note));
          })
    }
}

export function updateNoteImageDispatched(note:any) {

    let form = new FormData();
    form.append('header', note.header);
    form.append('body', note.body);
    form.append('position', note.position.column)
    form.append('file', note.image);

    return noteImageDispatched(form, "PUT", "image/" + note.id, (dispatch:any, note:any) => {
        dispatch(updateNoteImageSuccess(note));
    });
}

export function addNoteImageDispatched(header: string, body:string, image: any) {
    
    let form = new FormData();
    form.append('header', header);
    form.append('body', body);
    if (image) {
        form.append('file', image);
    }

    return noteImageDispatched(form, "POST", "", (dispatch:any, note:any) => {
        dispatch(addNoteSuccess(note));
        dispatch(addNoteToColumn(note));
    });
}

function noteImageDispatched(form: FormData, httpVerb:string, url: string, successDispatchers: Function) {
    return (dispatch: any, getState: any) => {
        const currentState = getState();

        form.append('accessToken', currentState.auth.googleAccessToken);

        fetch(process.env.REACT_APP_BASEURL + '/api/notes/' + url, {
            body: form,
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + currentState.auth.tokenId
            },
            method: httpVerb,
            mode: 'cors'
        })
            .then((data: any) => {
                return data.json();
            })
            .then((data: any) => {
                const note = data;
                successDispatchers(dispatch, note);
            })
            .catch((error: any) => {
                const err = error;
            });
    };
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