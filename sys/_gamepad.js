// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

const isDebugging = false;

let joystick_state = [];

//lhorz,lvert,rhorz,rvert::
let axis_state = [];


// Disconnecting::
window.addEventListener("gamepaddisconnected", function (e) {
    console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
});

var haveEvents = 'ongamepadconnected' in window;
var controllers = {};

function connecthandler(e) {
    addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    delete controllers[gamepad.index];
}

function updateStatus() {
    if (!haveEvents) {
        scangamepads();
    }

    var i = 0;
    var j;

    for (j in controllers) {
        var controller = controllers[j];

        //persistence of data:
        let dv = {}


        for (i = 0; i < controller.buttons.length; i++) {

            let val = controller.buttons[i];
            let pressed = val == 1.0;
            if (typeof (val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }

            let pct = Math.round(val * 100) + "%";

            if (val > 0) {
                // keydown essentially

                if (isDebugging) {
                    console.log(`pressed:${i}`);
                    dbo.innerHTML= `pressed:${i}`
                }
                joystick_state[i] = true;

            } else {
                // keyup essentially;
                joystick_state[i] = false;
            }

        }

        for (i = 0; i < controller.axes.length; i++) {
            // accessing the AXIS DATA:
            // percentage style: (controller.axes[i].toFixed(4) * 100).toFixed(1)
            
            
            axis_state[i] = (controller.axes[i].toFixed(4) * 100).toFixed(1);
            
            if (axis_state[i] < 9 && axis_state[i] > -9){
                axis_state[i]= 0;
            }
            
            
            if (isDebugging) {

                if ((controller.axes[i].toFixed(4) * 100).toFixed(1) > 10 || (controller.axes[i].toFixed(4) * 100).toFixed(1) < -10) {
//                    dbo.innerHTML=`Axis:${i} Value:${(controller.axes[i].toFixed(4) * 100).toFixed(1)}`;
//                    console.log(`Axis:${i} Value:${(controller.axes[i].toFixed(4) * 100).toFixed(1)}`);
//                    clog(`Axis:${i} Value:${(controller.axes[i].toFixed(4) * 100).toFixed(1)}`);
                    
                    
                }

            }
        }



    }

    // console.log(joystick_state);
    requestAnimationFrame(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (gamepads[i].index in controllers) {
                controllers[gamepads[i].index] = gamepads[i];
            } else {
                addgamepad(gamepads[i]);
            }
        }
    }
}


window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
    setInterval(scangamepads, 500);
}

clog('_gamepad.js');