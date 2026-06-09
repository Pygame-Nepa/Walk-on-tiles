(function () {
    "use strict"
    var controller, display, game;

    controller = {

        down: false,
        left: false,
        right: false,
        up: false,

        keyUpDown: function (event) {

            var key_state = (event.type == "keydown") ? true : false;

            switch (event.keyCode) {

                case 37: controller.left = key_state; break;
                case 38: controller.up = key_state; break;
                case 39: controller.right = key_state; break;
                case 40: controller.down = key_state; break;

            }

        }

    };

    display = {

        buffer: document.createElement("canvas").getContext("2d"),
        context: document.querySelector("canvas").getContext("2d"),
        output: document.querySelector("p"),

        render: function () {

            for (let index = game.world.map.length - 1; index > -1; --index) {

                this.buffer.fillStyle = (game.world.map[index] == 1) ? "#0099ff" : "#303840";
                this.buffer.fillRect((index % game.world.columns) * game.world.tile_size, Math.floor(index / game.world.columns) * game.world.tile_size, game.world.tile_size, game.world.tile_size);

            }

            this.buffer.fillStyle = game.player.color;
            this.buffer.beginPath();
            this.buffer.arc(game.player.x, game.player.y, game.player.radius, 0, Math.PI * 2);
            this.buffer.closePath();
            this.buffer.fill();

            this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);


            this.output.innerHTML = "tile_x: " + game.player.tile_x + "<br>tile_y: " + game.player.tile_y + "<br>map index: " + game.player.tile_y + " * " + game.world.columns + " + " + game.player.tile_x + " = " + String(game.player.tile_y * game.world.columns + game.player.tile_x);

        },

        resize: function (event) {

            var client_height = document.documentElement.clientHeight;

            display.context.canvas.width = document.documentElement.clientWidth - 32;

            if (display.context.canvas.width > client_height) {

                display.context.canvas.width = client_height;

            }

            display.context.canvas.height = Math.floor(display.context.canvas.width * 0.5625);

            display.render();

        } 

    };
})

