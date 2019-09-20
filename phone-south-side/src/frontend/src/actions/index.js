import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_SIGNAL_STRENGTH,
  CHANGE_MQTTBOOL_VALUE,
  TURN_OFF_SIGNAL_STRENGTH
} from "../constants";

export const changeStrengthValue = strengthVal => {
  return {
    type: CHANGE_SIGNAL_STRENGTH,
    payload: strengthVal
  };
};

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
