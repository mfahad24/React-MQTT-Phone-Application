import { SignalStrength } from "./SignalStrength";
import { signalStrengthModule } from "./module.js";
import { DynamicModuleLoader } from "redux-dynamic-modules";
//why using this below with blue character (forgot name)???
import * as React from "react";

export default function DynamicSignalStrength() {
  return (
    <DynamicModuleLoader modules={[signalStrengthModule()]}>
      <SignalStrength />
    </DynamicModuleLoader>
  );
}
