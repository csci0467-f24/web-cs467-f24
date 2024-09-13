---
title: "CS 467 - Tutorial Two"
date: "2024-09-18"
due: "2024-09-23T14:15"
name: "Tutorial 02"
published: true
---

#### Goals

- Create a piece based on repetition
- Learn a technique for off-screen rendering
- Learn about mouse and keyboard interaction

## Prerequisites

1. Accept the assignment on our [Github Classroom]().
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Task

For this tutorial, you are going to play with repetition.

_Links to the references for the included functions can be found at the bottom._

![Tutorial 02 Goal](../images/tutorials/tutorial02/tutorial02.png)

This image doesn't fully capture what this looks like, because the lines will follow the mouse as you move it around the canvas.

What you are looking at is a grid of squares. Each square has lines drawn from points ta fixed intervals around the square to connect at a point in the middle. That point will be controlled by the mouse.

The complexity of the image comes from the fact that the lines are drawn with a low alpha value and the squares overlap.

### Part 1: Map the mouse to one square

Create a new constant called `SQ_SIZE` and set it to 50. This will be the size of one of our squares.

Write a `drawContents()` function. This will handle drawing the contents of the square. In your `draw()` function, set the background color and then call your `drawContents()` function. _You can use whatever color scheme you like, but to get the above look, it is white lines on a black background._

Before we draw the lines, we are going to just follow the mouse with a small circle. Create two variables called `mx` and `my`, and set them to `mouseX` and `mouseY`. Draw your circle at `(mx, my)`. You should now have a circle that follows your mouse around the canvas.

We want something a little bit different, however. We want to constrain the circle to the inside of the square. What we are shooting for is _proportional_ movement of the circle. If the mouse is at the top of the square, the circle should be at the top of the square. If the mouse is at the bottom of the square, the circle should be at the bottom of the square.

We are going to enlist the help of a very helpful p5js function: `map()`. This function allows us to map a value from one range to another. It takes five arguments: the value we are converting, the start of the current range, the end of the current range, the start of the new range, and the end of the new range.

Change the definitions of `mx` and `my` to map the mouse position to points in the square. You should now see the circle move around in constrains of the square proportionally to how you move the mouse around the canvas.

### Part 2: Draw the lines

Now we are going to replace the circle with lines.

Add a new variable at the top called `NUM_LINES` and set it to 5 (we will turn this up later, but five is a good number for seeing what you are doing).

Make a loop and use it to draw `NUM_LINES` line that are equally spaced along the top edge of the square, terminating at `(mx, my)`. _Be careful with your math here. This is a classic "fence post" problem. You want lines on both extremes of the square's boundaries, and you want to have the right number of lines along the side as well. If you aren't sure you have it right, draw a square with no fill of the appropriate size while you are debugging._

Once you have the lines along one side working, progressively add the lines for the remaining three sides (checking after each new set). _Hint: you can use the same loop for all four lines, just think about the role played by the loop variable for each one._

The lines from the four corners will be duplicated. This is fine, when we reduce their alpha, this will make those edges a little stronger.

Don't forget to get rid of the circle now (and the square, if you added it in for debugging).

### Part 3: Add a graphics context

Now that you have the function, you could put a loop into the `draw()` function and repeat it all over the screen. of course, to do that, you would need to change the `mx` and `my` variables to be based on the position of the square. We are going to do something a little different.

We have the ability to make an **offscreen graphics context**. This is like an invisible canvas that we can draw into. We can draw into the graphics context and then we can use it like a rubber stamp, pasting it all over the place without having to redraw the contents.

Create a new variable at the top of your program called `sq_ctx`. Inside of `setup()`, set it to `createGraphics(SQ_SIZE, SQ_SIZE)`. This will create a small context that is just big enough to fit one of our squares. _This has to be done in `setup()` because p5js isn't initialized before that._

We can use all of the same drawing functions inside of our new graphics context as we can on the main canvas. The difference is that we need to call the functions _on_ the context. So, for example, if we had the code `circle(x, y, 10)`, we would change it to `sq_ctx.circle(x, y, 10)`. We don't have to do this to every function -- just the ones that govern the drawing. So, for example, if you want to set the stroke color (which you do), you need to use `sq_ctx.stroke(255)`. The `map` function, on the other hand, is not dependant on any particular drawing context, so we can use it as is. There is an important gotcha here, `width` and `height` will return the dimensions of the main canvas, `sq_ctx.width` and `sq_ctx.height` will return the dimensions of the graphics context. A common error is to forget which one you want and using the wrong one.

In your `drawContents()` function, replace all of the drawing functions with their `sq_ctx` versions. You will want to add a `sq_ctx.clear()` at the start of the function to make sure that you aren't drawing on top of the previous contents when the program loops.

To actually draw the contents of the graphics context, you use the `image()` function. You call it with the graphics context as the first argument, and the position you want to draw it at as the second and third arguments. Add a call to `image` to your `draw()` function. _Note that you still need the call to drwaContents() in `draw()` -- this is setting the contents of the graphics context, but it won't produce anything you can see without the `image()` call._

### Part 4: Making the grid

Once you can draw one square using the graphics context, you can use the `image()` function to draw scads of them.

Make a nested `for` loop that tiles the canvas with your squares. I am going to add another piece of complexity here. Instead of spacing the squares by `SQ_SIZE`, space them by `SQ_SIZE/2`. This will make the squares overlap and create a more complex image.

Now that you have lots lof lines, turn down the alpha value of the stroke.

### Part 5: Add sliders

Add two sliders like we did in [tutorial 01](./tutorial01-color). One should control the number of lines (4 to 50, with a step of 1). The other should control the alpha (from 0 to full for whichever color mode you wish to use).

### Part 6: Add keyboard interaction

Interacting with the keyboard is as easy as interacting with the mouse. There is a variable called `key` that tells us which key is pressed. However, sometimes we don't want to be reliant on the `draw` loop running and catching these event states. Instead, we want to be proactive and say "When X happens, do Y".

In p5.js, we have a collection of event handling functions that work like `setup` and `draw` -- we define them and p5.js will call them at the appropriate moment. We have handlers for both keyboard and mouse events.

For this practical, we will add a simple handler that will save the contents of the canvas when the user types an 's'.

```javascript
function keyTyped() {
  if (key === "s") {
    saveCanvas("wires", "png");
  }
}
```

## Finishing up

Commit your changes to git and push them back up to GitHub. I will find them there.

## References

Links to the reference pages for the functions you will be using:

[clear](https://p5js.org/reference/p5/clear)  
[createCanvas](https://p5js.org/reference/p5/createCanvas)  
[createGraphics](https://p5js.org/reference/p5/createGraphics)  
[createSlider](https://p5js.org/reference/p5/createSlider)  
[image](https://p5js.org/reference/p5/image)  
[imageMode](https://p5js.org/reference/p5/imageMode)  
[line](https://p5js.org/reference/p5/line)  
[map](https://p5js.org/reference/p5/map)  
[mouseX](https://p5js.org/reference/p5/mouseX)  
[mouseY](https://p5js.org/reference/p5/mouseY)  
[noFill](https://p5js.org/reference/p5/noFill)  
[key](https://p5js.org/reference/p5/key)  
[keyTyped](https://p5js.org/reference/p5/keyTyped)  
[saveCanvas](https://p5js.org/reference/p5/saveCanvas)  
[stroke](https://p5js.org/reference/p5/stroke)
