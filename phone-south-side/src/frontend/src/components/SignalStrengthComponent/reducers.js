import { CHANGE_SIGNAL_STRENGTH } from "../../constants";

const initialSignalStrength = {
  signalStrength: null
};

export const signalStrength = (state = null, action) => {
  if (action.type === CHANGE_SIGNAL_STRENGTH) {
    return { ...state, signalStrength: action.payload };
  } else {
    return state;
  }
};
