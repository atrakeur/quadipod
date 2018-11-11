Provide communication as well as webserver capablity from an esp8266

## Installation

 - Install python from official website (Python 2.7 recommended!)
 - Install esptool to flash nodemcu `pip install esptool`
 - Erase old flash `esptool.py erase_flash`
 - Flash firmware `esptool.py write_flash 0x00000 ./nodemcu-master-8-modules-2017-05-06-19-50-14-integer.bin`
 - Startup nodemcu and let it auto create file system (can take up to 10 min)
 - Flash all files in src directory to ESP (using ESPlorer for example)
 - Enjoy

## Usage

This project aims to provide a simple web server functionnality to the ESP, along with a full Serial to Websocket bridge.

That way, your ESP can integrate a full JS application, and let you use realtime websockets to communicate with any other arduino over Serial.


