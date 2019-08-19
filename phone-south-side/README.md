# Phone South Side

## About

Very basic phone south side simulation, which repeatedly publishes a random phone signal strength between 0 and 5 to the _hmi/phone/signalStrength_ topic via MQTT.

It is also subscribed to the _hmi/phone/connected_ topic. If it receives a 0 via this topic, the signal strength generation is stopped until it again receives a 1 via this topic. When the generation is stopped, it also publishes -1 via _hmi/phone/signalStrength_.

## Usage

1. npm install
2. npm start

Note: requires a MQTT broker to run in WS mode on port 7000 on same machine
