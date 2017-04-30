$(document).ready(function () {
    var c_tetris = document.getElementById("tetris");
    var tetris_context = c_tetris.getContext("2d");

    tetris_context.width = 900;
    tetris_context.height = 400;

    var game_field = [];

    var rows = 7;
    var cols = 9;

    var step_time = 300;

    for (var i = 0; i < rows; i++) {
        var tmp = [];

        for (var g = 0; g < cols; g++) {
            tmp.push(0);
        }

        game_field.push(tmp);
    }

    var shapes = [
        [[1, 1, 1, 1],
            [0, 0, 0, 0]],

        [[1, 0, 0, 0],
            [1, 1, 1, 0]],

        [[0, 0, 0, 1],
            [0, 1, 1, 1]],

        [[1, 1, 0, 0],
            [1, 1, 0, 0]],

        [[0, 1, 1, 0],
            [1, 1, 0, 0]],

        [[0, 1, 0, 0],
            [1, 1, 1, 0]],

        [[1, 1, 0, 0],
            [0, 1, 1, 0]]
    ];


    function add(a, b) {
        return a + b;
    }

    var count_blocks = [1, 1, 1, 1, 1, 1, 1];

    var sum = count_blocks.reduce(add, 0);
    var positions = [0, 0, 0, 0, 0, 0, 0];


// TESTS

    if (sum !== positions.length) {
        alert("Sum of blocks not equal with positions.length")
    }

    if (count_blocks.length !== shapes.length) {
        alert("Count of blocks not equal with shapes")
    }

    var qubes = [];
    for (i = 0; i < count_blocks.length; i++) {
        for (var j = 0; j < count_blocks[i]; j++) {
            qubes.push(shapes[i]);
        }
    }

    function clear_game() {
        game_field = [];
        for (var i = 0; i < rows; i++) {
            var tmp = [];

            for (var g = 0; g < cols; g++) {
                tmp.push(0);
            }

            game_field.push(tmp);
        }
    }

    clear_game();

    var cur_X, cur_Y = 0;

    function validate(X, Y, block) {
        return !(game_field[Y + 1][X] === 1 && block[2][X] === 1 ||
        game_field[Y + 1][X + 1] === 1 && block[2][X + 1] === 1 ||
        game_field[Y + 1][X + 2] === 1 && block[2][X + 2] === 1 ||
        game_field[Y + 1][X + 3] === 1 && block[2][X + 3] === 1 ||

        game_field[Y][X] === 1 && block[1][X] === 1 ||
        game_field[Y][X + 1] === 1 && block[1][X + 1] === 1 ||
        game_field[Y][X + 2] === 1 && block[1][X + 2] === 1 ||
        game_field[Y][X + 3] === 1 && block[1][X + 3] === 1)
    }

    function valid(offsetX, offsetY, X, Y) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        offsetX = X + offsetX;
        offsetY = Y + offsetY;

        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                if (typeof game_field[y + offsetY] == 'undefined'
                    || typeof game_field[y + offsetY][x + offsetX] == 'undefined'
                    || game_field[y + offsetY][x + offsetX]
                    || x + offsetX < 0
                    || y + offsetY >= rows
                    || x + offsetX >= cols) {
                    return false;
                }
            }
        }

        return true;
    }


    function step(block, position) {
        cur_X = position;
        cur_Y = 0;

        var n = 0;
        for (var g = 0; g < 2; g++) {
            for (i = 0; i < 4; i++) {
                game_field[g][cur_X + n] = block[g][i];
                n += 1;
            }
            n = 0;
        }


        var game_interval = window.setInterval(function () {
            if (cur_X + 4 >= game_field[0].length || cur_Y + 2 >= game_field.length || valid()) {
                window.clearInterval(game_interval);
            }

            clear_game();
            cur_Y += 1;
            n = 0;
            var h = 0;
            for (g = 0; g < 2; g++) {
                for (i = 0; i < 4; i++) {
                    game_field[cur_Y + h][cur_X + n] = block[g][i];
                    n += 1
                }
                h += 1;
                n = 0;
            }
            validate(cur_X, cur_Y, block);
        }, 1000);

    }

    step(qubes[0], positions[0]);

    var W = 900, H = 400;
    var BLOCK_W = W / 30, BLOCK_H =(H / 18) + 2;

    function drawBlock(x, y) {
        tetris_context.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
        tetris_context.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    }

    function render() {
        tetris_context.clearRect(0, 0, W, H);

        tetris_context.strokeStyle = 'black';
        for (var x = 0; x < cols; ++x) {
            for (var y = 0; y < rows; ++y) {
                if (game_field[y][x]) {
                    // ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                    drawBlock(x, y);
                }
            }
        }

    }

    setInterval(render, 30);

    function keyPress(key) {
        switch (key) {
            case 'left':
                cur_X -= 1;
                break;

            case 'right':
                cur_X += 1;
                break;

            case 'down':
                break;

            case 'rotate':
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
});
