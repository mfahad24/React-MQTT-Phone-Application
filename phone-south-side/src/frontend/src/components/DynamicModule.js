// import {
//   signalStrength,
//   connectedValue,
//   mqttClientBoolean
// } from "../reducers/index.js";
// import {
//   changeStrengthValue,
//   changeConnectedValue,
//   turnOffSignalStrength,
//   changeMqttBoolean
// } from "../actions/index.js";
// import {
//   signalStrengthSaga,
//   switchOffPhone,
//   changeSignalStrength,
//   listenForDisconnectValue
// } from "../sagas/saga.js";

// export function ModuleExample() {
//   return {
//     //unique id of module
//     id: "all-components",
//     //maps Store key to the reducer
//     reducerMap: {
//       signalStrength,
//       connectedValue,
//       mqttClientBoolean
//     },
//     //optional: any action sto dispatch when module is loaded
//     initialActions: [
//       changeStrengthValue(),
//       changeConnectedValue(),
//       turnOffSignalStrength(),
//       changeMqttBoolean()
//     ],
//     //optional: any actions to dispatch when the module is unloaded,
//     finalactions: [],
//     //this property will be used by the saga extension to run sagas for the moduleD??????
//     sagas: [
//       signalStrengthSaga,
//       switchOffPhone,
//       changeSignalStrength,
//       listenForDisconnectValue
//     ]
//   };
// }
