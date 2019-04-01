import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import auth from "./reducers/authReducer";
import notes from "./reducers/notesReducer";
import columns from "./reducers/columnsReducer";
import { install, LoopReducer, StoreCreator, combineReducers } from 'redux-loop';

const enhancedCreateStore = createStore as StoreCreator;

export default enhancedCreateStore(combineReducers({
    auth,
    notes,
    columns
}),
    { 
        auth: { 
            user: '', isAuthenticated: false 
        },
        notes: { byId: {}, allIds: [] },
        columns: { byId: {}, allIds: [] } 
    },
    composeWithDevTools(applyMiddleware(createLogger(), thunk), install()) as any
);