---
title: "CS 467 - Tutorial Four"
date: "2023-03-09"
due: "2023-03-28T14:15"
name: "Tutorial 04"
published: false
---




#### Goals

- Learn how to do a random walk
- Learn about p5.Vector and associated operations
- Learn how to use blur to make things glow




## Prerequisites


1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/u3Ay1ffp). 
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)



## Task

In this tutorial, you are going to write a basic random walk, and then modify it to achieve something like this (it is dynamic, so a still image doesn't quite capture it):

![Tutorial 04 Goal](./tutorial04/tutorial04-goal.png)

*Links to the references for the included functions can be found at the bottom.*



### Part 1: Write a basic random walk

The `draw()` function for our basic random walk has only a few basic duties.
- generate a new random offset (which should be fairly small)
- create a new point by adding the offset to the previously saved position
- draw a line from the previous point to the new point
- save the new point for next time

To make our lives easier, we are going to make use of p5.js' Vector tools.

At their simplest, you can think of the Vector as being a data type with `x`, `y`, and possibly `z` properties (for work in 3D). I will sometimes use these as a convenient package to hold position data. 

However, they have some nice tricks up their sleeves. We can really treat them like Euclidean vectors that you may have encountered in physics or math class. 

They support basic math: `add`, `sub`, `mult`, and `div`

As well as some vector specific functions: `dot`, `cross`, `normalize`, `dist`

I encourage you to read through the reference for the full set of functions. 

We are going to use them as a combination of points and vectors (mathematicians can look away now).


Start by creating a new global variable called `pos`.

In `setup()`, initialize the position to the center of the canvas using `createVector(x,y)`, which is our primary function for creating a new vector.

In `draw()`, you are going to generate a new point and draw a line to it. 

To generate the random offset, you can use `p5.Vector.random2D()`, which will generate a new vector that is pointing in some random direction. While we _could_ just use `random()` to generate two random offsets, using `random2D()` will give us a random direction but with a unit magnitude, so the point will always move the same _distance_ just in different _directions_. 

 To adjust the magnitude of the offset vector, use the vector's `mult()` function, which will allow you to scale the vector by a scalar value (i.e., multiply both components by the input value).

Create a new point by adding the offset vector to `pos`.

**Important note**: There are two ways to do math with p5.js' vectors. Given two vectors `v1` and `v2`, we can add them together with the object method `v1.add(v2)`. This will do component-wise addition, and *update `v1` with the result*. There are also static versions of the functions available on `p5.Vector`. These return a _new_ vector and leave the originals alone. So, you would write `const v3 = p5.Vector.add(v1, v2)`. In the above, you can do the object method for the `mult()` (we aren't going to have a use for the unit vector), but you should use the static version for the addition since you still need the original point to draw the line.

Draw the line between the two points. 

Save the new point as `pos`.

So we can see the movement, make sure to call `background` in the `setup()` function instead of the `draw()` function.

You should now have a random walk drawing.

### Part 2: Make it shine

The random walk is already somewhat interesting in and of its own right, but we are going to spice it up and learn some new tricks along the way. 

In computer graphics, when we draw things that are supposed to be light sources, they can look dull and flat, even if they are pure (255,255,255). This is because we are used to it being hard to look at bright things, and they make their surroundings glow. For example, if you look at a light bulb that is switched on, it is difficult to see its edges clearly. If we draw that with crisp lines, it just looks like white paint, not like an emissive surface.

An old technique in graphics is to add some blur around things that should glow. This is usually done as a three step process. First, draw the light source. Then add blur to fuzz it up. Finally, draw the light source again on top. This gives it the appearance of having crisp edges, while still spilling out over its surroundings (all without having to do costly lighting calculations).

We are going to do a variant of this to make our random walker into a little comet or spark.

First, switch the background to black and the stroke to some bright color like yellow or orange. 

Next, set the stroke weight to something thick (try 5). This will give us a good base to blur. 

Draw the line.

Now, blur the canvas. We can do this with the `filter` method. The `filter()` method performs pixel level operations on the entire canvas. In this case, call `filter(BLUR, 2)`. This says to apply the blurring operation to the entire canvas with a blur radius of 2.

The next step is to set the stroke weight back to 1 and draw the same line again.

It is important to get this order right: draw fat line, blur, draw skinny line. This gives us a nice crisp line with a halo around it. If the halo doesn't fade you probably put the blur first. If you don't see a central bright core, then you put the blur after the second line.

An interesting facet of this is that because we are blurring the whole canvas, the old segments of the trail will slowly fade away over time as the blur diffuses them. 

Test this out and tune the parameters (stroke weight, blur amount, offset magnitude, etc) to your aesthetic taste. 

I suggest committing your changes to git at this point.

### Part 3: Give it some friends

To get the effect I showed above, you need to add more walkers. You have done all of the hard work, this is just about repetition.

Replace the `pos` variable with an array called `creatures`, and give yourself a constant `NUM_CREATURES` that controls the number of walkers (there are 100 in the image above, but start small).

In `setup()`, load up the array with the appropriate number of creatures. You can represent each create as an object with a color, a position, and a next (this will allow us to color the creatures individually). For those of you new to JavaScript, we can make literal objects that look like dictionaries in Python (e.g., `{color:'yellow', position: createVector(width/2, height/2), next:null}`). Syntax-wise, the only real difference is that the keys aren't strings.

In the example object, I set the color to 'yellow', but I recommend randomizing it. To get the look in the picture, I set the color mode to HSB and limited the hue to a band where the yellow and oranges are (roughly 20-60 degrees).

The tricky part is updating the `draw` function. You need at least two different loops. The first loop should visit each creature, generate the next position, and draw the fat line. 

Then you blur the canvas. 

Finally you do a second loop to draw the second line and update the position. We need that `next` property on the objects so we can save all of those secondary points across the two loops. If we tried to do this with one loop, the first creature drawn would be completely blurred out by the time we drew the last one. 

Try it out. Adjust the color and number of creatures to your liking. 

### Part 4: Wrapping up


In this form, it looks pretty cool, and it will be a dynamic form for some time. Eventually, however, the walkers will walk offscreen. Sometimes they will come back. If you wait long enough, they will eventually all disappear. This is a phenomenon called the "gambler's ruin" (A gambler with a finite amount of money will eventually lose everything when playing a fair game against a house with infinite funds -- gambling is a different kind of random walk). 

To address this, there are a variety of things you could do. You could wrap the canvas, so walking off one side causes it to appear on the other. Or you could detect when they have crossed the boundary and reset them to the middle. Or you could simply forbid them to leave. Any of these approaches would keep all of the little wriggling things on the screen for the duration of the run. Try one of them.


## Finishing up

Commit your changes to git and push them back up to GitHub. I will find them there.

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/#/p5/background)  
[colorMode](https://p5js.org/reference/#/p5/colorMode)  
[createCanvas](https://p5js.org/reference/#/p5/createCanvas)  
[createVector](https://p5js.org/reference/#/p5/createVector)  
[filter](https://p5js.org/reference/#/p5/filter)  
[line](https://p5js.org/reference/#/p5/line)  
[random](https://p5js.org/reference/#/p5/random)  
[stroke](https://p5js.org/reference/#/p5/stroke)  
[strokeWeight](https://p5js.org/reference/#/p5/strokeWeight)   
[p5.Vector](https://p5js.org/reference/#/p5.Vector)  
