import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeConnectedValue,
  changeMqttBoolean,
  turnOffSignalStrength
} from "./actions.js";
import "./Phone.css";

class Phone extends Component {
  componentDidUpdate() {
    console.log("FINAL CONNECTED:", this.props.connectedValue);
  }
  // turnPhoneOn = props => {
  //   props.changeConnectedValue(1);
  // };

  turnPhoneOff = props => {
    props.turnOffSignalStrength(0);
    props.changeMqttBoolean(false);

    let phone = document.querySelector(".phonecontainer");
    phone.classList.remove("vibrate");
    phone.style.filter = "grayscale(1)";
  };

  changeMqttBoolean = props => {
    props.changeMqttBoolean(true);
    props.changeConnectedValue(1);

    let phone = document.querySelector(".phonecontainer");
    phone.classList.add("vibrate");
    phone.style.filter = "none";
  };

  renderButton() {
    return (
      <div className="buttondiv">
        <button
          className="ui button blue huge"
          disabled={this.props.mqttClientBoolean === true}
          onClick={() => this.changeMqttBoolean(this.props)}
        >
          Connect to MQTT
        </button>
        <button
          className="ui button blue huge"
          disabled={
            this.props.connectedValue === 0 ||
            this.props.connectedValue === undefined
          }
          onClick={() => this.turnPhoneOff(this.props)}
        >
          Disconnect Signal
        </button>

        <br />
        <br />
      </div>
    );
  }

  render() {
    console.log("-------");
    console.log("MQTTVALUE", this.props.mqttClientBoolean);
    console.log("CONNECTEDVALUE", this.props.connectedValue);
    return <div className="buttondiv">{this.renderButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    connectedValue: state.connectedValue.connectVal,
    signalStrength: state.signalStrength.signalStrength,
    mqttClientBoolean: state.mqttClientBoolean.clientBoolean
  };
};

export default connect(
  //SO WHY DO I NEED TO STILL USE 'mapStateToProps' ABOVE??????
  //ANSWER: DONT NEED TO RETURN ANYTHING, I AM USING TO CONSOLE.LOG LINE #36 SO NEED STATE TO BE MAPPED TO PROPS... however it needs to return at least an empty object... try removing everythign in mapstate to props method above
  //UPDATED ANSWER: if we want to use conditional statements or even console.log's, its necessary to map the state to props
  mapStateToProps,
  {
    changeConnectedValue,
    changeMqttBoolean,
    turnOffSignalStrength
  }
)(Phone);
