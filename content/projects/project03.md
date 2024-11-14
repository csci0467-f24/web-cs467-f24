---
title: "CS 467 - Project Three: Advanced Techniques"
date: "2024-10-30"
due: ["2024-11-11T14:15", "2024-11-13T14:15"]
deliverables: ["Project 03 draft", "Project 03"]
name: "Project 03"
published: true
---

## Objective

For your third project, we will see how much you have learned about absorbing new techniques and turning them into something interesting. Your task will be to learn some new technique not covered in class and implement something novel using it.

\__Note: We will be critiquing drafts at the one week point. Make sure you have something ready to show._

## Getting Started

1. Click the GitHub classroom [link](https://classroom.github.com/a/EjdKcPEz)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Details

Once again, the content of the piece is up to you, but it must be centered on a technique that you have learned from outside of class.

Here are some techniques that I think could lead to interesting pieces:

- differential growth
- slime mold simulation
- wave function collapse
- metaballs
- Mandelbulbs
- phyllotaxis
- iterated function systems

If you want to explore something not on this list, please consult with me before you begin.

Start by looking around for descriptions and tutorials. The Coding Train covers many of these. Use the resources you find to develop a basic working model. Make sure to keep track of and credit any code that you are copying from tutorials.

I will be looking for evidence that you have taken your chosen technique and made something that was uniquely yours with it. This should involve slightly more than the "change the color" or "add a slider" that I've seen on challenges when I asked for creative additions or extensions.

Along those lines, I would prefer not to see much in the way of user controls. I want you to take ownership over your pieces and create something that reflects what you want to look at rather than a tool for others to explore. That isn't to say user interaction is banned. If the interaction is in some way intrinsic to _experiencing_ the piece, I'm all for it. This could be things like responding to things on the camera or the microphone, or controls for exploring, like on the Mandelbrot viewer I showed in class. I just don't want to see design decisions left to the user like you are designing a tool.

I will expect at least one element that is from the class to play a role in the piece. It could be conceptual (e.g., repetition), a technique (e.g., using noise), or technical (e.g., shaders, audio reactive). This should be something you are adding -- not something intrinsic to the technique (don't implement an IFS and tell me you are using repetition).

### Requirements

- implements some new technique (either from the list above or with consultation with me)
- implementation is correct
- should incorporate one other thing that you have learned class
- a non-trivial creative addition that makes the piece your own
- appropriate documentation (described below)

## Documentation and Reflection

In the README file, I would like a description of which technique you are exploring, and how you are using it. Describe the component that comes from the class that you have added. You should also include a full list of your references and parts of your projects can be attributed to them.

In the `reflection.md` file, I would like you to write a reflection.

- What (if anything) still is not complete?
- If it is not complete, what is left and how are you going to address it?
- What (if anything) did you struggle with?
- What, if anything, have you gained by completing this project?

### Revisions

If you revise your submission, please add a _dated_ addition to your reflection that describes what has been changed.

## Submitting

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5246813) ([submission directions](../resources/gradescope))

_Important: it is tempting to treat all of our deadlines as "loose" -- this is a dangerous path! Get **something** done by the deadline and submit. You can always go back to it, and you will get the benefit of my feedback. Just make sure that your reflection acknowledges that it isn't complete._
