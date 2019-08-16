# Ford Bootcamp

## About

This demo project was created for the participants of the Cyclone Bootcamp, to better understand the Ford Cyclone architecture and how data is exchanged with the south side.

It countains a simple _phone-south-side_ - a simple node app - that repeatedly generates MQTT messages with a random photo signal strength and publishes it to the topic _hmi/phone/signalStrength_.

In the project, we also included a preconfigured mosquitto broker that will distribute these messages to any subscribers.

TODO -> document the rest
