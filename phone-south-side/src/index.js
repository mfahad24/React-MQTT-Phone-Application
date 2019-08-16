const SIGNAL_STRENGTH_INTERVAL = 3000;
const SIGNAL_STRENGTH_TOPIC = "hmi/phone/signalStrength";

// main IIFE
(async () => {
  const mqttSender = require("./mqttSender");
  const SignalStrength = require("./signalStrength");

  try {
    await mqttSender.start("127.0.0.1:7000");
    console.log("connection established");

    const signalStrength = new SignalStrength();

    signalStrength.start(SIGNAL_STRENGTH_INTERVAL, strength => {
      console.log("sending signal strength: " + strength);
      mqttSender.sendData(SIGNAL_STRENGTH_TOPIC, strength);
    });
  } catch {
    console.log("connection not possible -> make sure to start MQTT Broker");
  }
})();
