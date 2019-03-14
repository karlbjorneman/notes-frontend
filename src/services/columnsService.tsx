import {fetchColumnsSuccess, fetchColumnsFailure} from './../actions/columnsActions'

//const baseUrl = 'https://gustaftech-noteswebapi.azurewebsites.net'
const baseUrl = 'http://localhost:5001'

function getAllColumns() {
    return fetch(baseUrl + '/api/columns')
    .then(results => {
        return results.json();
    });
}

export function getAllColumnsDispatched() {
    return (dispatch:any, getState:any) => {
        getAllColumns()
        .then((data:any) => {
            const columns = data;
            dispatch(fetchColumnsSuccess(columns))
          })
          .catch((error:any) => {
            dispatch(fetchColumnsFailure(error.message))
        })
    }
}