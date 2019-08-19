# Ford Bootcamp

## About

This demo project was created for the participants of the Cyclone Bootcamp (https://infohub.automotive.elektrobit.com/display/PRJFS4/Bootcamp), to better understand the Ford Cyclone architecture and how data is exchanged with the south side.

It countains a simple _phone-south-side_ - a simple node app - that repeatedly generates MQTT messages with a random phone signal strength and publishes it to the topic _hmi/phone/signalStrength_.

In the project, we also included a preconfigured mosquitto broker that will distribute these messages to any subscribers.

## Usage

1. start mosquitto -> execute _start.bat_ in mosquitto folder
2. start phone simulation -> execute _npm start_ in phone-south-side folder after installing all dependencies with _npm install_
