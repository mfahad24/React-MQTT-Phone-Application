import { put, take, call, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  CHANGE_SIGNAL_STRENGTH,
  CHANGE_CONNECTED_VALUE
} from "../../constants";

let mqtt = require("async-mqtt");
let client = mqtt.connect("ws://127.0.0.1:7000");

export function* listenForConnection() {
  yield takeEvery(CHANGE_CONNECTED_VALUE, connectToMqtt);
}

export function* connectToMqtt() {
  yield console.log("connecting...");
  let payload = JSON.stringify({ payload: 1 });
  yield client.publish("hmi/phone/set/connected", payload, null, () => {
    console.log("OK IT WENT THROUGH");
  });
}

//-------------------

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
    return () => {};
  });
}
