<p align="center">
  <a href="#readme">
    <img src="https://raw.githubusercontent.com/enteropositivo/eBlock/master/img/eBlock.png" alt="eBlock logo" width="72" height="72">
  </a>
</p>

<h3 align="center">eBlock - Devices</h3>

<p align="center">
Here are some devices you can use with eBlock but you can create your own device 
  <br>
  <a href="https://github.com/enteropositivo/eBlock"><strong>Go to eBlock Application Repository</strong></a>
  <br>
  <br>
  <a href="#information">Information</a>
   ·
  <a href="#make-a-custom-device">Make a custom device</a>
  · 
  <a href="#contribute">Contribute</a>
</p>

# Information
You can use any kind of device with eBlock, and customize the list of devices you want to appear under **"devices menu"**.

Each device can be configured to have these features:
 - Which blocks to show
 - The Driver user must install to use it
 - One ore more different firmwares (could be to use with online mode, or custom firmwares like factory reset)
 - Basic help for users 
 - Custom code template to render scratch blocks to c/c++
 - Define digital and analog pins 



# Instalation
Clone or download this repository and extract the context under  **eBlock/resources/devices/**

You can remove those devices you don't want to show under devices menu  but no **_base_** because is the basic device from with other devices override functions and blocks.


# Make a custom device

## Basic configuration needed

Each device resides under **eBlock/resources/devices/** folder,  and must have a file called **device.json**

_device.json_
```json

{
 "label": "Makeblock - mBot Basic [mCore]", 
 "version" : "1.0"  ,
 "fqbn": "arduino:avr:uno",
 "hex":["mbot_reset_default_program.hex", "mbot_firmware.hex" ],
 "driver": {"windows":"driver_ch340_arduino.exe", "mac":"", "linux":""},
 
 "digital_pins":[0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
 "analog_pins": ["A0","A1", "A2", "A3", "A4", "A5"]
}


```


- **label:** Is a readable name for this device 
- **version:** You can set a version number 
- **fqbn:**  Fully Qualified Board Name to tell [arduino-cli](https://github.com/arduino/arduino-cli/#readme) how to compile  (ex.: esp8266:esp8266:nodemcuv2 )
- **hex:** Provide users an array of firmwares avaliable to flash 
- **driver:** The exeutable driver installer name.  Driver must reside under **eBlock/resources/drivers/** 
- **digital_pins:** Pins that will use some blocks for digital in/out functions
- **digital_pins:** Pins that will use some blocks for analog input functions


## Advanced configuration (optional)

You can customize much more your device with the following files inside the device folder


###  blocks.json + blocks.js

Define custom blocks you want to appear once users select your device.  Like extension system in mBlock but only blocks for this device.


### template.c

This is the c/c++ code template where eBlock will render sratch code.  But you can place some specific functions and includes that will need your device to compile and upload source code.

```c
#include "eblock.h"
//include

//define
//serialParser
void setup(){
  Serial.begin(9600);
  //setup
}

void loop(){
//serialParserCall
//loop
   _loop();
}

void _loop(){
//_loop
}

//function

void echidna_led(uint8_t pin, uint8_t state ){
    if(pin==0){ //ALL pins
        e_pin_set(11,state);
        e_pin_set(12,state);
        e_pin_set(13,state);
     }else{
        e_pin_set(pin,state);
    };
}

void register_callback( uint8_t event,   void (*in_main_func)()  ){
}

void _delay(float seconds){
long endTime = millis() + seconds * 1000;
while(millis() < endTime)_loop();
}

```


### README.md

You can provide a basic about how to use your device or the device pinouts.  If your device has a **README.md** file , eblock will show an icon next to the device selected 




# Contribute

Contact me if you want to add your own device to this repository
