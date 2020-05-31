import { combineReducers } from "redux";
import counter from "./counter";
import cartDetail from "./getIDProduct";


const rootReducer = combineReducers({
  counter,
  cartDetail,
});

export default rootReducer;