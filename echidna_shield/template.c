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
