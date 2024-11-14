---
title: "CS 467 - Lecture 14"
date: "2024-10-23"
name: "Lecture 14"
published: true
---

After our brief digression into the world of audio, I want to return again to simulation.

In particular, an avenue opened up by the particle system. One of the things that is really interesting about the particle system is that it is a complex system that is made up of a lot of small simple things that are all doing their own thing in response to the environment around them. When they combined together to make smoke, that was a form of _emergent_ behavior.

We say that something is emergent when it appears to have properties that are "more than the sum of its parts"

We are going to explore this idea a little more deeply. First we will generalize our complex system

- the system will be made up of simple entities with limited relationships between them
- the entities operate in parallel
- the system as a whole will (we hope) display emergent properties

Our particle system largely fits this description. In our case the particles had _no_ relationship between them, but it is not uncommon to have attraction or repulsion forces between the particles.

We might say that the entities in such a system are acting _autonomously_.

# Cellular automata

Today we are going to shift from physics to biology (sort of), and we are going to look at cellular automata (CA), which some of you may have encountered before.

The cellular automata were developed by John von Neumann (yes, that von Neumann), Stanisslav Ulam and Konrad Zuse in the 1950s as a way to study reproduction and growth
We can think of them as a pure distillation of the process with all of the messy parts of biology and chemistry factored out

As with our physical simulations, this is another tool conscripted by artists but designed with other uses in mind. They are used for serious research in biology, computer science, math, ecology, and economics

Why are we talking about them?

- They are another tool in our computational tool bag for exploring complexity
- They produce seemingly natural patterns which we respond to aesthetically
- They are also interesting conceptually as well
- They allow us to explore and say things about life in our work

## CA basics

**Basic structure**

- an N-dimensional grid of cells
- each cell has a state
- the cell is in a neighborhood of adjacent cells
- there is a set of transition rules by which a cell determines its next state given the state of the cells in its neighborhood
- updates are done concurrently and atomically
  - calculate the next state of all cells based on the current state of their neighbors
  - update the current state of all cells based on the next state
  - no cell advances its state until _all_ cells have completed their next step calculation

**Design choices**

- state is from a finite set (typical) or continuous?
- what constitutes a "neighborhood"?
- shape (square, triangle, hexagon)
- how to treat edges

**Neighborhoods**

- von Neumann neighborhoods - four neighbors, N, S, E, and W
- Moore neighborhoods - 8 neighbors NW, N, NE, W, E, SW, S, SE

**Edge handling**
If we are doing computations based on the neighborhood, it is problematic if the neighborhood is partial

- leave edges stable and don't update them
- reduce the neighborhood appropriately
- wrap to make a ring or a torus

## The Game of Life

The most famous CA is Conway's Game of Life.

**Design**

- square grid
- binary state
- Moore neighborhoods

**Rules**

- any live cell with fewer than two live neighbors dies (underpopulation or loneliness)
- any live cell with more than three neighbors dies (overpopulation)
- any dead cell with exactly three neighbors comes to life (reproduction)

Everything that happens in the simulation is based on the initial seed state

What is really interesting is that this rapidly produces emergent patterns that look like coordination between cells

- stable shapes that are totally stable
- oscillators that cycle through a collection of states, but are stable
- spaceships that oscillate through a collection of forms, but are mobile
- glider gun, which can produce gliders

What is crazy is that it is Turning Complete. You can build patterns that operate as basic gates, so you can put them together to execute any arbitrary instruction.

example: https://life.calgui.io/
