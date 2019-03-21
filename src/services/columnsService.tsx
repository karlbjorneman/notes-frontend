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