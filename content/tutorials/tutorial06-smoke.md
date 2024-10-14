---
title: "CS 467 - Tutorial Six"
date: "2024-10-16"
due: "2024-10-21T14:15"
name: "Tutorial 06"
published: true
---

#### Goals

- Learn about particle systems
- Use particles and transparency to implement a smoke effect

## Prerequisites

1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/_Kq5CIBI).
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Assignment

In this tutorial, you are going to implement a particle system ultimately making a smoke effect.

![Practical 6 Goal](./tutorial06/tutorial06.png)

_Links to the references for the included functions can be found at the bottom._

### Part 1: Emit particles

I've given you the code that is based on the physics system we've been working with. I've simplified it a little bit, but the structure is the same. There are two main differences:

- our particles are going to be massless, so I've removed mass from our object (now called 'Particle')
- rather than try to manage a whole collection of particles in the `draw()` method, we now have a new class called `Emitter` to manage them

The first thing you are going to do is emit particles from the `Emitter`.

Find the `run()` method in the `Emitter`, and locate the comment that says where to add particles.

Create a new particle in the same location as the emitter.

Add the particle to the emitter's `particles` array.

We want the particle to move away from the emitter, so apply a force to it with random directions (in the range of -1 to 1 for each component).

**READ BEFORE YOU RUN**

_As you have hopefully noticed (because you read through all of the code), typing 'p' will pause the animation. You will want to use this shortly after you let the above code run._

_The code currently adds new particles to the system without end. If you just let it run, you will notice that the simulation starts to slow down. A little longer and the browser will start becoming unresponsive as you consume more and more memory. You don't want that. Just let it run for a moment to see what it does and then pause it until you have done the next bit._

### Part 2: Age your particles

For most particle effects it makes sense for the particles to expire after a period. Either they have left the viewable area, or whatever they are emulating is short-lived.

In the constructor of `Particle`, add a `life` property. Set this to be 255.

In the `update()` method, decrement `this.life`.

In the `draw()` method, use the `setAlpha()` method on colors to set the alpha value of `this.color` to be `this.life` before it is used to set the fill color.

When you run it now, the particles will fade out, but we they are still there consuming resources. What we want to to do is remove all of the expired particles from the emitter's array. To do that, we are going to make use of the [`filter` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) built into JavaScript Arrays. The `filter` function accepts a function that evaluates a single item and returns a truthy or a falsy value. `filter()` then returns a new Array that only contains the values that passed the test. So we can do something like this:

```javascript
this.particles = this.particles.filter((p) => p.life > 0);
```

Now you can let the system run and it won't kill your browser.

### Part 3: Add an upward force

Our goal is for our particles to resemble something like smoke. Since we usually see smoke rising because it is warmer than the surrounding air, we will add a force that makes our particles want to move upward. This is basically the inverse of gravity.

Iterate over all of the particles and apply a force in the upwards direction. Experiment a little bit with the strength. We want the particles to drift upward, not look like they are coming out of a garden hose.

You can set the Y component of the initial force to zero now. You can also tighten the X component down to -0.2 to 0.2 now to make the stream of particles more concentrated.

### Part 4: Add a repulsive force

We are now going to add a repulser and tie it to the mouse location. This will make the particles flee the mouse.

In class, I showed you an equation for attraction: $F = \frac{G}{||v||^2}\hat{v}$

- $G$ is the attraction strength.

- $v$ is the vector to the attractor from the attracted object.

- $||v||^2$ is the square of the distance between the particle and the attractor. This is just the magnitude of the vector $v$. Fortunately vectors have a handy function, `magSq`, which computes this for us.

A repulsing force works exactly the same way, we just reverse the sign.

You are going to add the repulser into the `run()` method after the rising force.

Start by making a vector to hold the mouse position.

Create a new variable called `G`. This is your gravitational constant. Set it to 2 for the time being. You can adjust it later.

Then iterate over the particles. For each particle, create a new vector by subtracting the mouse vector from your particle's position. Make sure you use the class method (`p5.Vector.sub()`) so you don't move the mouse or the particle.

Get the magnitude squared of that vector. Use `max()` to limit this value to be no less than 50.

_Why constrain this value? Because of the granularity of the time steps in our simulation, we can get our repulser much closer to the particle than we could in the physical world, so the magnitude of the resulting force can be huge, rocketing our particles away at high speed._

Create a new variable called `strength`. Set this to your gravitational constant divided by the magnitude squared.

Normalize the vector.

Multiply the normalized vector by `strength`.

This is your force. Apply it to the particle.

You should now be able to affect the flow of particles by getting the mouse near it. Try different strengths. Negative strengths turn the repulser into an attractor.

### Part 5: Texturing

At this point we have something that is starting to be a little smoke-like, especially when we move the mouse through the stream. However, there is no getting away from the fact that we still have little circles.

