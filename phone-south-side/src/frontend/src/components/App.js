import React, { lazy, Suspense } from "react";

import Phone from "./PhoneComponent/Phone.js";
import { DynamicModuleLoader } from "redux-dynamic-modules";
// import { ModuleExample } from "./DynamicModule.js";
//allows us to load/unload modules dynamically
import { createStore } from "redux-dynamic-modules";
import { Provider } from "react-redux";
// import { configureStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import "./App.css";
import { signalStrengthModule } from "./SignalStrengthComponent/module.js";
const SignalStrength = lazy(() =>
  import("./SignalStrengthComponent/SignalStrength")
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };

    this.store = createStore({
      extensions: [getSagaExtension()]
    });
  }

  render() {
    console.log("CHECK STATUS", this.state.checked);
    return (
      <Provider store={this.store}>
        <div>
          <div className="headertoggle">
            <div className="slide">
              show device <i className="angle double right icon"></i>
            </div>
            <div className="ui toggle checkbox">
              <input
                onChange={e => this.setState({ checked: e.target.checked })}
                type="checkbox"
                name="public"
                checked={this.state.checked}
              />
              <label></label>
            </div>
          </div>
          <Phone />
          {this.state.checked ? (
            <Suspense fallback={<div></div>}>
              <DynamicModuleLoader modules={[signalStrengthModule()]}>
                <SignalStrength />
              </DynamicModuleLoader>
            </Suspense>
          ) : (
            <div>Toggle Status</div>
          )}
        </div>
      </Provider>
    );
  }
}

// const App = () => {
//   return (
//     <div>
//       <div className="headertoggle">
//         <div className="slide">
//           toggle here<i className="angle double right icon"></i>
//         </div>
//         <div className="ui toggle checkbox">
//           <input type="checkbox" name="public" />
//           <label></label>
//         </div>
//       </div>
//       <Phone />
//       <Suspense
//         fallback={
//           <div>
//             <h1 className="ui header blue loading">Loading your phone....</h1>
//           </div>
//         }
//       >
//         <SignalStrength />
//       </Suspense>
//     </div>
//   );
// };

export default App;
