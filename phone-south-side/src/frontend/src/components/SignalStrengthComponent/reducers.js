import { CHANGE_SIGNAL_STRENGTH } from "../../constants";

export const signalStrength = (signalStrength = null, action) => {
  if (action.type === CHANGE_SIGNAL_STRENGTH) {
    return action.payload;
  } else {
    return signalStrength;
  }
};
