import { combineReducers } from "redux";
import clients from "./clientReducer";
import leads from "./leadReducer";

const rootReducer = combineReducers({
  leads,
  clients
});

export default rootReducer;
