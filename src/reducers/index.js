import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import lists from "./lists";

export const reducers = combineReducers({
  routing: routerReducer,
  lists,
});
