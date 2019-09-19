import { combineReducers } from "redux";
import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_CONNECTED_VALUE_ASYNC,
  CHANGE_SIGNAL_STRENGTH,
  CHANGE_MQTTBOOL_VALUE,
  CHANGE_MQTTBOOL_VALUE_ASYNC
} from "../constants";

// const appPhone = () => {
//   return [
//     {
//       signalStrengh: null,
//       connected: null
//     }
//   ];
// };

const signalStrength = (signalStrength = null, action) => {
  if (action.type === CHANGE_SIGNAL_STRENGTH) {
    return action.payload;
  } else {
    return signalStrength;
  }
};

const connectedValue = (connectVal = 0, action) => {
  if (
    action.type === CHANGE_CONNECTED_VALUE ||
    action.type === CHANGE_CONNECTED_VALUE_ASYNC
  ) {
    return action.payload;
  } else {
    return connectVal;
  }
};

const mqttClientBoolean = (clientBoolean = false, action) => {
  if (
    action.type === CHANGE_MQTTBOOL_VALUE ||
    action.type === CHANGE_MQTTBOOL_VALUE_ASYNC
  ) {
    return action.payload;
  } else {
    return clientBoolean;
  }
};

export default combineReducers({
  //   appPhone: appPhone,
  signalStrength: signalStrength,
  connectedValue: connectedValue,
  mqttClientBoolean: mqttClientBoolean
});