A very common technique is to replace our basic shapes with images, or _sprites_. In this case, we are going to use a blurred circle that looks like a little ball of cotton. More to the point, we will make one.

#### Switching to the sprite

Add this function your code:

```javascript
function createSprite() {
  sprite = createGraphics(50, 50);
  sprite.clear();
  sprite.ellipseMode(CENTER);
  sprite.noStroke();
  sprite.fill(255);
  sprite.circle(sprite.width / 2, sprite.height / 2, sprite.width / 2);

  return sprite;
}
```

As you can see, this creates an offscreen graphics context and loads it with a circle. We are going to substitute this in for the Particle's current circle . Once we know that it works, then we can make it more smoke-like.

Create a new global variable called `sprite`, and use `createSprite` to set it in the `setup` function. You can test it by adding `image(sprite, 0,0);` to the `draw` function. it should display in the upper left now.

If it is working, then you are ready to swap it out for the circle being drawing in the `Particle.draw` method. Comment out all of the code in `Particle.draw`. Replace it with a line that draws the sprite at the particle's location. Recall that `image` allows us to resize images when we place them. Adjust the size to the particle's size.

Once you have done this, your particles will just look a little bigger, and they won't fade away any more. They will look like they hit an invisible wall and just vanish. Increase the `age` to 500 so the particles mostly make it off screen before vanishing.

#### Using transparency

We can make this look better by changing the `fill` in `createSprite` to set the transparency down to 10.

A transparency of 10 makes the particles barely visible except where they stack. This already is looking smokier. However, we can still see circles in the smoke.

We will fix this by adjusting our sprite. Instead of making a solid circle, we will have the color fade off from the center.

Comment out the code that draws the circle in your sprite.

Iterate over every pixel in the graphics context and draw a `point` that is colored based on the distance from the center. All of the points should be white, but the alpha value should range from 0 to 20 based on the distance from the center. Note that you will probably not be able to see white points with an alpha value of 20 on a black background. We are counting on multiple particles layering on top of one another to form our smoke.

Use the `dist` function to find the distance between each point and the center of the context. Then use `map` to determine the right alpha value. The distance will range from 0 (at the center) to about 1/2 of the width of the context. You want to map this to 20 when the dist is zero and 0 when the distance reaches 1/2 of the width.

Use this value to set the stroke, and then draw a single point at the pixel location you just examined.

### Part 6: Play

There are a lot of control knobs you can tweak in your simulation:

- the size of the sprite
- the max opacity
- the initial force applied to the sprites
- the strength of the other forces
- the rate particles are created (throw a `for` loop around the lines creating the new particle and see what happens when you produce more at a time)
- area of the emitter (add a little bit of random variance to the location the smoke comes from)

I encourage you to try some different values and see how they affect the effect.

### (Optional) make some noise

If you really want to improve this effect, you can get some noise involved.

There are two places you can add noise.

The first place is in the creation of the sprite. Create a noise value based on the position and multiply your alpha value by it. You will probably want to increase the max alpha value.

This can cause some artifacts if you look too closely because the new shape has some uniqueness. You can combat this by generating a collection of different sprites (10ish) and storing them in an array. To make the sprites unique, yuo will need to add a third component to your noise function, but you can just use `random` -- there doesn't have to be any coherence between them. In your particles, add a new `sprite` property and load it with a a random sprite form the list. When you draw, make sure to draw with the particle's sprite.

A second place you can add some noise to your sketch is by adding turbulence -- basically modeling air currents. This would work like the ants. Generate some noise based on the particles direction and use this to generate a direction (I found it best to map the noise to a value between 0 and $\pi$ so it doesn't try to go down). Use the `frameCount` for the third argument to noise so that you don't get consistent trails. Apply a small force in this direction.

## Finishing up

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5158169) ([submission directions](../resources/gradescope))

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/p5/background)  
[clear](https://p5js.org/reference/p5/clear)  
[constrain](https://p5js.org/reference/p5/constrain)  
[createCanvas](https://p5js.org/reference/p5/createCanvas)  
[createVector](https://p5js.org/reference/p5/createVector)  
[dist](https://p5js.org/reference/p5/dist)  
[div](https://p5js.org/reference/p5.Vector/div)  
[fromAngle](https://p5js.org/reference/p5.Vector/fromAngle)  
[magSq](https://p5js.org/reference/p5.Vector/magSq)  
[map](https://p5js.org/reference/p5/map)  
[mult](https://p5js.org/reference/p5.Vector/mult)  
[noise](https://p5js.org/reference/p5/noise)  
[normalize](https://p5js.org/reference/p5.Vector/normalize)  
[p5.Vector](https://p5js.org/reference/p5.Vector)  
[point](https://p5js.org/reference/p5/point)  
[radians](https://p5js.org/reference/p5/radians)  
[random](https://p5js.org/reference/p5/random)  
[stroke](https://p5js.org/reference/p5/stroke)  
[sub](https://p5js.org/reference/p5.Vector/sub)
