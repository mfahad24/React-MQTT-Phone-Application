import React, { Component } from "react";
import { connect } from "react-redux";
import OffImage from "../../images/Off.png";
import ZeroImage from "../../images/0.png";
import OneImage from "../../images/1.png";
import TwoImage from "../../images/2.png";
import ThreeImage from "../../images/3.png";
import FourImage from "../../images/4.png";
import FiveImage from "../../images/5.png";
import PhoneImage from "../../images/phone3.png";
import "../PhoneComponent/Phone.css";
import { changeStrengthValue } from "./actions.js";
import PropTypes from "prop-types";

class SignalStrength extends Component {
  selectSignalStrengthImage() {
    const allImages = [
      ZeroImage,
      OneImage,
      TwoImage,
      ThreeImage,
      FourImage,
      FiveImage
    ];
    if (
      this.props.mqttClientBoolean === false ||
      this.props.connectedValue === 0 ||
      this.props.mqttClientBoolean === undefined
    ) {
      return <img className="offimage" src={OffImage} alt="off"></img>;
    } else {
      return (
        <img
          className="strengthimage"
          src={allImages[this.props.signalStrength]}
          alt="strength"
        ></img>
      );
    }
  }

  render() {
    console.log("STRENGTHVALUE", this.props.signalStrength);
    return (
      <div className="signalstrengthdiv">
        <div className="phonecontainer">
          <img
            className="phone animated animatedFadeInUp fadeInUp"
            src={PhoneImage}
            alt="phone"
          />
          {this.selectSignalStrengthImage()}
        </div>
      </div>
    );
  }
}

SignalStrength.propTypes = {
  signalStrength: PropTypes.number
};

const mapStateToProps = state => {
  return {
    connectedValue: state.connectedValue.connectVal,
    signalStrength: state.signalStrength.signalStrength,
    mqttClientBoolean: state.mqttClientBoolean.clientBoolean
  };
};

export default connect(
  mapStateToProps,
  {
    changeStrengthValue
  }
)(SignalStrength);
