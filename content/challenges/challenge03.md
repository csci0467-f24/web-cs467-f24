---
title: "CS 467 - Challenge Three"
date: "2024-10-09"
due: "2024-10-18T23:59"
name: "Challenge 03"
published: true
---

#### Goals

- Demonstrate your understanding of space by experimenting in 3D
- Demonstrate your ability to use noise in creative ways

## Objective

For this challenge, I want to see what happens when you experiment with something new. You are going to try out working in 3D. At the heart of this piece, I would like you to use the equations for generating points on a sphere.

You are hopefully familiar with the equations for generating the points around a circle:

$$
x = R \times \cos(\theta)
$$

$$
y = R \times \sin(\theta)
$$

To get a circle, we iterate $\theta$ from $0$ to $2\pi$.

Generating a sphere is really just generating a lot of circles, so the equations quite similar. This time, however, we have _two_ angles.

$$
x = R \times \sin(\phi)\times \cos(\theta)
$$

$$
z = R  \times \sin(\phi) \times \sin(\theta)
$$

$$
y = R \times  \cos(\phi)
$$

One way to think about this is that we have stacks of circles around the $y$ axis. $\theta$ is used to sweep out the points on the circle parallel to the $XZ$ plane. $\phi$ provides the angle off of the plane. Note that $\sin(\phi)$ is used to attenuate the radii of the circles as they get farther from the origin. We only need $\phi$ to sweep from $0$ to $\pi$ (this makes sense if you think of the shape of the cosine curve as it goes from $0$ ($1$) to $\pi$ ($-1$)).

Here is a basic sphere. I've added coordinate axes to make it easier to see what is going on (X - red, Y - green, Z - blue).

![Rotating sphere](../images/challenges/challenge03/challenge03-sphere.gif)

This sphere should be the foundation of your piece (I expect to see the equation in your code -- not the `sphere` primitive). I would then like to see you use noise to make this your own.

You could permute the positions of the points, do interesting things with coloring, have things move around on the sphere, have multiple interacting spheres. I don't even need to be able to see the sphere itself -- you could put things at locations around where the sphere would be -- I just want those equations to be in there.

I also want to see some animation in this piece.

## Getting Started

1. Click the GitHub classroom [link](https://classroom.github.com/a/YEMD7C32)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Requirements

- The foundation of your piece should be the equations for the sphere
- 3D noise should be used in some aspect of the piece
- The piece should be animated in that change takes place over time

## Thoughts

This will be your first time working in 3D in this class. You can dive into the depths of this as far as you like. You can use the 3D primitives if you like (though, like I said, not as a replacement for generating the sphere yourself). You can look at the camera and lighting, etc... However, I will encourage you to hold off on that until you have the basics down.

In the starter sketch, I have made two small changes. First, we need to set the renderer to `WEBGL` - this is done in `createCanvas()`. The second thing I added a call to `orbitCamera()` in `draw()`. This is much easier than fussing around with the other camera controls. This will give you an interactive canvas -- you can drag the space around and scroll to zoom. The camera will just orbit around the origin. This is the quick and dirty way to get your view set up.

To draw things you have a couple of options.

- The primitives you know already still work, but they will only draw on the XY plane (though they can be transformed).
- There are a couple of 3D primitives. Note that they all draw around the origin.
- The most flexible option is to use `beginShape()` and just add a third argument to `vertex` for the Z axis.

## Reflection

I would like you to write a brief reflection in the `reflection.md`` file. It should answer the following questions:

What (if anything) did you struggle with?

- What (if anything) still is not complete?

- What questions (if any) do you have about this assignment?

- What do you feel like you understand better after having completed this?

### Revisions

If you revise your submission, please add a _dated_ addition to your reflection that describes what has been changed and resubmit it.

## Submitting

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5138997) ([submission directions](../resources/gradescope))

_Important: it is tempting to treat all of our deadlines as "loose" -- this is a dangerous path! Get **something** done by the deadline and submit. You can always go back to it, and you will get the benefit of my feedback. Just make sure that your reflection acknowledges that it isn't complete._
