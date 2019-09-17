import { takeEvery, put, take, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
// import { createWebSocketConnection } from "./soecketConnection";
import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_MQTTBOOL_VALUE,
  CHANGE_MQTTBOOL_VALUE_ASYNC,
  CHANGE_CONNECTED_VALUE_ASYNC
} from "../constants";

var mqtt = require("async-mqtt");
var client = mqtt.connect("ws://127.0.0.1:7000");

//sagas that watch and act upon mqttBolean change
export function* watchMqttClientBooleanChange() {
  yield takeEvery(CHANGE_MQTTBOOL_VALUE, changeMqttBoolean);
}

export function* changeMqttBoolean() {
  client.subscribe("hmi/phone/connected");
  yield client.on("message", function(payload, message) {
    console.log("CONNECTED!");
    put({
      type: CHANGE_MQTTBOOL_VALUE_ASYNC,
      payload: false
    });
  });
}

//sagas that watch and act upon phone connection and strength value change
export function* watchConnectedValueChange() {
  yield takeEvery(CHANGE_CONNECTED_VALUE, changeConnectedValue);
}

export function* changeConnectedValue() {
  yield put({ type: CHANGE_CONNECTED_VALUE_ASYNC, payload: 1 });
}
