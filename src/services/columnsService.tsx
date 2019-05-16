import {fetchColumnsSuccess, fetchColumnsFailure} from './../actions/columnsActions'

export function updateColumns(sourceId: string, destinationId: string, sourceNotes: string[], destinationNotes: string[], tokenId: any) {
    fetch(process.env.REACT_APP_BASEURL + '/api/columns/' + sourceId + '/' + destinationId + '/notes', {
        body: JSON.stringify({
            SourceNotes: sourceNotes,
            DestinationNotes: destinationNotes
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + tokenId
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function getAllColumnsDispatched() {
    return (dispatch:any, getState:Function) => {
        const currentState = getState();
        getAllColumns(currentState.auth.tokenId)
        .then((data:any) => {
            const columns = data;
            dispatch(fetchColumnsSuccess(columns))
          })
          .catch((error:any) => {
            dispatch(fetchColumnsFailure(error.message))
        })
    }
}

function getAllColumns(tokenId:any) {
    return fetch(process.env.REACT_APP_BASEURL + '/api/columns', {
        headers: {
            'Authorization': 'Bearer ' + tokenId
        }
    })
    .then(results => {
        return results.json();
    });
}