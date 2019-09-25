import { reducers } from "./reducers";
import { actions } from "./actions";
import { saga } from "./sagas/saga";

export function allComponents() {
  return {
    //unique id of module
    id: "all-components",
    //maps Store key to the reducer
    reducerMap: {
      reducers
    },
    //optional: any action sto dispatch when module is loaded
    initialActions: [actions()],
    //optional: any actions to dispatch when the module is unloaded,
    finalactions: [],
    //this property will be used by the saga extension to run sagas for the moduleD??????
    sagas: [saga]
  };
}
