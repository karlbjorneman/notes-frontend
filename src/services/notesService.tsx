//const baseUrl = 'https://gustaftech-noteswebapi.azurewebsites.net'
const baseUrl = 'http://localhost:5001'

export function updatenote(state: any) {
    fetch(baseUrl + '/api/notes/' + state.id, {
        body: JSON.stringify(state),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8'
        },       
        method: 'PUT',
        mode: 'cors'
    });
}

export function getAllNotes() {
    return fetch(baseUrl + '/api/notes'
    // ,  {credentials: 'include' }
)
    .then(results => {
        return results.json();
    });
}