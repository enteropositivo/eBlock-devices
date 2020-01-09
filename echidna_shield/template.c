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
	echidna_buttons_events();
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

void echidna_buttons_events(){
   if( e_is_button_down(2) ) e_event_call(1);
   if( e_is_button_up(2) )   e_event_call(2);
   if( e_is_button_down(3) ) e_event_call(3);
   if( e_is_button_up(3) )   e_event_call(4);
}

void register_callback( uint8_t event,   void (*in_main_func)()  ){
	e_event( event, in_main_func);
}

void _delay(float seconds){
long endTime = millis() + seconds * 1000;
while(millis() < endTime)_loop();
}
