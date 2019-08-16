let mqtt = require("async-mqtt");

const CONNECT_TIMEOUT = 5000;

class MqttSender {
  constructor() {
    this.client = null;
  }

  async start(broker) {
    this.client = await this._connectToBroker(broker);
  }

  isConnected() {
    return this.client !== null ? this.client.connected : false;
  }

  _connectToBroker(broker) {
    return new Promise((resolve, reject) => {
      let connectionString = `ws://${broker}`;
      let client = mqtt.connect(connectionString);

      setTimeout(() => {
        if (!this.isConnected()) {
          reject();
        }
      }, CONNECT_TIMEOUT);

      client.on("connect", () => {
        resolve(client);
      });
    });
  }
}

module.exports = new MqttSender();
