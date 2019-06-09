const render = function(q_scale = 1.1) {
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(buffer, dcam.x, 0, buffer.width, buffer.height, 0, 0, canvas.width * q_scale, canvas.height * q_scale);
  }


const drawgym = function() {
      function drawsky() {
          btx.drawImage(imageslist.scene.background, 0, 0, buffer.width, imageslist.scene.foreground.height, dcam.x * 0.5, 0, canvas.width, imageslist.scene.foreground.height);
      }

      function drawforeground() {
          btx.drawImage(imageslist.scene.foreground, 0, 0, buffer.width, buffer.height, -dcam.vx, 0, buffer.width, buffer.height);
      }
      drawsky();
      drawforeground();
  }


  clog('_canvas_functions.js');