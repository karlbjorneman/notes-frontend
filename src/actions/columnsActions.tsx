export const FETCH_COLUMNS_SUCCESS = 'FETCH_COLUMNS_SUCCESS';
export const FETCH_COLUMNS_FAILURE = 'FETCH_COLUMNS_FAILURE';

export const MOVE_NOTE = 'MOVE_NOTE'

export const fetchColumnsSuccess = (columns:any) => ({
  type: FETCH_COLUMNS_SUCCESS,
  payload: { columns: columns }
});

export const fetchColumnsFailure = (error:any) => ({
  type: FETCH_COLUMNS_FAILURE,
  payload: { error }
});

export function moveNote(source:any, destination:any, auth:any) {
  return {type: MOVE_NOTE,
            payload: {
              source,
              destination,
              auth
            }
          }
}