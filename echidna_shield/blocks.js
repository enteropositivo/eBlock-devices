// mBot.js

(function(ext) {
    var device = null;
    

    var leds = {"Red":13, "Orange":12, "Green":11, "All":0};	
    var onoff = {"On":1, "Off":0, "Toggle":2};
       
	var tones ={"B0":31,"C1":33,"D1":37,"E1":41,"F1":44,"G1":49,"A1":55,"B1":62,
			"C2":65,"D2":73,"E2":82,"F2":87,"G2":98,"A2":110,"B2":123,
			"C3":131,"D3":147,"E3":165,"F3":175,"G3":196,"A3":220,"B3":247,
			"C4":262,"D4":294,"E4":330,"F4":349,"G4":392,"A4":440,"B4":494,
			"C5":523,"D5":587,"E5":659,"F5":698,"G5":784,"A5":880,"B5":988,
			"C6":1047,"D6":1175,"E6":1319,"F6":1397,"G6":1568,"A6":1760,"B6":1976,
			"C7":2093,"D7":2349,"E7":2637,"F7":2794,"G7":3136,"A7":3520,"B7":3951,
	"C8":4186,"D8":4699};
	var beats = {"Half":500,"Quarter":250,"Eighth":125,"Whole":1000,"Double":2000,"Zero":0};
	
	var startTimer = 0;
	
    ext.resetAll = function(){
    	device.reset();
    };
	ext.runArduino = function(){
		responseValue();
	};
		
	ext.setLed = function(led, state){
		
		if(leds[led]==0){ //- All leds
			device.pin_set(11, onoff[state]);	
			device.pin_set(12, onoff[state]);
			device.pin_set(13, onoff[state]);
			return;
		}

		if(onoff[state]==1){
			device.pin_on(leds[led]);  //pin_on
		}else if(onoff[state]==0){
			device.pin_off(leds[led]); //pin_off
		}else{
			device.pin_toggle(leds[led]); //pin_toggle
		}

	};

	ext.setRGB = function(R,G,B){
		
		device.pwm(9, R);
		device.pwm(5, G);
		device.pwm(6, B);

	};

	ext.getJoystick = function(nextID, coord){
		
		if(coord=="x"){
			ret = device.get_analog_perc(0);
		}else{
			ret = device.get_analog_perc(1);
		}	
		
		responseValue(ret-48);
	};

	ext.getAcceleration = function(nextID, coord){
		
		if(coord=="x"){
			ret = device.get_analog_perc(2+0); //A2
		}else{
			ret = device.get_analog_perc(2+1); //A3
		}	

		responseValue(ret-48);

	};

	ext.getLight = function(nextID){
		
		responseValue( device.get_analog_perc(5)) ;
		
	};



	
	ext.runTone = function(tone, beat){
		if(typeof tone == "string"){
			tone = tones[tone];
		}
		if(typeof beat == "string"){
			beat = parseInt(beat) || beats[beat];
		}
		runPackage(34,short2array(tone), short2array(beat));
	};
	
	ext.stopTone = function(){
		runPackage(34,short2array(0));
	};

    ext.runServo = function(port,slot,angle) {
		if(typeof port=="string"){
			port = ports[port];
		}
		if(typeof slot=="string"){
			slot = slots[slot];
		}
		if(angle > 180){
			angle = 180;
		}
        runPackage(11,port,slot,angle);
    };
	

	ext.resetTimer = function(){
		startTimer = (new Date().getTime())/1000.0;
		responseValue();
	};
	

	
	
   

    // Extension API interactions
    var potentialDevices = [];
    ext._deviceConnected = function(dev) {
        potentialDevices.push(dev);
        if (!device) {
            tryNextDevice();
        }
    }

    function tryNextDevice() {
        // If potentialDevices is empty, device will be undefined.
        // That will get us back here next time a device is connected.
        device = potentialDevices.shift();
        if (device) {
            device.open({ stopBits: 0, bitRate: 115200, ctsFlowControl: 0 }, deviceOpened);
        }
    }

    var watchdog = null;
    function deviceOpened(dev) {
        if (!dev) {
            // Opening the port failed.
            tryNextDevice();
            return;
        }
        device.set_receive_handler('echidna_shield',processDataMProtocol);

        /**/
       // device.btn_call_back()

    };

    ext._deviceRemoved = function(dev) {
        if(device != dev) return;
        device = null;
    };

    ext._shutdown = function() {
        if(device) device.close();
        device = null;
    };

    ext._getStatus = function() {
        if(!device) return {status: 1, msg: 'echidna_shield'};
        if(watchdog) return {status: 1, msg: 'Probing for echidna_shield'};
        return {status: 2, msg: 'echidna_shield connected'};
    }
    var descriptor = {};
	ScratchExtensions.register('echidna_shield', descriptor, ext, {type: 'serial'});
})({});
