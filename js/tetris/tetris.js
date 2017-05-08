var block, now_color, block_id, cur_text, cur_text_id, saved_text, c_tetris, tetris_context, W, H;
var game_field = [], game_freezed = [];
var rows = 6, cols = 12;
var step_time = 1000;
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

$(document).ready(function () {
    saved_text = [];
    c_tetris = document.getElementById("tetris");
    tetris_context = c_tetris.getContext("2d");
    W = 1170;
    H = 600;

    c_tetris.height = H;
    c_tetris.width = W;


    for (var i = 0; i < rows; i++) {
        var tmp = [];

        for (var g = 0; g < cols; g++) {
            tmp.push(0);
        }

        game_field.push(tmp);
        game_freezed.push(tmp);
    }

    tetris_context.arc(W / 2, H / 2 + 20, 180, 0, 2 * Math.PI, false);
    tetris_context.strokeStyle = '#080808';
    tetris_context.stroke();
});


function start_tetris() {
    tetris_context.clearRect(0, 0, W, H);
    $("#what_we_do").toggle();
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

    var count_blocks = [0, 1, 6, 3, 16, 15, 9];
    var positions = [4, 0, 7, 10, 3, 0, 1];
    var colors = [1, 1, 2, 3, 4, 2, 3];
    var texts = ['нейроинтерфейсы', 'алгоритмы', 'пром. дизайн', 'VR/AR', 'биоинформатика', 'машинное обучение', 'мобильная разработка'];
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

    function step(block_proto, position, color, text_on_block) {
        cur_text = text_on_block;
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
            if (b !== 0) {
                saved_text.push([texts[cur_text_id], text_X, text_Y]);
            }

            step([qubes[b], count_blocks[b]], positions[b], colors[b], texts[b]);
            cur_text_id = b;
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


    function get_text_coors() {
        var start_x = cur_X * BLOCK_W;
        var start_y = cur_Y * BLOCK_H;
        var rotate = false;

        switch (cur_text_id) {
            case 0:
                start_x += 2 * BLOCK_W - (texts[cur_text_id].length * 9);
                start_y += BLOCK_H / 2 + 15;
                break;
            case 1:
                start_x += 1.5 * BLOCK_W - (texts[cur_text_id].length * 9);
                start_y += BLOCK_H + BLOCK_H / 2 + 15;
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
            case 10:
                break;
            case 11:
                break;
            case 12:
                break;
            case 13:
                break;
            case 14:
                break;
            case 15:
                break;
            case 16:
                break;
            case 17:
                break;
            case 18:
                break;
            case 19:
                break;
            case 20:
                break;
        }

        return [start_x, start_y, rotate];

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

        tetris_context.font = "30px Ubuntu";
        tetris_context.fillStyle = "white";
        tetris_context.textAlign = "left";


        // Draw saved text
        for (var t = 0; t < saved_text.length; t++) {
            tetris_context.fillText(saved_text[t][0], saved_text[t][1], saved_text[t][2]);
        }


        // Draw current text
        answer = get_text_coors();

        text_X = answer[0];
        text_Y = answer[1];

        tetris_context.fillText(cur_text, text_X, text_Y);

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
