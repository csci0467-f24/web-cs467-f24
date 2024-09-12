---
title: "CS 467 - Tutorial Two"
date: "2023-02-23"
due: "2023-02-28T14:15"
name: "Tutorial 02"
published: false
---



#### Goals

- Create a piece based on repetition
- Learn a technique for off-screen rendering
- Learn about mouse and keyboard interaction



## Prerequisites


1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/ARp8PJei). 
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)



## Task

For this tutorial, you are going to play with repetition.

*Links to the references for the included functions can be found at the bottom.*

![Tutorial 02 Goal](../images/tutorials/tutorial02/tutorial02.png)

### Part 1: Establish the grid

Create a new constant called `CELL_SIZE` and set it to 50. This will be the size of a "cell" in the grid. 

In the `draw()` function, write a pair of nested for loops for `x` and `y`. Start both at `CELL_SIZE` and increment by `CELL_SIZE` until you hit the bounds of the canvas (`width` and `height`). We start `x` and `y` off at `CELL_SIZE` for two reasons. First, `(x,y)` will be the point in the center of the cell. Second, we will give the grid a border of `CELL_SIZE/2` (provided we keep the canvas dimensions multiples of 100).

To make sure that you have this working correctly, draw a circle centered on `(x, y)` that is smaller then `CELL_SIZE`. 

### Part 2: Write a `drawShape()` function

Create a new function called `drawShape()` and give it arguments `(x,y)`. 

It should draw a circle centered at `(x,y)`. To make it more interesting, remove the fill and just draw the outline. Remove the call to `circle` from the `for` loops and replace it with a call to your new function. 

Experiment with different circle sizes -- when the circle exceeds the bounds of the cell, interesting interactions start happening.

### Part 3: Add in a new graphics context

Currently, your program is drawing each circle individually. There are moment when this is beneficial (i.e., when we want them all to behave slightly differently), however, we want them to be like a rubber stamp, so we are going to draw it once and just paste it around. We will do this with an **offscreen graphics context**.

We can create a new graphics context with `createGraphics()`. It takes two required arguments, the `width` and the `height`. 

Let's use this to rewrite the `drawShape()` function. 

Remove the `x`, `y` arguments. We no longer need `x` and `y`, because we are drawing with respect to the origin in a small region roughly the size of the grid cell. 

At the start of the function make a new variable called `ctx` (for "context") and initialize it using `createGraphics()`.  Set the dimensions to be twice `CELL_SIZE` for both width and height (this will allow us to extend outside of the cell).

To draw into the graphics context, you use the same functions as before, but this time you call them on the graphics object. So, for example, if you have code like `circle(width/2, height/2)`, we would rewrite this as `ctx.circle(ctx.width/2, ctx.height/2)`. Notice that even `width` and `height` are switched so they refer to the dimensions of the graphics context. 

All of our p5.js functions should work inside of the graphics context. Note, however, that if you use `background()`, it will create a solid background, and we won't be able to overlap our shapes. There is an alternate function called `clear` which makes all of the pixels transparent (though you don't need it here).

At the end of the function, return `ctx`.


Now, *before* the `for` loops, call `drawShape`, and save the result in a variable called `cell`.


We can display our graphics context using the `image()` function. You would call it with the `cell` graphics context like this: `image(cell, x, y)`. Of course, we were assuming that `(x,y)` was the center of the cell, and `image()` uses its coordinates for the upper left corner. We can change this behavior using `imageMode(CENTER)` which instead uses the coordinates for the center of the image (there are similar functions that serve the same purpose for rectangles (upper left corner by default) and ellipses (centered by default)). 

If you did that all correctly, there shouldn't be much change. 


### Part 4: Add mouse interaction

In p5.js, mouse location is available in two variables: `mouseX` and `mouseY`. *Note that these are not available in our offscreen graphics context, because the mouse isn't there...*

