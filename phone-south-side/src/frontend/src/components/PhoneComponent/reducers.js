import { combineReducers } from "redux";
import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_CONNECTED_VALUE_ASYNC,
  CHANGE_MQTTBOOL_VALUE,
  CHANGE_MQTTBOOL_VALUE_ASYNC,
  TURN_OFF_SIGNAL_STRENGTH
} from "../../constants";

const initialConnectedValues = {
  connectVal: 0,
  clientBoolean: false
};

const offValue = {
  turnOffVal: null
};

export const connectedValue = (state = 0, action) => {
  if (action.type === CHANGE_CONNECTED_VALUE) {
    return { ...state, connectVal: action.payload };
  } else if (action.type === CHANGE_CONNECTED_VALUE_ASYNC) {
    return { ...state, connectVal: action.payload };
  } else {
    // console.log("HEY THERE", initialConnectedValues.connectVal);
    return state;
  }
};

export const mqttClientBoolean = (state = false, action) => {
  // console.log("OH MY GOD");
  if (
    action.type === CHANGE_MQTTBOOL_VALUE ||
    action.type === CHANGE_MQTTBOOL_VALUE_ASYNC
  ) {
    // console.log("OH MY GOD");
    return { ...state, clientBoolean: action.payload };
  } else {
    // console.log("OH WELL");
    return state;
  }
};

export const signalStrengthOff = (state = 1, action) => {
  if (action.type === TURN_OFF_SIGNAL_STRENGTH) {
    return { ...state, turnOffVal: action.payload };
  } else {
    return state;
  }
};

// const reducers = combineReducers({
//   signalStrength,
//   mqttClientBoolean,
//   connectedValue
// });
