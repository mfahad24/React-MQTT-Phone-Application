//leaving comment outs below because it was setup like this before Redux Dynamic Module setup

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import { Provider } from "react-redux";
//takes reducers and creates store
// import { createStore, applyMiddleware } from "redux";
// import { combineReducers } from "redux";
// import {
//   mqttClientBoolean,
//   connectedValue
// } from "./components/PhoneComponent/reducers.js";
// import { signalStrength } from "./components/SignalStrengthComponent/reducers.js";
// import createSagaMiddleware from "redux-saga";
// import { signalStrengthSaga } from "./components/SignalStrengthComponent/sagas.js";
// import { switchOffPhone } from "./components/PhoneComponent/sagas.js";
//allows us to load/unload modules dynamically
// import { configureStore } from "redux-dynamic-modules";
// import { getSagaExtension } from 'redux-dynamic-modules';

// const sagaMiddleware = createSagaMiddleware();

// const reducers = combineReducers({
//   signalStrength,
//   mqttClientBoolean,
//   connectedValue
// });

ReactDOM.render(
  // <Provider store={createStore(reducers, applyMiddleware(sagaMiddleware))}>
  //   <App />
  // </Provider>,
  // <Provider></Provider>
  <App />,
  document.querySelector("#root")
);

// sagaMiddleware.run(signalStrengthSaga);
// sagaMiddleware.run(switchOffPhone);

//steps in setting up a saga - watcher saga catches an action before it gets to reducer and allows, for instance, an async request to complete, then it will dispatch another action that will reach reducer
//import redux from redux-saga and applymiddleware from redux
//run saga middleware (and set it to a variable)
//run sagamiddleware after applymiddleware with saga as argument has been mounted to the application
//import the watcher saga and run it with the sigglemiddleware variable AFTER its been mounted
