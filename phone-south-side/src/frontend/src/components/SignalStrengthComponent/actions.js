import { CHANGE_SIGNAL_STRENGTH } from "../../constants";

export const changeStrengthValue = strengthVal => {
  return {
    type: CHANGE_SIGNAL_STRENGTH,
    payload: strengthVal
  };
};
