import { createStore } from "redux";
const initailState = {
  data: "lorem ipsum",
};
const rootReducer = (state = initailState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default createStore(rootReducer);
