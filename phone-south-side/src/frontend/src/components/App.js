import React, { lazy, Suspense } from "react";
import Phone from "./Phone.js";
// import SignalStrength from "./SignalStrength";
const SignalStrength = lazy(() => import("./SignalStrength"));

const App = () => {
  return (
    <div>
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
};

export default App;
