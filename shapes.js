// aliases via deconstruction to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
const {Engine, Render, Bodies, World} = Matter


// where is matter being deployed?
const sectionTag = document.querySelector("section.shapes")

// two separate things matter needs - engine (does all the math and phsics calculations) and the renderer (this draws the engine).

    // what is the width and height of the page
    const w = window.innerWidth
    const h = window.innerHeight

const engine = Matter.Engine.create()
const renderer = Matter.Render.create({
    element: sectionTag,
    engine: engine,
    // Documentation: https://brm.io/matter-js/docs/files/src_render_Render.js.html# for full list of options
    options: {
        height: h,
        width: w,
        background: "#000000",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
    }
})

// have the ability to create a brand new shape
// documentation: https://brm.io/matter-js/docs/classes/Bodies.html
// Matter.Bodies.circle(x, y, radius, [options], [maxSides]) 
const createShape = function (x, y) {
    return Bodies.circle(x, y, 20 + 20 * Math.random())
}

// when we click the page, add a new shape
document.addEventListener("click", function(event) {
    const shape = createShape(event.pageX, event.pageY)
    World.add(engine.world, shape)
})

//run both the engine (turn the car on 🚗), and the renderer
    // Redacted the following by deconstruction
    // Matter.Engine.run(engine)
    // Matter.Render.run(renderer)
Engine.run(engine)
Render.run(renderer)
