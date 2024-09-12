---
title: "CS 467 - Tutorial One"
date: "2024-09-16"
due: "2024-09-18T14:15"
name: "Tutorial 01"
published: false
---

#### Goals

After this tutorial you should be able to:

- Create a basic p5.js sketch
- Change the color mode and explain why you might use RGB or HSB
- Use the `lerpColor` function to interpolate between two colors
- Know how to add UI elements to your page and use their values in your sketches




## Prerequisites


1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/fcGasFz1). 
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)



## Task

This is a fairly simplistic tutorial, we are just going to make two bands which fade from one color to another through interpolation. The top band will operate in RGB, and the bottom band will operate in HSB. Each band will consist of a row of small rectangles, the color of which will be chosen based on its position.

*Links to the references for the included functions can be found at the bottom.*

### Part 1: Setup

We will need three main variables to control our color bands: a start color, and end color, and the number of divisions in the band. Create variables `divisions`, `startColor`, and `endColor` above the `setup()` function. 

_For those new to JavaScript or just classes with me in JS, my preference for variable declaration is `const` if you can and `let` if you have to change the value (which you will for two of these) and never `var`._


We will initialize these variables inside the `setup()` function. Make the divisions 100, and make the two colors to red and green.

_One of the quirks of working with p5.js is that none of the built-in functions are available until `setup()` (or `preload()`) is called. In this instance, it means we can't use the `color()` function to initialize our values where we declare them._


You will also want to turn off the stroke (`noStroke()`).

### Part 2: Draw the RGB band

In `draw()`, make a `for` loop and draw a `rect` for each one of the divisions. The band should span the width of the canvas, which is available in the `width` variable. Use `width` to determine the size of your rectangles given the number of divisions. The height of the rectangles is up to you.

Use `lerpColor` to figure out the color for each `rect` based on the percentage of the distance across the canvas.

Run this -- you should have a nice band that fades from red to blue.

### Part 3: Draw the HSB band

I don't normally recommend this, but copy your `for` loop and paste it into the `draw()` function a second time. Change the `y` position for the rectangles so second band is below the first.

Before the second `for` loop, add in `colorMode(HSB)`. *Because `draw()` is running in a loop, you will also need to add `colorMode(RGB)` before the first `for` loop, or both bands will use `HSB`.*

This works because the colors are stored independently of the color mode. The color mode comes into effect at the creation time of colors (so inputs can be interpreted correctly) and when performing operations like interpolation.

You should see a distinct difference between the two bands. Can you explain it?


### Part 4: Commit your changes

Let's be mindful about our git use. Commit your changes to your repository before moving to the next step. Don't worry about making feature branches, however, we aren't getting that complex yet.


### Part 5: User interaction

We are going to add some basic user interaction to allow the user to control our three primary variables.

#### Add a slider
Comment out the `divisions` variable and add a new `divisionSlider` variable. In setup, use the `createSlider()` function to make a slider that allows the user to vary the number of divisions between 2 and 200. Set the default to 100, and the step size to 1.

Use the slider's `position` function to place it just below the canvas (the `height` variable might be useful here).

Adjust the `draw()` function so that it pulls the number of divisions from the sliders `value` function.

You should now be able to slide the slider back and forth and see the number of divisions change.

There are some ugly white lines that show up for some values of the slider. Can you explain why they are there? Can you fix them?

#### Add color pickers
A function we have not looked at yet is `createColorPicker()`. This works just like `createSlider`, except that it places a swatch of color on the page, and clicking on it opens up a color picker, allowing the user to select a new color.

Comment out your `startColor` and `endColor` variables, and create two new variables: `startPicker` and `endPicker`. Use `createColorPicker()` in `setup` to initialize your pickers. The function takes a color to initialize the swatch, so pass in red and blue.

Use the pickers' `position` function to place them under your slider. 

Adjust the `draw` function to use the values from these pickers for your color endpoints. 




## Finishing up

Commit your changes to git and push them back up to GitHub. I will find them there.

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/p5/background)  
[color](https://p5js.org/reference/p5/color)  
[colorMode](https://p5js.org/reference/p5/colorMode)  
[createCanvas](https://p5js.org/reference/p5/createCanvas)  
[createColorPicker](https://p5js.org/reference/p5/createColorPicker)  
[createSlider](https://p5js.org/reference/p5/createSlider/)  
[fill](https://p5js.org/reference/p5/fill)  
[lerpColor](https://p5js.org/reference/p5/lerpColor)   
[noStroke](https://p5js.org/reference/p5/noStroke)  
[rect](https://p5js.org/reference/p5/rect)  