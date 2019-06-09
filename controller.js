let debugging = false;
let verbosity = false;

const clog = function (msg) {
    if (verbosity) {
        return console.log(msg);
    }
}

let control_state = {
    W: false,
    A: false,
    S: false,
    D: false,
    SPACE: false,
    E: false,
    Q: false,
    Z: false,
    X: false,
    C: false,
    SHIFT: false,
    ALT: false,
    CTRL: false,
    META: false,
};

let keyup = function (event) {
    // movement::
    if (event.keyCode == 65) {
        control_state.A = false;
    }
    if (event.keyCode == 83) {
        control_state.S = false;
    }
    if (event.keyCode == 87) {
        control_state.W = false;
    }
    if (event.keyCode == 68) {
        control_state.D = false;
    }
    if (event.keyCode == 32) {
        control_state.SPACE = false;
    }
    if (event.keyCode == 81) {
        control_state.Q = false;
    }
    if (event.keyCode == 69) {
        control_state.E = false;
    }
    if (event.keyCode == 90) {
        control_state.Z = false;
    }
    if (event.keyCode == 88) {
        control_state.X = false;
    }
    if (event.keyCode == 67) {
        control_state.C = false;
    }
    control_state.SHIFT = event.shiftKey;
    control_state.ALT = event.altKey;
    control_state.CTRL = event.ctrlKey;
    control_state.META = event.metaKey;

    global.keystate = control_state;
    
    console.log(event.keyCode);
}

let keydown = function (event) {
    // movement::
    if (event.keyCode == 65) {
        control_state.A = true;
    }
    if (event.keyCode == 83) {
        control_state.S = true;
    }
    if (event.keyCode == 87) {
        control_state.W = true;
    }
    if (event.keyCode == 68) {
        control_state.D = true;
    }
    if (event.keyCode == 32) {
        control_state.SPACE = true;
    }
    if (event.keyCode == 81) {
        control_state.Q = true;
    }
    if (event.keyCode == 69) {
        control_state.E = true;
    }
    if (event.keyCode == 90) {
        control_state.Z = true;
    }
    if (event.keyCode == 88) {
        control_state.X = true;
    }
    if (event.keyCode == 67) {
        control_state.C = true;
    }
    control_state.SHIFT = event.shiftKey;
    control_state.ALT = event.altKey;
    control_state.CTRL = event.ctrlKey;
    control_state.META = event.metaKey;
    
    global.keystate = control_state;
}



class web_controller {
    constructor(char) {
  
        this.char = char;
        document.addEventListener('keyup', keyup);
        document.addEventListener('keydown', keydown);

    }

}
