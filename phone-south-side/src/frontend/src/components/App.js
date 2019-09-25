import React, { lazy, Suspense } from "react";
import Phone from "./Phone.js";
import "./App.css";
const SignalStrength = lazy(() => import("./SignalStrength"));

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="headertoggle">
          <div className="slide">
            toggle here<i className="angle double right icon"></i>
          </div>
          <div className="ui toggle checkbox">
            <input type="checkbox" name="public" />
            <label></label>
          </div>
        </div>
        <Phone />
        <Suspense
          fallback={
            <div>
              <h1 className="ui header blue loading">Loading your phone....</h1>
            </div>
          }
        >
          <SignalStrength />
        </Suspense>
      </div>
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
