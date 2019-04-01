import {fetchColumnsSuccess, fetchColumnsFailure} from './../actions/columnsActions'

function getAllColumns(user:any) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/columns', {
        headers: {
            'Authorization': 'Bearer ' + user
        }
    })
    .then(results => {
        return results.json();
    });
}

export function updateColumn(id: string, notes: string[], user: any) {
    fetch(process.env.REACT_APP_BASEURL + '/api/columns/' + id + '/notes', {
        body: JSON.stringify(notes),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + user
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function getAllColumnsDispatched() {
    return (dispatch:any, getState:Function) => {
        const currentState = getState();
        getAllColumns(currentState.auth.user)
        .then((data:any) => {
            const columns = data;
            dispatch(fetchColumnsSuccess(columns))
          })
          .catch((error:any) => {
            dispatch(fetchColumnsFailure(error.message))
        })
    }
}