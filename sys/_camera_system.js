// Simple Camera Movement System.  Fixed = not moving. <centered> 

let dcam = {
    fixed: true,
    trippy: true,
    speed: 2,
    x: 34,
    y: 0,
    vx: 0,
    vy: 0,
    friction: 0.985,
    dbshowkeycode: false,
    inputs: function (e) {
        if (dcam.dbshowkeycode) {
                console.log(e.keyCode);
        }
        if (!dcam.fixed) {

            if (e.keyCode == 97) {
                //left a keycode
                dcam.mutates(-dcam.speed);
            }
            if (e.keyCode == 100) {
                //right d keycode
                dcam.mutates(dcam.speed);
            }

        }

        if (e.keyCode == 96) {
            // 1 key
            GymScene.isDay = !GymScene.isDay;
            GymScene.loadGym();
            GymScene.loadSky();
        }

        if (e.keyCode == 32) {
            dcam.fixed = !dcam.fixed;
            clog(`fixed_camera : ${dcam.fixed}`);
        }
        if (dcam.fixed) {
            dcam.vx = 0;
            dcam.x = 34;
        }

    },
    mutates: function (dx) {
        dcam.vx += dx;
        dcam.vx = dcam.vx * dcam.friction;
        dcam.x += dcam.vx;

        dcam.bounds();
        //         console.log(Math.floor(dcam.x));

    },
    bounds: function (q_scale = 1.1) {
        //bounds the bound conditions; left right in relation to buffer location- canvas location.
        //stop infinite decimals:
        if (dcam.vx < 0.9 && dcam.vx > -0.9) {
            dcam.vx = 0;
        }
        //stop leftside buffer shift:
        if (dcam.x < 0) {
            dcam.x = 0;
            dcam.vx = 0;
        }
        //stop rightside buffer shift:
        if (dcam.x > (buffer.width * q_scale) - buffer.width - 6) {
            dcam.x = (buffer.width * q_scale) - buffer.width - 6;
            dcam.vx = 0;
        }
    },
    init: function () {
        // HERE IS THE KEYPRESS EVENT LISTENER::
        document.onkeypress = dcam.inputs;
    },
}

clog('_camera_system.js');