import { takeEvery, put, take, call, actionChannel } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  CHANGE_CONNECTED_VALUE,
  // CHANGE_MQTTBOOL_VALUE,
  // CHANGE_MQTTBOOL_VALUE_ASYNC,
  CHANGE_CONNECTED_VALUE_ASYNC,
  CHANGE_SIGNAL_STRENGTH,
  TURN_OFF_SIGNAL_STRENGTH
} from "../constants";

let mqtt = require("async-mqtt");
let client = mqtt.connect("ws://127.0.0.1:7000");

export function* signalStrengthSaga() {
  const channel = yield call(websocketInitChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function websocketInitChannel() {
  return eventChannel(emitter => {
    client.subscribe("hmi/phone/signalStrength");
    client.on("message", function(message, payload) {
      let payloadObject = JSON.parse(payload.toString());
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

//sagas to turn off signal strength
export function* switchOffPhone() {
  // console.log("inside switchoff phone...");
  yield takeEvery(TURN_OFF_SIGNAL_STRENGTH, changeSignalStrength);
}

export function* changeSignalStrength() {
  console.log("turning off signal...");
  let turnOffPaylod = { payload: 0 };
  yield client.subscribe("hmi/phone/set/connected");
  // yield client.publish("hmi/phone/set/connected", turnOffPaylod, err => {
  //   console.log("HELLO");
  //   return console.log(err);
  // });
  yield client.on("publish", function(turnOffPayload, err) {
    // console.log("HELLO");
    console.log("PAYLOAD", turnOffPayload);
    console.log("ERR", err.toString());
    // return console.log(err);
  });
}

//-----------------------------------------

//sagas that watch and act upon phone connection and strength value change
export function* watchConnectedValueChange() {
  yield takeEvery(CHANGE_CONNECTED_VALUE, changeConnectedValue);
}

export function* changeConnectedValue() {
  yield put({ type: CHANGE_CONNECTED_VALUE_ASYNC, payload: 1 });
}
