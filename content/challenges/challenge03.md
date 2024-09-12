---
title: "CS 467 - Challenge Three"
date: "2023-02-28"
due: "2023-03-07T14:15"
name: "Challenge 03"
published: false
---


#### Goals
- Demonstrate an understanding of the `image` function
- Demonstrate your understanding of tiling and repetition
- Think about aspect ratios
- Learn more about mouse interaction



## Objective

Your goal for this challenge is to create a tool for creating tiled mosaics from images. The user will load an image into your tool and select a patch from the image. You will then display a tiling made from that patch.

Here is an example:

![image tiling tool](../images/challenges/challenge03/challenge03_target.png)


## Getting Started


1. Click the GitHub classroom [link](https://classroom.github.com/a/zUWq-UEy)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)



## Requirements

- There should be a tool that allows the user to load their own picture
- The user's picture should be displayed in the right half of the canvas
- The user's picture should be resized to maximally fit the right half of the canvas (in other words, it should be as large as it can be while still fitting within the right half of the canvas)
- The user's picture should be centered within the right half of the canvas
- The user should be able to draw a selection rectangle over the picture
- The selection rectangle should stop at the bounds of the image (i.e., even if the user tries to drag beyond the image bounds, the rectangle will stop)
- When the user has made a selection, the selected patch should be used to tile the left side of the canvas
- The tiles should be a fixed size squares -- if the patch has a different aspect ratio, let the distortion happen



## Thoughts

There is not a lot more here than you have done before in different forms.  I suggest taking this one requirement at a time. Figure out all of the image positioning before you dive into the mouse and tiling. 

An important tool for figuring out how to resize the image is the _aspect ratio_, which we can define as the width divided by the height. Think about the relationship between the aspect ratio of the image and the aspect ratio of the space in which it will be displayed. 

In the example image, you will see I used a gray background -- this helps when you are centering the image. Without it, it is difficult to tell where the edge of the canvas is.

For keeping track of the selection rectangle, you will want to check out `mousePressed()` and `mouseDragged().`

The `min` and `max` functions are your friends. 


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