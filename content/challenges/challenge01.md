---
title: "CS 467 - Challenge One"
date: "2024-09-11"
due: "2024-09-18T14:15"
name: "Challenge 01"
published: true
---


#### Goals

In this challenge, you should be able to demonstrate the following:

- You know enough git to clone a repository and submit your work
- You can create a basic sketch 
- You understand the basics of the p5.js coordinate system
- You can analyze a simple composition and reproduce it



## Objective

Your first challenge is to reproduce ["Composition A"](https://www.wikiart.org/en/piet-mondrian/composition-a-1923) by Piet Mondrian. 


![Composition A](../images/challenges/challenge01/composition-a-1923.jpg)


## Getting Started

We will be using git and GitHub this semester to manage your homework. If you are not familiar with git, I recommend that you spend a few minutes reading through the basic [introduction to git](../resources/git) document I wrote. If you have any questions, ask early and often.

You will need a GitHub account, so make sure you have one before you start.

1. Click the GitHub classroom [link](https://classroom.github.com/a/5ANT1Vy0)
1. You will probably need to associate your GitHub account with your name in my classroom's roster when you accept the assignment.
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the address of the repository)

### Developing

My recommendation is that you work locally using VSCode. There is nothing magic about VSCode, it is just a reasonable text editor with a couple of handy plugins. 

I find it helpful to open the whole folder in VSCode rather than individual files. This allows me to quickly switch between files and the integrated terminal opens in a sane location (with the working directory set to the folder).

One of the key advantages of using VSCode is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension which I recommend you install. It puts a little "Go Live" button in the footer of the window, and you can click it to start a web server rooted in your project's folder. 




## Requirements

- Your version should be as close to the above as possible. It will be tempting to create "inspired by" versions (it is not an unusual coding project itself, but not what we are doing). If you get inspired -- make a sketch. 
- Match the colors as best you can, though we have to acknowledge that Mondrian's is _painted_, so you have a combination of variations in the paint and lighting on the photograph to contend with. Try to get close though. 
- The **width** of the finished piece should be 800 pixels.

## Thoughts

- The mechanics of this are fairly straightforward -- you are going to draw a lot of rectangles. However, there are a _lot_ of rectangles and not many opportunities for abstraction and patterns to help speed things up. Take it slow and methodically. Find common edges that allow you to reuse numbers. 
- A ruler, onscreen, or held up to the screen, will help. Making a drawing on an actual piece of paper can help you keep all of the numbers straight. 


## Reflection

I would like you to write a brief reflection in the `reflection.md` file. It should answer the following questions:

- Do you think it is complete?
- If not, what is left to go and how are you going to address it?
- What was the hardest part?
- What, if anything, have you gained by completing this challenge?
- What questions (if any) do you have about this assignment?


### Revisions

If you revise your submission, please add a _dated_ addition to your reflection that describes what has been changed. 



## Submitting 

When you are ready to submit, 
- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_

_Important: it is tempting to treat all of our deadlines as "loose" -- this is a dangerous path! Get **something** done by the deadline and submit. You can always go back to it, and you will get the benefit of my feedback. Just make sure that your reflection acknowledges that it isn't complete._