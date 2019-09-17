import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
//takes reducers and creates store
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import {
  watchMqttClientBooleanChange,
  watchConnectedValueChange
} from "./sagas/saga.js";

const sagaMiddleware = createSagaMiddleware();

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(sagaMiddleware))}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

sagaMiddleware.run(watchMqttClientBooleanChange);
sagaMiddleware.run(watchConnectedValueChange);

//steps in setting up a saga - watcher saga catches an action before it gets to reducer and allows, for instance, an async request to complete, then it will dispatch another action that will reach reducer
//import redux from redux-saga and applymiddleware from redux
//run saga middleware (and set it to a variable)
//run sagamiddleware after applymiddleware with saga as argument has been mounted to the application
//import the watcher saga and run it with the sigglemiddleware variable AFTER its been mounted
