const mqttSender = require("./mqttSender");

(async () => {
  try {
    await mqttSender.start("127.0.0.1:7000");
    console.log("connection established");
  } catch {
    console.log("connection not possible -> make sure to start MQTT Broker");
  }
})();
