---
title: "CS 467 - Tutorial Eight"
date: "2024-10-23"
due: "2024-10-25T23:59"
name: "Tutorial 08"
published: true
---

#### Goals

- Construct a simple Cellular Automata

## Prerequisites

1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/rIQfsTg8).
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Assignment

In this tutorial, we are going to implement a one dimensional, elementary cellular automata system. Elementary cellular automata only have two possible states (0 or 1), and only two neighbors (left and right).

Because of these simple constraints there are only eight possible neighborhoods: 000, 001, 010, 011, 100, 101, 110, and 111. For each one of these, the next state is either a 0 or a 1.

A **rule** will be a unique set of next states for each of the eight possible neighborhoods. Here is an example rule from [Wolfram](https://mathworld.wolfram.com/ElementaryCellularAutomaton.html)

![rule 30](./tutorial08/ElementaryCA30Rules.svg)

So, if we have eight possible neighborhoods, each of which could have a next state of 0, or 1, that means we have at most $2^8 = 256$ possible rules.

Each rule can be represented by a single number. We interpret the neighborhood as a Boolean number which represents the bit position of the rule. The rule above is rule 30, because 0001 1110 in binary has the value 30 (e.g., if the neighborhood looks like 101, then we want to look at bit 5, which tells us that the next state is 0).

In this tutorial we are going to build a tool that allows us to explore the evolution of any of the 256 possible rules.

#### Starter code

I have given you some starter code which adds a text input box and uses it to set the current rule, which is stored in the global `rule` variable.

### Part 1: Create a Cell

These elementary automata are so simplistic that we could really just implement them with a basic array of numbers (well, two arrays so we can keep current state and next state distinct). However, I want you to practice with the object oriented approach since it is more flexible.

The first step will be to create a `Cell` class, which will be very similar to the tutorials that we have done recently. The class should have:

- a constructor
- an `addLeft(cell)` method
- an `addRight(cell)` method
- an `update()` method
- a `draw()` method

#### The constructor

Our cell needs to know three things:

- It needs to know where it is
- It needs to know its state
- It needs somewhere to store its next state
- who its neighbors are

In the constructor, create three instances variables: `x`, `state`, and `next` to save these values.

The `x` should be passed in as an argument to the constructor, so we can set the position when it is created.

Initialize the `state` and `next` variables to 0.

We won't worry about the neighbors in the constructor.

#### The `addLeft(cell)` and `addRight(cell)` methods

We will use these functions to connect the cell to its neighbors. Each one takes a single argument: the cell to connect to.

In `addLeft()` set `this.left` to the cell.

In `addRight()` set `this.right` to the cell.

#### The `update()` function

This function is where the real work of the cell is done. Given the state of the cell and its two neighbors, you need to figure out what the next state of the cell will be.

The actual functionality is pretty simple, but there is a conceptual trick you need to wrap your head around.

Recall that I said that there are only eight possible neighborhoods: 000,001,010,011,100,101,110,111. Just as we did with the rules, we can interpret these as binary representations of the value 0-7.

Here is the cool part -- that number tells us which bit of the current rule contains the next state for our cell.

So, for example, with rule 30 above, if the neighborhood is 011 (the left neighbor is 0, the current cell is 1, and the right is 1), then we look at bit 3 of the rule. That bit is a 1, so our next state for the current cell is a 1. Similarly, if the neighborhood is 101, then we would look at bit 5, and see that it is a 0 for rule 30.

This leaves us with two tasks:

- we need to combine the states of the three neighbors to get the number associated with their collective state
- we need to be able to read a single bit from the number representing our rule

Combining the states of the three neighbors into a single number is pretty straightforward if you remember how binary numbers work. The positions are just powers of two, so, for example, $101 = 1\times4 + 0\times2 + 1\times1 = 5$

Now you need to find the value of the bit at that location. Time to see how much you remember about 202 (I told you we would pull from across your education). The easiest way to find the value of a bit in a number is to shift the number so that the bit you care about is in the lowest position and then do a bitwise AND with 1. So, if I wanted to know what the fifth bit of 30 was, I could write `(30>>5) & 1` (and we would get a 0).

Use this value to set `this.next`.

#### The `draw()` function

This one is pretty straightforward. Fill a `rect`. Use `this.x` and `CELL_SIZE` to determine size and position. Since we have a 1D CA, set the `y` position of the `rect` at 0.

After you have drawn the `rect`, set the current state of the cell to the next state.

### Part 2: Create the cellular automata

As we have done in earlier work, you are going to create an array of Cell objects. Use `CELL_SIZE` and `width` to figure out how many cells to put in the array. The goal is to have the maximum number of cells without cutting one off on the edge of the canvas. Use a `for` loop to create the new `Cell` objects and put them in the array.

#### Initialization

The behavior of the CA will vary considerably depending on the initial state of the cells.

We have initialized all of the cells to 0, which will make for some very disappointing visualizations. Can you predict what the final form would be? _As a hint, there are three possibilities._

There are a large number of possible opening patterns (2 to the number of cells in the row). We could try initializing the cells to random values, but we are going to follow Wolfram's lead and just initialize the center cell to state 1. So, figure out which cell is in the middle and set its state to 1. If there is an even number of cells, it is okay to just pick one (or just let the math do it for you).

### Part 3: Rendering

This again follows a familiar pattern: iterate through all of the cells calling their `update()` function and then iterate over them again to call their `draw()` functions.

If you run this, you will see a row of squares that flicker and change color. Of course, we want to show time in the y dimension. There are a number of ways we could do this, but we will use our trusty `translate` function.

Create a new variable `offset`, which is initially set at 0. Before you draw the cells, translate down by the offset, and then increase `offset` by `CELL_SIZE`.

Since we only want to fill the canvas, check to see if `offset` exceeds `height`, and if it does, call `noLoop` to stop the `draw` loop.

You should now be able to visualize a 1D CA. I set the initial rule to 90, so you should get a Sierpinski triangle.

### Part 4: Trying multiple CAs

I set up the text entry box, but if you try to use it, you will see that it either does odd things, or it seemingly does nothing at all.

I wrote code to update the rule, and to restart the `draw` loop, but the CA needs to be reinitialized. Add the code in to start it over from the top (don't forget to think about state).

Once you have that in place, try out some other CAs to make sure they work. Many of them are not very interesting, but some are quite compelling.

Consult with https://mathworld.wolfram.com/ElementaryCellularAutomaton.html to find interesting rules (and to make sure you are actually getting the correct result).

## Finishing up

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5208701) ([submission directions](../resources/gradescope))

## References

Links to the reference pages for the functions you will be using:

[createCanvas](https://p5js.org/reference/#/p5/createCanvas)  
[createInput](https://p5js.org/reference/#/p5/createInput)  
[fill](https://p5js.org/reference/#/p5/fill)  
[loop](https://p5js.org/reference/#/p5/loop)  
[noLoop](https://p5js.org/reference/#/p5/noLoop)  
[rect](https://p5js.org/reference/#/p5/rect)  
[translate](https://p5js.org/reference/#/p5/translate)
