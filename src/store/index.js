import { createStore } from "redux";
import _ from "lodash";
// import { addResponse } from "../actions";
const initailState = {
  list: [],
  fav: [],
};
const rootReducer = (state = initailState, action) => {
  switch (action.type) {
    case "ADDRESPONSE":
      const concat = state.list.concat(action.payload);
      const uniqueConcat = _.unionBy(state.list, action.payload, "ifsc");
      return {
        ...state,
        //list: state.list.concat(action.payload),
        list: uniqueConcat,
      };

    case "ADDFAV":
      console.log("fav", state.fav);
      return {
        ...state,
        fav: state.fav.concat(action.payload),
      };
    default:
      return state;
  }
};

export default createStore(rootReducer);
