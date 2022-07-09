import { combineReducers } from "redux";
import { chatReducer, countReducer, emailReducer, friendsReducer, keyReducer, nameReducer, progressReducer, remailReducer, rnameReducer, toastReducer } from "./reducers";


const reducers = combineReducers({
    emailReducer:emailReducer,
    nameReducer:nameReducer,
    remailReducer:remailReducer,
    rnameReducer:rnameReducer,
    toastReducer:toastReducer,
    friendsReducer:friendsReducer,
    chatReducer:chatReducer,
    countReducer:countReducer,
    progressReducer:progressReducer
})

export default reducers;