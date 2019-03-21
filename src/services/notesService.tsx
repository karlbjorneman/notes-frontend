import {fetchNotesSuccess, fetchNotesFailure} from './../actions/notesActions'

export function updatenote(state: any) {
    fetch(process.env.REACT_APP_BASEURL + '/api/notes/' + state.id, {
        body: JSON.stringify(state),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
        },       
        method: 'PUT',
        mode: 'cors'
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