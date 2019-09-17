import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeConnectedValue,
  changeStrengthValue,
  changeMqttBoolean
} from "../actions";
import "./Phone.css";

class Phone extends Component {
  turnPhoneOn = props => {
    props.changeConnectedValue(10);
    // setInterval(function() {
    //   props.changeStrengthValue(Math.round(Math.random() * 5));
    // }, 1500);
    // props.changeStrengthValue(null);
    // console.log("CONNECTED?", this.props.connectedValue);
    // console.log("STRENGTH?", this.props.signalStrength);
  };

  turnPhoneOff = props => {
    props.changeConnectedValue(0);
    props.changeStrengthValue(null);
    // clearInterval(props);
  };

  // changeStrength = props => {
  //   setInterval(function() {
  //     props.changeStrengthValue(Math.round(Math.random() * 5));
  //   }, 1500);
  // };

  changeMqttBoolean = props => {
    props.changeMqttBoolean(true);
  };

  renderButton() {
    return (
      <div className="buttondiv">
        <button
          className="ui button blue"
          disabled={this.props.mqttClientBoolean === true}
          onClick={() => this.changeMqttBoolean(this.props)}
        >
          Connect HMI to MQTT
        </button>

        <button
          className="ui button blue"
          disabled={
            this.props.mqttClientBoolean === false ||
            this.props.connectedValue === 1
          }
          onClick={() => this.turnPhoneOn(this.props)}
        >
          Conect Phone
        </button>

        <button
          className="ui button blue"
          disabled={this.props.connectedValue === 0}
          onClick={() => this.turnPhoneOff(this.props)}
        >
          Disconnect Phone
        </button>

        <br />
        <br />
      </div>
    );
  }

  render() {
    console.log("MQTTVALUE", this.props.mqttClientBoolean);
    console.log("CONNECTEDVALUE", this.props.connectedValue);
    // console.log("STRENGTHVALUE", this.props.signalStrength);
    return <div className="buttondiv">{this.renderButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    connectedValue: state.connectedValue,
    signalStrength: state.signalStrength,
    mqttClientBoolean: state.mqttClientBoolean
  };
};

export default connect(
  //SO WHY DO I NEED TO STILL USE 'mapStateToProps' ABOVE??????
  //ANSWER: DONT NEED TO RETURN ANYTHING, I AM USING TO CONSOLE.LOG LINE #36 SO NEED STATE TO BE MAPPED TO PROPS... however it needs to return at least an empty object... try removing everythign in mapstate to props method above
  mapStateToProps,
  {
    changeConnectedValue,
    changeStrengthValue,
    changeMqttBoolean
  }
)(Phone);
