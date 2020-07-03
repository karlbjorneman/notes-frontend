export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS'
export const UPDATE_NOTES_SUCCESS = 'UPDATE_NOTES_SUCCESS';
export const UPDATE_NOTES_IMAGE_SUCCESS = 'UPDATE_NOTES_IMAGE_SUCCESS';

export const fetchNotesSuccess = (notes:any) => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { notes: notes }
});

export const fetchNotesFailure = (error:any) => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error }
});

export function addNoteSuccess(note: any) {
  return {
  type: ADD_NOTE_SUCCESS,
  payload: { note }
  }
}

export function updateNoteSuccess(note: any) {
  return {
  type: UPDATE_NOTES_SUCCESS,
  payload: { note }
  }
}

export function updateNoteImageSuccess(note: any) {
  return {
  type: UPDATE_NOTES_IMAGE_SUCCESS,
  payload: { note }
  }
}


