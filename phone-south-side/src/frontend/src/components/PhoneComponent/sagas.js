import { takeEvery } from "redux-saga/effects";
import { TURN_OFF_SIGNAL_STRENGTH } from "../../constants";

let mqtt = require("async-mqtt");
let client = mqtt.connect("ws://127.0.0.1:7000");

//stops signal strength from coming through

export function* switchOffPhone() {
  yield takeEvery(TURN_OFF_SIGNAL_STRENGTH, changeSignalStrength);
}

export function* changeSignalStrength() {
  yield console.log("turning off signal...");
  //solution for error "SyntaxError: Unexpected end of JSON input"
  //simply cant send let payload = { payload: 0}
  let payload = JSON.stringify({ payload: 0 });
  yield client.publish("hmi/phone/set/connected", payload, null, () => {
    listenForDisconnectValue();
  });
}

export function listenForDisconnectValue() {
  console.log("WE ARE HERE");
  client.subscribe("hmi/phone/connected");
  // let payloadObject;
  client.on("message", function(message, payload) {
    console.log("topic:", message);
    let returnedPayload = JSON.parse(payload.toString());
    console.log("returned final connected:", returnedPayload.payload);
  });
}
