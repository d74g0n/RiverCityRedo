// used by RIVERCITYREDO to load images.

/*
TODO:
Gotta make a sprite organizer.
*/

let imageslist = {
    scene: {
        background: undefined,
        foreground: undefined,
    },
    entities: {
        player: undefined,
    }
};

// imageslist.entities.player


let GymScene = {
    isDay: true,
    
    daysetsrc: '/sprites/RiverCityGymv2.png',
    dayskysrc: '/sprites/SkyStrip1.png',
    nightsetsrc: '/sprites/RiverCityGymv2night.png',
    nightskysrc: '/sprites/SkyStrip2.png',
    
    loadGym: function () {
        let gymimage = new Image;
        let setlink = undefined;
        if (GymScene.isDay) {
            setlink = GymScene.daysetsrc;
        } else {
            setlink = GymScene.nightsetsrc;
        }
        gymimage.src = setlink;
        gymimage.onload = function () {
//            GymScene.gymlayer = gymimage; // del for rewire
            imageslist.scene.foreground = gymimage;
        };

    },
    loadSky: function () {
        let skystrip = new Image;
        let setlink = undefined;
        if (GymScene.isDay) {
            setlink = GymScene.dayskysrc;
        } else {
            setlink = GymScene.nightskysrc;
        }
        skystrip.src = setlink;
        skystrip.onload = function () {
//            GymScene.skylayer = skystrip; // del for rewire
             imageslist.scene.background = skystrip;
            
        };
    },
}

GymScene.loadGym();
GymScene.loadSky();

let playerimg = undefined;
function loadCharacter(path) {

    function setspritesheet() {
        //  global.ctx.drawImage(this, 0, 32, 32, 32, 0, 0, 128, 64);
//        ctx.drawImage(this, 0, 0, 32, 32);
        
        imageslist.entities.player = this;
        global.spritesheet = this;
    }

    const image = new Image(); // Using optional size for image
    image.onload = setspritesheet; // Draw when image has loaded
    image.src = path;
    playerimg = image;
    global.spritesheet = playerimg;
}

loadCharacter('/sprites/SpriteStrip.png');

clog('_loader.js');
