import { put, take, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { CHANGE_SIGNAL_STRENGTH } from "../../constants";

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
    return () => {};
  });
}
