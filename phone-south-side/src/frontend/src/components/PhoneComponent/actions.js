import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_MQTTBOOL_VALUE,
  TURN_OFF_SIGNAL_STRENGTH
} from "../../constants";

export const changeConnectedValue = connectVal => {
  return {
    type: CHANGE_CONNECTED_VALUE,
    payload: connectVal
  };
};

export const changeMqttBoolean = mqttBoolean => {
  return {
    type: CHANGE_MQTTBOOL_VALUE,
    payload: mqttBoolean
  };
};

export const turnOffSignalStrength = turnOffSignal => {
  return {
    type: TURN_OFF_SIGNAL_STRENGTH,
    payload: turnOffSignal
  };
};
