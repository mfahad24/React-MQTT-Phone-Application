import { takeEvery } from "redux-saga/effects";
import { TURN_OFF_SIGNAL_STRENGTH } from "../../constants";

let mqtt = require("async-mqtt");
let client = mqtt.connect("ws://127.0.0.1:7000");

//sagas to turn off signal strength
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
    // testFunc(payloadObject.payload);
    // put({ type: CHANGE_CONNECTED_VALUE_ASYNC, payload: payloadObject.payload });
  });
  // yield console.log("I AM HERE", payloadObject);

  // while (false) {
  //   console.log("HELLO");
  //   const { payload } = yield take("REQUEST");
  //   yield fork(handleRequest, payload);
  // }
  // ----------
  // console.log("OH HEY");
  // const channel = yield call(webSocketEndChannel);
  // while (true) {
  //   const action = yield take(channel);
  //   yield put(action);
  // }
}

// export function testFunc(num) {
//   console.log("payload value", num);
// }

// function* handleRequest(payload) {
//   yield console.log("HELLO");
// }

// export function* test() {
//   yield console.log("HEY");
// }

// function webSocketEndChannel() {
//   return eventChannel(emitter => {
//     client.subscribe("hmi/phone/connected");
//     client.on("message", function(message, payload) {
//       // console.log(payload.toString());
//       let payloadObject = JSON.parse(payload.toString());
//       return emitter({
//         type: CHANGE_CONNECTED_VALUE_ASYNC,
//         payload: payloadObject.payload
//       });
//     });

//     //unsubscribe function below
//     return () => {
//       console.log("SOCKET OFF!!");
//     };
//   });
// }

// export function* listenForDisconnetValue() {
//   yield client.subscribe("hmi/phone/connected", () => {
//     console.log("HELLO THERE");
//   });
// }

//-----------------------------------------

// export function* listenForDisconnectValue() {
//   const channel = yield call(disconnectValueEmitter);
//   while (true) {
//     const action = yield take(channel);
//     yield put(action);
//   }
// }

// function disconnectValueEmitter() {
//   return eventChannel(emitter => {
//     client.subscribe("hmi/phone/connected");
//     client.on("message", function(message, payload) {
//       console.log("HERE IS THE PAYLOAD", payload.toString());
//       let payloadObject = JSON.parse(payload.toString());
//       return emitter({
//         type: CHANGE_CONNECTED_VALUE_ASYNC,
//         payload: payloadObject.payload
//       });
//     });

//     //unsubscribe function below
//     return () => {
//       console.log("SOCKET OFF!!");
//     };
//   });
// }

//sagas that watch and act upon phone connection and strength value change
// export function* watchConnectedValueChange() {
//   yield takeEvery(CHANGE_CONNECTED_VALUE, changeConnectedValue);
// }

// export function* changeConnectedValue() {
//   yield put({ type: CHANGE_CONNECTED_VALUE_ASYNC, payload: 1 });
// }
