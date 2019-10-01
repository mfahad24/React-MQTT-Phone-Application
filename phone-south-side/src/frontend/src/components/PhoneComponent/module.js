import {
  changeConnectedValue,
  changeMqttBoolean
  // turnOffSignalStrength
} from "./actions.js";
import { connectedValue, mqttClientBoolean } from "./reducers.js";
import { switchOffPhone } from "./sagas.js";

export function phoneModule() {
  return {
    //unique id of module
    id: "phone-component",
    //maps Store key to the reducer
    reducerMap: {
      connectedValue,
      mqttClientBoolean
    },
    //optional: any action to dispatch when module is loaded
    initialActions: [
      // changeConnectedValue(),
      // changeMqttBoolean()
      //wont include this below as it it will dispatch disconnect the phone on load
      // turnOffSignalStrength()
    ],
    //optional: any actions to dispatch when the module is unloaded,
    finalactions: [],
    //this property will be used by the saga extension to run sagas for the moduleD??????
    sagas: [switchOffPhone]
  };
}
