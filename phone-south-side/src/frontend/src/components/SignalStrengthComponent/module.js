import { changeStrengthValue } from "./actions.js";
import signalStrength from "./reducers.js";
import { signalStrengthSaga } from "./sagas.js";

export function signalStrengthModule() {
  return {
    //unique id of module
    id: "signal-strength-component",
    //maps Store key to the reducer
    reducerMap: {
      signalStrength
    },
    //optional: any action sto dispatch when module is loaded
    initialActions: [changeStrengthValue()],
    //optional: any actions to dispatch when the module is unloaded,
    finalactions: [],
    //this property will be used by the saga extension to run sagas for the moduleD??????
    sagas: [signalStrengthSaga]
  };
}
