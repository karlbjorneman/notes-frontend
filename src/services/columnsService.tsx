import {fetchColumnsSuccess, fetchColumnsFailure} from './../actions/columnsActions'

function getAllColumns() {
    return fetch(process.env.REACT_APP_BASEURL + '/api/columns')
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