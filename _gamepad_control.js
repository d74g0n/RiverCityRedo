function process_gamepad_inputs() {

    let player = dudes[0];


    joystick_state.forEach(function (val, index) {

//                console.log(`val:${val}index${index}`);

        if (val) {

            switch (index) {


                case 0:
                    jump(player);
                    break;
                case 1:
                    // code block
                    break;
                case 2:
                    // code block
                    break;
                case 3:
                    // code block
                    break;
                case 4:
                    // code block
                    break;
                case 5:
                    // code block
                    break;
                case 6:
                    // code block
                    break;
                case 7:
                    // code block
                    break;
                case 8:
                    // code block
                    break;
                case 9:
                    // code block
                    break;
                case 10:
                    // code block
                    break;
                case 11:
                    // code block
                    break;
                default:
                    console.log(`joystick_state Default Case Hit - ERROR?`);
            }



        }


    });

    //    console.log(axis_state);

    axis_state.forEach(function (val, index) {

        //        console.log(`axis:${index}value:${val}`);
        if (val > 1 || val < -1) {

            switch (index) {


                case 0:
                    // leftAnalog-horizontal
                    moveHorizontal(player, val);
                    break;
                case 1:
                    // code block
//                    jump(player);
                    break;
                case 2:
                    // code block
                    break;
                case 3:
                    // code block
                    break;

                default:
                    // code block
            }
        }

    });

}


function moveHorizontal(player, val) {
    if (val < 0) {
        player.isLeft = true;
    } else {
        player.isLeft = false;
    }
//    player.vx += val / 100;
    player.vx = val/20;
}

function jump(player) {
    if (!player.isJumping) {
        player.vy = -5;
        player.isJumping = true;
    }
}
