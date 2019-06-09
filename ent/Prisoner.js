//TODO EDIT NOTES:
/*
- process control forces;

- remove self clear / background is clear.

- round off all numbers to reasonable decimals.

*/

class Prisoner {
    constructor(buffer, x = 0, y = 0, id = 'default', isLeft = true) {
        //screen coordinates to draw topleft corner.
        this.ctx = btx;

        this.x = x;
        this.y = y;
        // will probably have to add Z for jump height stuff.
        // shadow for x y tracking.  z for tracking jump physics vs ground walking.

        this.ground = this.y; // TODO
        // drawing requirement;
        this.isLeft = isLeft;
        this.isJumping = false;

        this.jumppwr = 10;

        this.friction = 0.9; // GLOBALIZE.

        this.applyfriction = function () {
            if (!this.isJumping) {
                this.vx = this.vx * this.friction;
                this.vy = this.vy * this.friction;
            }
        }

        this.move = function () {
            this.capvelocity();
            this.x += this.vx;
            this.y += this.vy;
            if (global.framecount % 10 == 0) {
                this.applyfriction();
                this.applygravity();
            }
        }

        // Velocity Settings:
        this.vx = 0;
        this.vy = 0;
        this.vcap = 15;
        this.vmin = 0.95;
        this.speed = 1;

        this.capvelocity = function () {
            if (this.vx > this.vcap) {
                this.vx = this.vcap;
            }
            if (this.vx < -this.vcap) {
                this.vx = -this.vcap;
            }
            if (this.vy > this.vcap) {
                // this.vy = this.vcap;
            }
            if (this.vy < -this.vcap) {
                this.vy = -this.vcap;
            }
            if (this.vx < this.vmin && this.vx > 0) {
                this.vx = 0;
            }
            if (this.vx > -this.vmin && this.vx < 0) {
                this.vx = 0;
            }
        }

        // gravity. - move to engine?  if no then independant hmmm seems neat.
        this.gravity = 2;
        this.gravitySpeed = 0;
        this.applygravity = function () {
            this.gravitySpeed += this.gravity;

            if (this.y < this.ground) {
                this.vy += this.gravitySpeed;
            }

            if (this.y >= this.ground) {
                this.vy = 0;
                this.isJumping = false;
                this.y = this.ground;
                this.gravitySpeed = 0;
            }
        }

        this.stayAboveGround = function () {
            if (this.y >= this.ground) {
                this.vy = 0;
                this.isJumping = false;
                this.y = this.ground;
                this.gravitySpeed = 0;
            }
        }

        //unused dudes name:
        this.id = id;
        this.noisescale = 2;
        this.noisevol = 10;
        this.noiselast = 0;
        this.isNoisy = true;
        this.noiseinterval = 20;

        this.noise = function () {
//            console.log(global.framecount);
            if (this.isNoisy) {

                if (global.framecount % this.noiseinterval == 0) {
                    this.noiselast = Math.random(this.noisevol).toFixed(4) * this.noisescale;
                }

                return this.noiselast;
            } else {
                return 0;
            }
        }

        //refactor::
//        this.headadjustx = -8;
        this.headadjustx = -2;
        this.headadjusty = 0;

        this.adjust = {
            head: {
                x: -2,
                y: 0,
            },
            hand: {
                left: {
                    x: 0,
                    y: 0,
                },
                right: {
                    x: 0,
                    y: 0,
                }
            },
            shirt: {
                x: 0,
                y: 0,
            },
            legs: {
                x: 0,
                y: 0,
            }

        };


        this.frame = getRandomArbitrary(4, 6).toFixed(0);
        
        console.log(`Prisoner '${this.id} created with frame: ${this.frame}`);

        this.clearself = function () {
            // clears the area of character - mind other drawings.
            return btx.clearRect(0 + this.x, 0 + this.y, global.draw_scale, global.draw_scale);
        }

        this.setctx = function (ctx = btx) {
            this.ctx = btx;
        }

        this.draw_legs_walk = function (x, y) {

            if (this.vx == 0 && this.vy == 0) {
                //idle pose:
                this.ctx.drawImage(imageslist.entities.player, 5 * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, x, y, global.draw_scale, global.draw_scaleY);
                //front leG:
                this.ctx.drawImage(imageslist.entities.player, 5 * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, x - 1 * 0.9, y, global.draw_scale * 0.9, global.draw_scaleY);
            } else {
                //walking cycle:
                this.ctx.drawImage(imageslist.entities.player, this.frame * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, x, y, global.draw_scale, global.draw_scaleY);
            }
        }

        this.draw_shirt = function (x, y) {
            this.ctx.drawImage(imageslist.entities.player, 0 * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, 0 + x, 0 + y - this.noise() / 8, global.draw_scale, global.draw_scaleY);
        }

        this.draw_head = function (x, y) {
            this.ctx.drawImage(imageslist.entities.player, 1 * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, this.headadjustx + x + this.noise() / 4, this.headadjusty + y + this.noise() / 6, global.draw_scale, global.draw_scaleY);
        }

        this.draw_hands = function (x, y) {
            // 3 - l_hand
            this.ctx.drawImage(imageslist.entities.player, 2 * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, 0 + x, 0 + y + this.noise(), global.draw_scale, global.draw_scaleY);

            // 3 - r_hand
            this.ctx.drawImage(imageslist.entities.player, 3 * global.raw_scale, 0 * global.raw_scale, global.raw_scale, global.raw_scale, 0 + x, 0 + y - this.noise(), global.draw_scale, global.draw_scaleY);

        }

        this.draw_body = function (x, y) {
            btx.save();

            if (this.isLeft) {
                btx.translate(buffer.width, 0);
                btx.scale(-1, 1);
                var ix = buffer.width - (this.x) - global.draw_scale; // + rect.left
                this.draw_legs_walk(ix, this.y); // GONNA NEED OTHER LEGS
                this.draw_shirt(ix, this.y);
                this.draw_head(ix, this.y);
                this.draw_hands(ix, this.y);
            } else {
                this.draw_legs_walk(this.x, this.y); // GONNA NEED OTHER LEGS
                this.draw_shirt(this.x, this.y);
                this.draw_head(this.x, this.y);
                this.draw_hands(this.x, this.y);
            }
            btx.restore();
        }

        this.tick = function () {
            this.move();
            btx.resetTransform();
            this.draw_body();
//            this.stayAboveGround(); //refactorer
            this.frame++;
            if (this.frame > 6) {
                this.frame = 4;
            }
        } // tick end.

    }


}
