const SIGNAL_STRENGTH_INTERVAL = 3000;
const SIGNAL_STRENGTH_TOPIC = "hmi/phone/signalStrength";
const PHONE_OFF_TOPIC = "hmi/phone/connected";

const SignalStrength = require("./signalStrength");

class Phone {
  constructor() {
    this.mqttClient = require("./mqttClient");
    this.signalStrength = new SignalStrength();
    this.currentSignalStrength = -1;
    this.isConnected = false;
  }

  async start() {
    try {
      await this.mqttClient.start("127.0.0.1:7000");
      console.log("connection established");

      this.mqttClient.subscribe(PHONE_OFF_TOPIC, (topic, data) => {
        console.log(
          "received phone connected state for",
          topic,
          ": " + data.payload
        );

        switch (data.payload) {
          case 0: // off
            this._disconnect();
            break;
          case 1: // on
            this._connect();
            break;
          default:
            // error
            console.log("Error: received invalid phone connected state");
        }
      });

      this._connect();
    } catch (error) {
      console.log("Error: mqtt error: ", error);
    }
  }

  _connect() {
    if (!this.isConnected) {
      this.mqttClient.sendData(
        SIGNAL_STRENGTH_TOPIC,
        this.currentSignalStrength
      );
      this.signalStrength.start(SIGNAL_STRENGTH_INTERVAL, strength => {
        console.log("sending signal strength: " + strength);
        this.currentSignalStrength = strength;
        this.mqttClient.sendData(SIGNAL_STRENGTH_TOPIC, strength);
      });
      this.isConnected = true;
      console.log("phone connected");
    }
  }

  _disconnect() {
    if (this.isConnected) {
      this.signalStrength.stop();
      this.mqttClient.sendData(SIGNAL_STRENGTH_TOPIC, -1);
      this.isConnected = false;
      console.log("phone disconnected");
    }
  }
}

module.exports = new Phone();
