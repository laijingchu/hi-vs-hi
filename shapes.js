// aliases via deconstruction to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
const { Engine, Render, Bodies, World, MouseConstraint, Composites, gravity } = Matter;

// where is matter being deployed?
const sectionTag = document.querySelector("section.shapes");

// two separate things matter needs - engine (does all the math and physics calculations) and the renderer (this draws the engine).

// what is the width and height of the page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Engine.create();
const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    // Documentation: https://brm.io/matter-js/docs/files/src_render_Render.js.html# for full list of options
    options: {
        height: h,
        width: w,
        background: "#000000",
        wireframes: false, // needed for pure black
        pixelRatio: window.devicePixelRatio,
    }
});

// have the ability to create a brand new shape
// documentation: https://brm.io/matter-js/docs/classes/Bodies.html
// Matter.Bodies.circle(x, y, radius, [options], [maxSides])
// Matter.Bodies.rectangle(x, y, width, height, [options])
const createShape = function (x, y) {
    return Bodies.rectangle(x, y, 35, 50, {
        // frictionAir: 1,
        render: {
            sprite: {
                texture: "assets/outline-2x.png",
                xScale: 0.5,
                yScale: 0.5
            }
        }
    });
};

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w / 4, h / 4), { // want the ball snap in the middle of the page
    isStatic: true,
    render: {
        fillStyle: "#ffffff",
    }
});

const wallOptions = {
    isStatic: true,
    render: {
        visible: true,
        fillStyle: "#ffffff",
    }
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
});

const initialShapes = Composites.stack(70, 70, 25, 5, 40, 40, function (x, y) {
    return createShape(x, y);
});

// world = calculator
World.add(engine.world, [
    bigBall,
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
    initialShapes
]);

// when we click the page, add a new shape
document.addEventListener("click", function (event) {
    const shape = createShape(event.pageX, event.pageY);
    World.add(engine.world, shape);
});


// adding a gravity loop
let time = 0 // "i want to change something, therefore use let"
const changeGravity = function () {
	time = time + 0.01
	engine.world.gravity.x = Math.sin(time)
	engine.world.gravity.y = Math.cos(time)
	console.log (time, gravity)
	requestAnimationFrame(changeGravity)	
};

	/* once this is ready for the next frame, run `changeGravity` again! */
changeGravity()

//run both the engine (turn the car on 🚗), and the renderer
// Redacted the following by deconstruction
// Matter.Engine.run(engine)
// Matter.Render.run(renderer)
Engine.run(engine);
Render.run(renderer);
