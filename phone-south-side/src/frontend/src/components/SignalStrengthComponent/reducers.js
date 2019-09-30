import { CHANGE_SIGNAL_STRENGTH } from "../../constants";

const initialState = {
  signalStrength: undefined
};
export default (state = initialState, action) => {
  if (action.type === CHANGE_SIGNAL_STRENGTH) {
    return { ...state, signalStrength: action.payload };
  } else {
    return state;
  }
};
