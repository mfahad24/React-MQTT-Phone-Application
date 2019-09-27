import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_CONNECTED_VALUE_ASYNC,
  CHANGE_MQTTBOOL_VALUE,
  CHANGE_MQTTBOOL_VALUE_ASYNC
} from "../../constants";

export const connectedValue = (connectVal = 0, action) => {
  if (action.type === CHANGE_CONNECTED_VALUE) {
    return action.payload;
  } else if (action.type === CHANGE_CONNECTED_VALUE_ASYNC) {
    return action.payload;
  } else {
    return connectVal;
  }
};

export const mqttClientBoolean = (clientBoolean = false, action) => {
  if (
    action.type === CHANGE_MQTTBOOL_VALUE ||
    action.type === CHANGE_MQTTBOOL_VALUE_ASYNC
  ) {
    return action.payload;
  } else {
    return clientBoolean;
  }
};
