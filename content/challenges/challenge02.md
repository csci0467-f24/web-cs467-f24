---
title: "CS 467 - Challenge Two"
date: "2024-09-18"
due: "2024-09-30T14:15"
name: "Challenge 02"
published: true
---

#### Goals

- Demonstrate your ability to use graphics contexts for tiling
- Demonstrate your ability to switch between ranges
- Demonstrate your ability to work with polar coordinates

## Objective

For your second challenge, you are going to create a tool for producing what I am going to call _Kaleido-tiles_. The tool will allow the user to draw their own tiling and produce something similar to this:

![]()

The idea is that the user draws on the canvas. But, instead of making marks directly, the points are transformed Cartesian points in the canvas' space to Polar coordinates in the tile space (this is similar to how we transformed the mouse location in [tutorial 02](../tutorial02-repetition), but without the further conversion to Polar coordinates). once the points are in Polar coordinates, they can draw multiple times with angle offsets to spin them around the center of the tile creating a kaleidoscope effect.

So, in the example above, I am drawing lines. Te user clicks twice to create the line. Both points are transformed to Polar coordinates around the center of the tile. There is then a loop that creates offsets that are multiples of $\frac{\pi}{4}$. For each offset, the points are converted back to Cartesian coordinates and I draw a line.

## Getting Started

1. Click the GitHub classroom [link](https://classroom.github.com/a/6x1NO_ns)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Requirements

- The entire canvas should be tiled
- The user should be able to draw in some way using the mouse
- Directions for how to draw should be in the README.md file
- The user should be able to use the entire canvas for drawing, with the points in some way converted to the tile space (i.e., there should be nowhere on the canvas I can click that doesn't produce a mark in the tiles)
- All marks should be spun around the center point of the tile to create a kaleidoscope effect
- All drawing for the tile should be done in a graphics context
- When the user hits the Space bar, the drawing should clear
- You should add some creative twist of your own

## Thoughts

- For Polar coordinates, you need the angle and the radius. You can get the angle with $\arctan(\frac{y}{x})$ and the radius with $r = \sqrt{x^2 + y^2}$. p5js has an `arctan2` function that you will find useful.

- What you draw is up to you. The picture above uses a very simplistic model. Every two points clicked by the user produces a line. Feel free to experiment with your "brush". You are not restricted to lines. You can also make use of `mouseDragged` to allow something more like drawing or painting. Feel free to experiment with color and transparency. You are welcome to overlap tiles like we did in the tutorial, but if you do, do it intentionally because it works for your tool. If you just do it by default, it can be a hot mess.

- Feel free to provide the user with additional controls. For example, you could allow the user to change colors, thickness, or shape.

- There are a lot of little choices that can affect the drawings. For example, in my version, there is a question of whether a single continuous line should be produced (always connect to the last point clicked) or if it should be a collection of discrete lines (after a line is drawn, clear the last point). Another choice would be about whether the user should feel like they are drawing on the canvas, with the points being scaled down to tile size, or in tile space. The advantage of drawing in tile space is that the output is generally predictable. Marks appear where you draw, and in the same place on every other tile. The downside, however, if you are making lines is that if you accidentally cross the tile boundary you can get long lines that shoot across every tile.

- My advice is to lock in your conversion from the mouse to the points on the tiles early. Work the way we did in the tutorial. Start with getting drawing working on a single tile with no kaleidoscope or Polar coordinates. Then add the Polar conversion and then convert back and make sure it still works. Then add the tiling. And then add the kaleidoscope effect. Write your code in such a way that it is easy to go back and turn things off if you need to debug.

## Reflection

I would like you to write a brief reflection in the `reflection.md`` file. It should answer the following questions:

What (if anything) did you struggle with?

- What (if anything) still is not complete?

- What questions (if any) do you have about this assignment?

- What do you feel like you understand better after having completed this?

### Revisions

If you revise your submission, please add a _dated_ addition to your reflection that describes what has been changed.

## Submitting

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_

_Important: it is tempting to treat all of our deadlines as "loose" -- this is a dangerous path! Get **something** done by the deadline and submit. You can always go back to it, and you will get the benefit of my feedback. Just make sure that your reflection acknowledges that it isn't complete._
