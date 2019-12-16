#include "mbit.h"
//include

//define
//serialParser
void setup(){
Serial.begin(9600);
mbit_start();
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

void register_callback( uint8_t event,   void (*in_main_func)()  ){
     mbit_on( event, in_main_func );
}

void _delay(float seconds){
long endTime = millis() + seconds * 1000;
while(millis() < endTime)_loop();
}
