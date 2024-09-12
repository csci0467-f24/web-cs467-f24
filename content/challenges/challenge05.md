---
title: "CS 467 - Challenge Five"
date: "2023-04-25"
due: "2023-05-02T14:15"
name: "Challenge 05"
published: false
---

#### Goals

- Use what you know about agent modelling to create an ant painting



## Objective

![Challenge 5 example](./challenge05-resources/challenge05-example.png)

In this challenge, you will do a little ant painting. The inspiration for these ants is a description in `Artificial Art Made with Artificial Ants` by Monmarché et al. (here is the original [paper](https://middlebury.instructure.com/courses/12426/files?preview=2236359), if you care to read it -- we are focusing on the description in section 11.4).

Our ants are fairly simple beings. They wander around, leaving a color trail behind them (a pheromone trail, if you like). In addition to leaving a trail behind them, they are on the lookout for other pheromone trails, and if they see one of a color they don't like they will sometimes stop their random wander and follow the rival trail, covering it up. By tinkering with the probabilities that they will consume other trails or turn, ywe can observe a number of different patterns.

More specifically, you will provide each ant with five different tunable parameters:

- `paintColor` The color deposited by the ant as it moves around
- `rivalColor` The color the ant is looking to cover
- `aggression` The probability that the ant will follow a rival color trail
- `leftProb` The probability that it will turn left (a value between 0-1)
- `rightProb` The probability that it will turn right (a value between 0-1)

At every time step, the ant will:
- Check the neighborhood for the presence of rival pheromone trails. If it finds one, based on its `aggression` setting it will opt to follow it or not.
- If no pheromone trails are found, the ant will stochastically decide which direction it wants to go next: straight ahead, left or right. *A property of the original ants was that right or left could be along the diagonals or a full 90 degree turn. You can stick to 90 degree turns.*
- Advance forward one step.
- Paint its locale with its pheromone.


## Getting Started


1. Click the GitHub classroom [link](https://classroom.github.com/a/BC-Q-AM8)
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)




## Requirements

- There is a collection of ants wandering around the canvas
- There are at least two different pheromone trail colors
- All ants have a rival color that they are looking to cover up
- The ants use `leftProb` and `rightProb` to determine where they are headed
- Ants check their surroundings and follow rival colors based on their `aggression` 
- If there are several pheromone trails available, the ant should choose one at random (rather than picking the first one it sees)
- The canvas should wrap. Ants should continue across the edges and you should check around the edges for rival trails.

## Thoughts

- The behavior here is pretty simple and we are not as worried about update cascade effects. So you don't need to follow the "update all, then draw all" pattern. It is okay to carry out the algorithm above including the coloring in the Ant's `update` function.

- You don't need that many ants to get interesting effects. The above was done with eight ants (and a bit of time).

- I provided a `colorMatch` function that will allow you to check the similarity of two colors. This is a little bit of overkill since it is looking at the luminance difference instead of the raw color values, but this version will allow you to add effects like blur to the lines and still detect the rival. 

- After you get the basics put in place, I hope that you play with this a little bit. Add some ants with different colors. Tinker with strategies. Who will dominate? Ants who do long runs and turn infrequently, or ants that like tight circles? What happens when the `aggression` is turned up to 1? or turned down low? The different behaviors you specify will lead to different end results.

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