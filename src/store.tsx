import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import auth from "./reducers/authReducer";
import notes from "./reducers/notesReducer";
import columns from "./reducers/columnsReducer";

export default createStore(combineReducers({
    auth,
    notes,
    columns
}),
    {},
    composeWithDevTools(applyMiddleware(createLogger(), thunk))
);