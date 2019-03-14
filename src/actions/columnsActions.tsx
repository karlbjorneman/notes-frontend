export const FETCH_COLUMNS_SUCCESS = 'FETCH_COLUMNS_SUCCESS';
export const FETCH_COLUMNS_FAILURE = 'FETCH_COLUMNS_FAILURE';

export const MOVE_NOTE = 'MOVE_NOTE'
export const MOVE_NOTE_TO_OTHER_COLUMN = 'MOVE_NOTE_TO_OTHER_COLUMN'

export const fetchColumnsSuccess = (columns:any) => ({
  type: FETCH_COLUMNS_SUCCESS,
  payload: { columns: columns }
});

export const fetchColumnsFailure = (error:any) => ({
  type: FETCH_COLUMNS_FAILURE,
  payload: { error }
});

export function moveNote(column:any, source:any, destination:any) {
  return {type: MOVE_NOTE,
            payload: {
              column,
              source,
              destination
            }
          }
}

export function moveNoteToOtherColumn(source:any, destination:any) {
  return {type: MOVE_NOTE_TO_OTHER_COLUMN,
            payload: {
              source,
              destination
            }
          }
}