The way we are going to use the mouse is to duplicate its movements in all of the grid cells. To do this, we need to map the position of the mouse in the large canvas down to movement in the smaller graphics context. 

Rescaling is another very common mathematical operation in graphics. You take a value in one space and divide it by the size of the space. You now have a value between 0-1, that you can think of as the percentage of the way across the space. You then multiple this by the size of the second space and you have the location in the new space. This is pretty easy, but can get a little more complex if our spaces don't start at zero, and we need to include a translation as well. 

These unit conversions are useful and worth remembering how to do. *However*, it is so common that p5.js includes a function to do it for us, the `map()` function (yes, this is a very different function from `array.map()`). The `map` function takes five arguments `value` (the value we are converting), `start1` (the start of the current range), `stop1` (the end of the current range), `start2` (the start of the new range), and `end2` (the end of the new range). It handles all of the scaling and translating for us.

In the `draw` function, use the `map` function to convert the mouse position from the canvas (`0-width` and `0-height`) to cell dimensions (`0-CELL_SIZE*2` for both). Add these as arguments to `drawShape`. 

In `drawShape`, use the new arguments to position the circle. As you move the mouse around the canvas, yuo should see the circle move around as well.

### Part 5: Adding lines

To get the effect shown above, instead of drawing circles, we will draw lines connecting the sides of the context to the relative mouse location. We will draw the lines with a low alpha value, which will cause color variations where they cross and come together. 

Create a new variable in `drawShape` to hold the number of lines along each side. Set it to 10.

Create a new variable `offset`, which is the space between the lines (which you get by dividing the width or height of the graphics context by your line count).

Write a `for` loop that goes from 0 to `width` (or `height`), stepping by `offset`. Inside, draw four lines, one from each wall of the cell, with the endpoint at the relative mouse location (you can use the same loop iterator as either the `x` or the `y` of the start point). 

Before the loop, be sure to set the alpha value of the stroke to something fairly low. 

### Part 6: Add sliders

Add two sliders like we did in [tutorial 01](./tutorial01-color). One should control the number of lines (4 to 50, with a step of 1). The other should control the alpha (from 0 to full for whichever color mode you wish to use).

### Part 7: Add keyboard interaction

Interacting with the keyboard is as easy as interacting with the mouse. There is a variable called `key` that tells us which key is pressed. However, sometimes we don't want to be reliant on the `draw` loop running and catching these event states. Instead, we want to be proactive and say "When X happens, do Y".

In p5.js, we have a collection of event handling functions that work like `setup` and `draw` -- we define them and p5.js will call them at the appropriate moment. We have handlers for both keyboard and mouse events. 

For this practical, we will add a simple handler that will save the contents of the canvas when the user types an 's'.

```javascript
function keyTyped(){
  if (key === 's'){
    saveCanvas('wires', 'png');
  }
}
```



## Finishing up

Commit your changes to git and push them back up to GitHub. I will find them there.

## References

Links to the reference pages for the functions you will be using:


[clear](https://p5js.org/reference/#/p5/clear)  
[createCanvas](https://p5js.org/reference/#/p5/createCanvas)  
[createGraphics](https://p5js.org/reference/#/p5/createGraphics)  
[createSlider](https://p5js.org/reference/#/p5/createSlider)  
[image](https://p5js.org/reference/#/p5/image)  
[imageMode](https://p5js.org/reference/#/p5/imageMode)  
[line](https://p5js.org/reference/#/p5/line)  
[map](https://p5js.org/reference/#/p5/map)  
[mouseX](https://p5js.org/reference/#/p5/mouseX)  
[mouseY](https://p5js.org/reference/#/p5/mouseY)  
[noFill](https://p5js.org/reference/#/p5/noFill)  
[key](https://p5js.org/reference/#/p5/key)  
[keyTyped](https://p5js.org/reference/#/p5/keyTyped)  
[saveCanvas](https://p5js.org/reference/#/p5/saveCanvas)  
[stroke](https://p5js.org/reference/#/p5/stroke)  


