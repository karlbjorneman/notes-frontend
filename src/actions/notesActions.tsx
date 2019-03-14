export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const fetchNotesSuccess = (notes:any) => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { notes: notes }
});

export const fetchNotesFailure = (error:any) => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error }
});