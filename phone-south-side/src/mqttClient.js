let mqtt = require("async-mqtt");

const CONNECT_TIMEOUT = 5000;

class MqttClient {
  constructor() {
    this.client = null;
  }

  async start(broker) {
    this.client = await this._connectToBroker(broker);
  }

  isConnected() {
    return this.client !== null ? this.client.connected : false;
  }

  /**
   * sends data to specified topic.
   *
   * @note retain flag is set, so data is retained in Broker
   */
  sendData(topic, data) {
    if (this.isConnected()) {
      this.client.publish(topic, JSON.stringify({ payload: data }), {
        retain: true
      });
    }
  }

  async subscribe(topic, callback) {
    if (this.isConnected()) {
      await this.client.subscribe(topic);

      this.client.on("message", (topic, message) => {
        callback(topic, JSON.parse(message));
      });
    }
  }

  _connectToBroker(broker) {
    return new Promise((resolve, reject) => {
      let connectionString = `ws://${broker}`;
      let client = mqtt.connect(connectionString);

      setTimeout(() => {
        if (!this.isConnected()) {
          reject("connection timeout");
          client.end(true);
        }
      }, CONNECT_TIMEOUT);

      client.on("connect", () => {
        resolve(client);
      });
    });
  }
}

module.exports = new MqttClient();
