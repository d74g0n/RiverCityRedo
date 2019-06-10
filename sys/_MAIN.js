let dudes = [];

function createPlayer() {
    dudes.push(new Prisoner(buffer, buffer.width / 2, buffer.height / 2, 'bob'));
    //    global.controller = new web_controller(dudes[0]);
}

function drawEntities() {
    dudes.forEach(function (baddude) {
        baddude.tick();
    });
}

function increment_global_frame() {
    global.framecount++;
    if (global.framecount > 60) {
        global.framecount = 1;
    }
}

function main_loop() {
    // geartick:
    increment_global_frame();
    // mutations:
    dcam.mutates(0);
    process_gamepad_inputs();
    // draw:
    drawgym(); //- scene
    drawEntities(); //- players
    // render:
    render();
}

// startup::
dcam.init();
window.onload = initmain;

function initmain() {
    //setup stuff - push characters to renderer.
    createPlayer();
    // set as variable then make control to kill it.  TODO::
    setInterval(main_loop, 1000 / 60);
}

clog('_MAIN.js');
