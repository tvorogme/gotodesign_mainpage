Physics(function (world) {

    var viewWidth = $(document).width();
    var viewHeight = $(document).height();

    var renderer = Physics.renderer('canvas', {
        el: 'myworld',
        width: viewWidth,
        height: viewHeight,
        meta: false,
        styles: {
            'circle': {
                strokeStyle: 'rgb(0, 30, 0)',
                lineWidth: 1,
                fillStyle: 'rgb(100, 200, 50)',
                angleIndicator: false
            },
            'convex-polygon': {
                angleIndicator: false
            }
        }
    });


    world.add(renderer);

    world.subscribe('step', function () {
        world.render();
    });


    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.3
    }));

    var x_pos = [0, viewWidth/9, viewWidth - 300];
    for (var i = 0; i < 3; i++) {

        var myWheel = Physics.body('circle', {
            x: x_pos[i],
            y: -100,
            radius: viewWidth / 10
        });
    }

    world.add(myWheel);

    x_pos = [viewWidth/2, viewWidth/5, viewWidth];
    for (var i = 0; i < 3; i++) {
        var a = viewWidth/5;
        world.add(Physics.body('convex-polygon', {
            x: x_pos[i],
            y: -100,
            vx: 0,
            vy: 0,
            angle: 30 * Math.random(),
            angularVelocity: 0,
            mass: 1.0,
            restitution: 1.0,
            cof: 0.8,
            vertices: [{x: 0, y: 0}, {x: a, y: 0}, {x: a / 2, y: (a * Math.sqrt(3)) / 2}]
        }));
    }

    world.add(Physics.behavior('body-collision-detection'));
    world.add(Physics.behavior('sweep-prune'));

    // ensure objects bounce when edge collision is detected
    world.add(Physics.behavior('body-impulse-response'));

    // add some gravity
    world.add(Physics.behavior('constant-acceleration'));


    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function (time, dt) {

        world.step(time);
    });

    // start the ticker
    Physics.util.ticker.start();


});