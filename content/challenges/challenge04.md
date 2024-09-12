---
title: "CS 467 - Challenge Four"
date: "2023-04-06"
due: "2023-04-18T14:15"
name: "Challenge 04"
published: false
---

#### Goals

- Put together the things you have learned to implement a 2D cellular automata



## Objective

For this challenge I want you to implement a two-dimensional cellular automata. There is a wide variety of different cellular automata out there, though they all share the basic structure of neighborhoods of cells that perform state updates based on their state and the state of their neighbors. 

For this challenge, you can pick any one you like. I've provided a list and some descriptions, though you are welcome to do something not on the list if you clear it with me first.

## Cellular Automata descriptions

### Conway's Game of Life

This is a classic cellular automata that many have seen before.

As with the elementary CA we did in the tutorial, the state is binary, either 0 or 1, where 0 means "dead" and 1 means "alive". The rules are a little more complex, however.

- If a cell is alive, it will die if
  - the cell has four or more alive neighbors (i.e., overpopulation)
  - the cell as one or fewer alive neighbors (i.e., loneliness)
- If a cell is dead it will be "born" (switch to state 1) if it has _exactly_ three living neighbors.
- In all other situations, it remains in the same state


You can start this in a random state, or seed the canvas with some initial shapes. The GoL has been studied extensively and you will find all kinds of descriptions about various possible shapes and how they behave (some die off, some are static, some oscillate, some run around the canvas, and some fire off other shapes). 



### Cyclic CA

This is a CA based on modulo arithmetic. Cell state is a number in the range 0-N, where N is determined at the start. In update, the cell examines its neighborhood. If the state of any of the neighbors is exactly one more (modulo N) than the cells' state, then the next state of the cell matches it. The effect of this feels a lot like joining the in crowd by latching on to someone just a little bit older than you. This one starts slow and then pools of conformity start to form, wiping out most of the non-conformists as the cycling numbers sweep by then and suck them in.

### Vichniac Vote

This is another binary CA, and it is a more direct modeling of peer group pressure. At update, the cell tallies up how many members of its neighborhood (including itself) are in each state. If it is part of the minority, it changes to join the majority, otherwise it stays the same. 


### Hodgepodge

The Hodgepodge is a curious CA that is modeled on the way some bacteria behaves (something called the Belousov Zhabotinsky reaction). It is really a model of spreading infection, which feels very topical. Initially, it behaves a bit like the cyclic CA, but under some circumstances, it starts to form some really great spirals. 

Again, cell state is a number from 0-N, where N is determined at the beginning, though unlike the cyclic CA, N is a valid state, so there are a total of N+1 possible states. Cells in state 0 are considered to be "healthy", a state greater than 0 and less than N is considered "infected" (with larger values equating to more elevated levels of infection), and state N is considered "sick".

In addition to N, there are three other constants that govern the behavior of the CA. 
- `k1` controls the effect of infected cells
- `k2` controls the impact of ill cells
- `g` controls the overall rate infections worsen

Here are the rules:

**The cell is healthy** Visit all of the neighbors and count the number of ill and the number of infected neighbors. The next state of the cell is $$\left \lfloor{\frac{\text{infected}}{k1}} \right \rfloor + \left \lfloor{\frac{\text{ill}}{k2}} \right \rfloor$$.

**The cell is ill** If the state of the cell is N, then set its next state to 0. In other words, it gets better.

**The cell is infected** Visit all of the neighbors and count the number of ill and the number of infected neighbors. At the same time, the states of all of the neighbors and the cell itself (let's call this value `sum`). The next state is $$\left \lfloor{\frac{\text{sum}}{\text{ill} + \text{infected} + 1}} \right \rfloor + g$$.

I found a [nice blog post](https://softologyblog.wordpress.com/2017/02/04/the-belousov-zhabotinsky-reaction-and-the-hodgepodge-machine/) about this CA that includes both pictures of the actual reaction as well as a collection of example outputs of the CA with values for the constants. He has written a number of posts about other CAs, so this could be a good source of ideas. 


### Waves

This one is based on averaging. There are 256 states (0-255, corresponding to the 256 levels of grey). This one also adds an additional wrinkle in that it requires the cell to not just know its current state and next state, but also its previous state. 

The first step of the update is to compute the average state of the neighborhood (not including the cell itself). Take the floor to make it an integer.

- If the average is 255, the state becomes 0
- If the average is 0, the state becomes 255
- Otherwise, the next state is equal to the current state + the average of the neighborhood - the previous state (with the value constrained to remain between 0 and 255)

This one is more sensitive to initial conditions and will require some tweaking. If you leave everything at 0, it will just strobe back and forth. 







## Getting Started


1. Click the GitHub classroom [link](https://classroom.github.com/a/oUgQnrtf)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)



## Requirements

- The code should implement a cellular automata. I expect to see cells with state and update rules based on the state's of the neighbors
- I would like to see some use of color. For some CAs, there is a range of state values that could be used directly. For the binary ones, you could add an extra variable that keeps track of the "age" the cell -- how long it has stayed in the same state. Or you could color based the current state _and_ the next state. 
- You should edit the `index.html` to add the name and the rules for your automat to the page.


## Thoughts

As with the reaction diffusion simulation, this one has the potential to be slow. Work in terms of "cells" and make it easy to vary the cell size. Frequently these look better with smaller cells, but you also want it to run at a reasonable rate. 

Once you have the basic structure in, making a second or third CA is as simple as switching out the update function. Feel free to experiment or even provide the option of switching between different CAs. 


## Reflection

I would like you to write a brief reflection in the README file. It should answer the following questions:

- Do you think it is complete?
- If not, what is left to go and how are you going to address it?
- What was the hardest part?
- What, if anything, have you gained by completing this challenge?


### Revisions

If you revise your submission, please add a _dated_ addition to your reflection that describes what has been changed. 



## Submitting 

When you are ready to submit, 
- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_

_Important: it is tempting to treat all of our deadlines as "loose" -- this is a dangerous path! Get **something** done by the deadline and submit. You can always go back to it, and you will get the benefit of my feedback. Just make sure that your reflection acknowledges that it isn't complete._