# Phone South Side

## About

Very basic phone south side simulation, which repeatedly publishes a random phone signal strength between 0 and 5 to the hmi/phone/signalStrength topic via MQTT.

It is also subscribed to the hmi/phone/connected topic. If it receives a 0 via this topic, the signal strength generation is stopped until it again receives a 1 via this topic.

## Usage

1. npm install
2. npm start

Note: requires a MQTT broker to run in WS mode on port 7000 on same machine
