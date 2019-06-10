
function draw_rawPrisoner_Spritesheet_debug() {
    let yadjust = 190;
    btx.drawImage(global.spritesheet, 0, 0, global.spritesheet.width, global.spritesheet.height, -dcam.vx, 0 + yadjust, global.spritesheet.width * 2, global.spritesheet.height * 2);
}

/*

MAKE STRIP READER!
    Parse PNG into squares by height (64etc)
    
    
    
    
    */