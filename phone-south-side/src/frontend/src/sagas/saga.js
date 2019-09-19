import { takeEvery, put, take, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
// import { createWebSocketConnection } from "./soecketConnection";
import {
  CHANGE_CONNECTED_VALUE,
  CHANGE_MQTTBOOL_VALUE,
  CHANGE_MQTTBOOL_VALUE_ASYNC,
  CHANGE_CONNECTED_VALUE_ASYNC,
  CHANGE_SIGNAL_STRENGTH
} from "../constants";

let mqtt = require("async-mqtt");
let client = mqtt.connect("ws://127.0.0.1:7000");

//sagas that watch and act upon mqttBolean change
// export function* watchMqttClientBooleanChange() {
//   yield takeEvery(CHANGE_MQTTBOOL_VALUE, changeMqttBoolean);
// }

// export function* watchMqttClientBooleanChange() {
//   // yield client.on("connect", function() {
//   yield client.subscribe("hmi/phone/signalStrength");
//   client.on("message", function(topic, message) {
//     console.log("SIGNAL STRENGTH", message.toString());
//     put({
//       type: CHANGE_CONNECTED_VALUE_ASYNC,
//       payload: message.toString()
//     });
//     console.log("IM HERE");
//   });
//   // });
// }

export function* webSocketSagas() {
  // console.log("watcher");
  const channel = yield call(websocketInitChannel);
  while (true) {
    // console.log("watcher WHILE");
    const action = yield take(channel);
    // console.log("HERE IS THE ACTION:", action);
    yield put(action);
  }
}

function websocketInitChannel() {
  // console.log("Web Socket Init");
  return eventChannel(emitter => {
    //init the connection here
    let client = mqtt.connect("ws://127.0.0.1:7000");
    // console.log("CLIENT", client);
    client.subscribe("hmi/phone/signalStrength");
    // client.onopen = () => {
    //   console.log("opening...");
    //   client.send("hello server");
    // };

    // client.onconnect = e => {
    //   console.log("Client On Message");
    //   return emitter({
    //     type: CHANGE_MQTTBOOL_VALUE_ASYNC,
    //     payload: false
    //   });
    // };

    client.on("message", function(message, payload) {
      // Send the event to our saga
      console.log("MESSAGE", message);
      console.log("PAYLOAD", payload.toString());
      return emitter({
        type: CHANGE_SIGNAL_STRENGTH,
        payload: payload.toString()
      });
    });

    // client.on("message", (e) => {
    //   console.log(e)
    // })
    //unsubscribe function below
    return () => {
      console.log("SOCKET OFF!!");
    };
  });
}

//------------------------------------

//http://www.codeblocq.com/2017/08/How-to-receive-messages-from-web-sockets-using-redux-saga/
// function* createEventChannel(mySocket) {
//   console.log(mySocket);
//   yield eventChannel(emit => {
//     mySocket.onmessage(message => emit(message.data));
//     return () => {
//       mySocket.close();
//     };
//   });
// }
// function* initializeWebSocketsChannel() {
//   const mySocket = new WebSocket("ws://127.0.0.1:7000", "protocol");
//   const channel = yield call(createEventChannel, mySocket);
//   while (true) {
//     const { message } = yield take(channel);
//     yield put({ type: CHANGE_MQTTBOOL_VALUE_ASYNC, paylod: false });
//   }
// }
// export function* mySaga() {
//   yield [takeEvery(CHANGE_MQTTBOOL_VALUE, initializeWebSocketsChannel)];
// }

//------------------------------------

//sagas that watch and act upon phone connection and strength value change
export function* watchConnectedValueChange() {
  yield takeEvery(CHANGE_CONNECTED_VALUE, changeConnectedValue);
}

// export function* watchConnectedValueChange() {
//   yield client.subscribe("hmi/phone/signalStrength");
//   console.log("HEY THERE");
//   client.on("message", function(topic, message) {
//     console.log("SIGNAL STRENGTH", message.toString());
//     put({
//       type: CHANGE_CONNECTED_VALUE_ASYNC,
//       payload: message.toString()
//     });
//     // console.log("IM HERE");
//   });
//   // });
// }

export function* changeConnectedValue() {
  yield put({ type: CHANGE_CONNECTED_VALUE_ASYNC, payload: 1 });
}
