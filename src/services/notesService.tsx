import {fetchNotesSuccess, fetchNotesFailure} from './../actions/notesActions'

export function updatenote(state: any) {
    fetch(process.env.REACT_APP_BASEURL + '/api/notes/' + state.id, {
        body: JSON.stringify(state),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8'
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function getAllNotesDispatched() {
    return (dispatch:any, getState:any) => {
        getAllNotes()
        .then((data:any) => {
            const notes = data;
            dispatch(fetchNotesSuccess(notes))
          })
          .catch((error:any) => {
            dispatch(fetchNotesFailure(error.message))
        })
    }
}

function getAllNotes() {
    return fetch(process.env.REACT_APP_BASEURL + '/api/notes')
    .then(results => {
        return results.json();
    });
}