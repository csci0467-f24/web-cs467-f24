---
title: "CS 467 - Project Two: Hidden Forces"
date: "2023-03-30"
due: "2023-04-11T14:15"
name: "Project 02"
published: false
---


## Objective

For your second project, I would like you to represent the trails left by the hidden forces of the world.  

The inspiration for this project is the picture below. After a fresh snowfall one morning, I was caught by this wonderful pattern in the snow. It took me a moment to realize that I was seeing a visualization of sorts of the wind blowing the leaf around on top of the snow. 

![Tracks in the snow](./project02/inspiration.jpg)

This is what I want you to make -- a piece that we can interpret as the imprint of your physical system on its environment. It could be fairly literal, like the imprints of the elements of the system in the snow or traces left behind, or it could be more conceptual, like using the attributes of elements of the system (position, velocity, etc) as inputs to a new system, or visualizing the interconnections of the system. It is not required that the viewer be able to tell what the underlying system is doing. However, when viewing the underlying system there should be a moment of "oh, *that's* what is going on". 


The core of this assignment will be to create a physical simulation based on the system we created in class (or at least one in the same vein). The twist is that I would like to see two different views of the system. The first view should be a literal representation of what is being simulated. 

The second should hide all of the elements of the physical system and just show us the "foot prints". 


Requirements:
- The underlying system should be based on a collection of entities simulating some physical process.
- The literal view should provide a clear view of the mechanics of the system. It should be fairly obvious which forces are at work in the system and how the universe works. 
- The conceptual view should be linked to the underlying physical simulation (though as stated above, the nature of that linkage does not need to be obvious from only viewing the conceptual view). The conceptual view can be dynamic or static (e.g., you could run the simulation out a couple of steps, to produce a static pattern like the leaf, or you could let patterns continue to evolve over time). 
- If the system is dynamic, it is okay for it to eventually become unaesthetic (imaging the leaf rolling over this snow repeatedly until everything was just churned up), **provided** you provide a mechanism (such as a key press) that allows the user to clear the view and start over.
- When the user types 'v', the view should switch between literal and conceptual views. If the conceptual view is static, switching to the literal view should restart the system.



## Getting Started


1. Click the GitHub classroom [link](https://classroom.github.com/a/HcQJUEog)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Details

The starting place should be the rudimentary physics engine that I developed for you in class. However you are encouraged to incorporate other physical forces that we didn't talk about (e.g., springs collisions, etc...). You are also welcome to incorporate a more complete physics engine such as [Matter.js](https://brm.io/matter-js/) (though I will warn you that if you haven't done much more JavaScript than we have done in class, then this could be a bit challenging)


## Reflection

I would like you to write a brief reflection in the README file. 

The second section is where I would like you to answer the following questions:

- Do you think it is complete?
- If not, what is left to go and how are you going to address it?
- What was the hardest part?
- What, if anything, have you gained by completing this project?


### Revisions

If you revise your submission, please add a _dated_ addition to your reflection that describes what has been changed. 



## Submitting 

When you are ready to submit, 
- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_

_Important: it is tempting to treat all of our deadlines as "loose" -- this is a dangerous path! Get **something** done by the deadline and submit. You can always go back to it, and you will get the benefit of my feedback. Just make sure that your reflection acknowledges that it isn't complete._
