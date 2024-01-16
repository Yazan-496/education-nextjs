import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducer";

const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
});
export default rootReducer;
