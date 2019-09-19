import { takeEvery, put, take, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_MQTTBOOL_VALUE,
  CHANGE_MQTTBOOL_VALUE_ASYNC,
  CHANGE_CONNECTED_VALUE_ASYNC,
  CHANGE_SIGNAL_STRENGTH
} from "../constants";

let mqtt = require("async-mqtt");

export function* webSocketSagas() {
  const channel = yield call(websocketInitChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function websocketInitChannel() {
  return eventChannel(emitter => {
    let client = mqtt.connect("ws://127.0.0.1:7000");
    client.subscribe("hmi/phone/signalStrength");
    client.on("message", function(message, payload) {
      const payloadObject = JSON.parse(payload.toString());
      return emitter({
        type: CHANGE_SIGNAL_STRENGTH,
        payload: payloadObject.payload
      });
    });

    //unsubscribe function below
    return () => {
      console.log("SOCKET OFF!!");
    };
  });
}

//sagas that watch and act upon phone connection and strength value change
export function* watchConnectedValueChange() {
  yield takeEvery(CHANGE_CONNECTED_VALUE, changeConnectedValue);
}

export function* changeConnectedValue() {
  yield put({ type: CHANGE_CONNECTED_VALUE_ASYNC, payload: 1 });
}
