$(document).ready(function () {
        var block, now_color, block_id;
        var c_tetris = document.getElementById("tetris");
        var tetris_context = c_tetris.getContext("2d");
        var W = 1170, H = 600;


        c_tetris.height = H;
        c_tetris.width = W;

        var game_field = [], game_freezed = [];

        var rows = 6, cols = 12;

        var step_time = 100;

        for (var i = 0; i < rows; i++) {
            var tmp = [];

            for (var g = 0; g < cols; g++) {
                tmp.push(0);
            }

            game_field.push(tmp);
            game_freezed.push(tmp);
        }

        var shapes = [
            [[1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]],

            [[0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]],

            [[0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]],

            [[0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]],

            [[1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0]],

            [[1, 1, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]],

            [[1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

            [[0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]]

        ];

        var cur_shape = 1;

        function reshape_block() {
            if (cur_shape + 1 === 1) {
                return shapes[block_id]
            }
            else if (cur_shape + 1 === 2) {
                switch (block_id) {
                    case 0:
                        return shapes[7];
                        break;
                    case 1:
                        return shapes[9];
                        break;
                    case 2:
                        return shapes[12];
                        break;
                    case 3:
                        return shapes[block_id];
                        break;
                    case 4:
                        return shapes[15];
                        break;
                    case 5:
                        return shapes[19];
                        break;
                    case 6:
                        return shapes[17];
                        break;
                }
            }
            else if (cur_shape + 1 === 3) {
                switch (block_id) {
                    case 0:
                        return shapes[block_id];
                        break;
                    case 1:
                        return shapes[10];
                        break;
                    case 2:
                        return shapes[13];
                        break;
                    case 3:
                        return shapes[block_id];
                        break;
                    case 4:
                        return shapes[16];
                        break;
                    case 5:
                        return shapes[20];
                        break;
                    case 6:
                        return shapes[18];
                        break;
                }

            }
            else if (cur_shape + 1 === 4) {
                switch (block_id) {
                    case 0:
                        return shapes[8];
                        break;
                    case 1:
                        return shapes[11];
                        break;
                    case 2:
                        return shapes[14];
                        break;
                    case 3:
                        return shapes[block_id];
                        break;
                    case 4:
                        return shapes[block_id];

                        break;
                    case 5:
                        return shapes[block_id];
                        break;
                    case 6:
                        return shapes[block_id];
                        break;
                }

            }
        }

        function add_shape() {
            if (cur_shape + 1 === 4) {
                cur_shape = 0
            }
            else {
                cur_shape += 1
            }
        }

        var count_blocks = [0, 1, 6, 3, 16, 15,9];
        var positions = [4, 0, 7, 10, 3, 0,1];
        var colors = [1, 1, 2, 3, 4, 2, 3];
        var colors_meta = ["", "rgb(255, 140, 102)", "rgb(81, 13, 129)", "rgb(67, 180, 152)", "rgb(238, 229, 58)"];

        var qubes = [];
        for (i = 0; i < count_blocks.length; i++) {
            qubes.push(shapes[count_blocks[i]]);
        }

        function clear_game() {
            game_field = [];
            for (var i = 0; i < rows; i++) {
                var tmp = [];

                for (var g = 0; g < cols; g++) {
                    tmp.push(game_freezed[i][g] | 0);
                }

                game_field.push(tmp);
            }

        }

        clear_game();

        var cur_X, cur_Y = 0;

        function valid(X, Y, block) {
            for (var r = 0; r < 4; r++) {
                if (-1 !== $.inArray(1, block[r]) && Y + r >= rows) {
                    return false;
                }

                for (var g = 0; g < 4; g++) {
                    if (block[r][g] && game_freezed[Y + r][X + g]
                        || block[r][g] && X + g > cols
                        || block[r][g] && X + g < 0) {
                        return false;
                    }
                }

            }

            return true;
        }


        var lock_tetris = false;

        function step(block_proto, position, color) {
            block = block_proto[0];
            block_id = block_proto[1];
            now_color = colors[color];
            if (!lock_tetris) {
                game_freezed = game_field;
            }

            clear_game();

            cur_X = position;
            cur_Y = 0;

            var n = 0;


            for (var g = 0; g < 4; g++) {
                for (i = 0; i < 4; i++) {
                    game_field[g][cur_X + n] = block[g][i] * now_color;
                    n += 1;
                }
                n = 0;
            }

            lock_tetris = true;
            var game_interval = window.setInterval(function () {
                cur_Y += 1;

                if (!valid(cur_X, cur_Y + 1, block)) {
                    lock_tetris = false;
                    window.clearInterval(game_interval);
                }

            }, step_time);

        }

        var b = 0;
        var lol = setInterval(function () {
            if (lock_tetris === false) {
                step([qubes[b], count_blocks[b]], positions[b], colors[b]);
                b++;

                if (b >= count_blocks.length) {
                    window.clearInterval(lol);
                }
            }
        }, step_time);

        var BLOCK_W = W / cols, BLOCK_H = H / rows;

        function drawBlock(x, y) {
            tetris_context.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
            tetris_context.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
        }

        function render() {
            clear_game();
            var n = 0;
            var h = 0;


            for (g = 0; g < 4; g++) {
                for (i = 0; i < 4; i++) {
                    if (typeof game_field[cur_Y + h] !== 'undefined') {
                        game_field[cur_Y + h][cur_X + n] += block[g][i] * now_color;
                    }
                    n += 1

                }

                h += 1;
                n = 0;
            }

            tetris_context.clearRect(0, 0, W, H);
            for (var x = 0; x < cols; ++x) {
                for (var y = 0; y < rows; ++y) {
                    if (game_field[y][x]) {
                        tetris_context.fillStyle = colors_meta[game_field[y][x]];
                        tetris_context.strokeStyle = colors_meta[game_field[y][x]];
                        drawBlock(x, y);
                    }
                }
            }

        }

        setInterval(render, 30);

        function keyPress(key) {
            switch (key) {
                case 'left':
                    if (valid(cur_X - 1, cur_Y, block) && lock_tetris) {
                        cur_X -= 1;
                    }
                    break;

                case 'right':
                    if (valid(cur_X + 1, cur_Y, block) && lock_tetris) {
                        cur_X += 1;
                    }
                    break;

                case 'down':
                    break;

                case 'rotate':
                    if (valid(cur_X, cur_Y + 1, reshape_block())) {
                        block = reshape_block();
                        add_shape();
                    }
                    break;
            }

        }

        document.body.onkeydown = function (e) {
            var keys = {
                37: 'left',
                39: 'right',
                40: 'down',
                38: 'rotate'
            };
            if (typeof keys[e.keyCode] != 'undefined') {
                keyPress(keys[e.keyCode]);
                render();
            }
        };
    }
);
