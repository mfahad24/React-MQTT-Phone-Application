import React, { lazy, Suspense } from "react";

import Phone from "./PhoneComponent/Phone.js";
import { DynamicModuleLoader } from "redux-dynamic-modules";
//allows us to load/unload modules dynamically
import { createStore } from "redux-dynamic-modules";
import { Provider } from "react-redux";
// import { configureStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import "./App.css";
import { signalStrengthModule } from "./SignalStrengthComponent/module.js";
import { phoneModule } from "./PhoneComponent/module.js";
const SignalStrength = lazy(() =>
  import("./SignalStrengthComponent/SignalStrength")
);
// import SignalStrength from "./SignalStrengthComponent/SignalStrength.js";

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

  showDeviceText() {
    if (this.state.checked === false) {
      return (
        <div className="slide">
          show device <i className="angle double right icon"></i>
        </div>
      );
    } else {
      return (
        <div className="hide-phone">
          hide device <i className="angle double right icon"></i>
        </div>
      );
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <div className="headertoggle">
            {/* <div className="signature">Signal Strength Display</div> */}
            {/* <div className="slide">
              show device <i className="angle double right icon"></i>
            </div> */}
            {this.showDeviceText()}
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

          {this.state.checked ? (
            <DynamicModuleLoader
              modules={[signalStrengthModule(), phoneModule()]}
            >
              <Phone />
              <Suspense fallback={<div></div>}>
                <SignalStrength />
              </Suspense>
            </DynamicModuleLoader>
          ) : (
            <div>
              {/* <div className="ui large active centered inline loader"></div> */}
              <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
              </div>
            </div>
          )}
        </div>
      </Provider>
    );
  }
}

//App setup with functional component
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
