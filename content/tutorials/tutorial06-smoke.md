---
title: "CS 467 - Tutorial Six"
date: "2023-03-30"
due: "2023-04-06T14:15"
name: "Tutorial 06"
published: false
---




#### Goals

- Learn about particle systems
- Use particles and transparency to implement a smoke effect




## Prerequisites


1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/_6F5MEo2). 
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Assignment

In this tutorial, you are going to implement a particle system and implement a simple smoke effect.

![Practical 6 Goal](./tutorial06/tutorial06.png)

*Links to the references for the included functions can be found at the bottom.*



### Part 1: Emit particles

I've given you the code that is based on the physics system we've been working with. I've simplified it a little bit, but the structure is the same. 

The first thing you are going to do is emit particles from the `ParticleSystem`. 

The system should emit particles every time its `update()` function is called. Think of it like a fountain -- it is just continuously spewing out particles. 

Implement this by adding in a `for` at the top of `update()`. It only needs to run somewhere between 5-20 times. Inside of the loop, 

- Create a new particle object
- Set the position of the particle to the position of the emitter (the `ParticleSystem`). To set the position, set the `x` and `y` component sof the particle's `position` property directly. We want to reduce unnecessary object creation to keep performance up.
- Push the particle onto `this.particles` so the system can keep track of it


We want to give the particle a bit of a push, so let's apply a force to it. We are going to fire the particles upward in a narrow cone. You can adjust the spread of the cone by adjusting the random values below (note also that the particle is called `p`):

```javascript
const angle = random(245, 295);
const f = p5.Vector.fromAngle(radians(angle), random(1,3));
p.applyForce(f);
```

**DON'T RUN THIS YET**

Currently, the system will grow without bound. Wrap your `for` loop in an `if` statement and stop emitting if the length of `this.particles` exceeds 1000.

Now run it. You should see a spray of particles that cuts off after a moment. In truth, you probably see a collection of snakes or hair. Call `background` to clear the scene in `draw()` (I left it this way so you could see another effect).

### Part 2: Age your particles

We would like the emitter to stream continuously, and obviously at a certain point we can't see the particles any more. We are going to give each particle a life. 

In the constructor of `Particle`, add a `life` property. Set this to be a random number between 50 and 200. We randomize this so we don't see waves of particles all being born and dying together. 

In the `update()` function, decrement `this.life`. 

In draw, add a call to `fill` that sets the transparency based on `this.life`, so the particle will fade away as it ages. 

Update `update` and `draw` so they only run on particles that have a lifetime that is over 0. 

If you run now, the brief spray or particles will fade out after a moment.

#### Tricky bit: Create a pool of dead particles

Add a `pool` property to the `ParticleSystem` and set it to be an empty array. This is where we will store particles that are expired. We won't remove them from the main list, since they are already being skipped, but we need to know which ones we can reuse.

In the `update` function of `ParticleSystem`, add a line immediately after running the particle's `update` that pushes the particle into the pool if it has 'died' (its life has dropped to zero). 

Now, in the `for` loop creating the new particles, before you create a new `Particle`, check if the `pool` is empty. if it is, then create the particle and push it on `this.particles`. If it isn't, pop the last one off, reset its life and multiply its velocity by 0 (to clear its old velocity out). After this point, you will do the same thing to the particle, regardless if it is new or "reborn" (i.e., set is position, pick an angle, and fire it off). 

Remove the guard that limited `this.particles` to 1000 and run it again. You should now see a continuous stream of particles. 

### Part 3: Add gravity

In `setup`, add this after you have created the system:

```javascript
  system.addForce({
    name: "gravity",
    base: createVector(0, 0.1),
    applyTo(p) {
      p.applyForce(this.base);
    },
  });
```

This is just the simple form of gravity that we saw earlier. Note that we have retained the `applyTo` function, but now it doesn't really do much. We got rid of mass, so the force doesn't need to do anything different based on the object it is being applied to. 

Go ahead and run this again -- you should see something that looks a little more like an actual fountain. 

### Part 4: Add an Attractor

We are now going to add an attractor and tie it to the mouse location. 

Create a new class called `Attractor`. Its constructor should take a single value: the strength. Inside the constructor, save the strength as a property and add a second property called `position`, and set it to the vector (0,0). 

Write a second method for the class called `applyTo(particle)` -- this will apply the force to the particle. As I showed you on the board, this force should be

$F = \frac{G}{||v||^2}\hat{v}$

$G$ is the strength of the attractor.

$v$ is the vector from the particle to the attractor. You get this by subtracting the position of the particle from the attractor's position. Use the static form so you don't accidentally move the attractor. 

$||v||^2$ is the square of the distance between the particle and the attractor. This is just the magnitude of the vector $v$. Fortunately vectors have a handy function, `magSq`, which computes this for us.

Compute $\frac{G}{||v||^2}$. This is the _magnitude_ of the force, so call it `magnitude`. Note that this is a scalar value, not a vector.

We want to exercise some caution here, however. As the distance between the particle and the attractor shrink, $||v||^2$ will approach zero, creating an enormous force. Worse, we will eventually have a zero in the denominator and it will fail. To alleviate this, we will artificially constrain the distance value. We will say that the distance is at least 25 and at most `width` (at which point the impact of the attractor on the particle should be too small to matter anyway). You will find that we have a function `constrain(value, min, max)` that will handle this for you.

$\hat{v}$ is direction of the vector (or the unit direction). We get this by normalizing the vector with the `normalize` function.

To summarize, 
- find the vector between the particle and the attractor
- calculate the square of the magnitude of the vector and constraint it between 25 and `width` .
- divide the strength of the attractor by the constrained value
- normalize the vector between the particle and the attractor and multiply that by the value above

You now have the force vector to apply to th particle. 

#### Hooking up the attractor

Create a new global variable to hold your attractor.

In `setup`, initialize the attractor. Set the strength to something like 50.

In `draw`, set the position of the attractor to be the position of the mouse:

```javascript

attractor.position.x = mouseX;
attractor.position.y = mouseY;
```

You should now be able to affect the flow of particles by getting the mouse near it. Try different strengths. Negative strengths turn the attractor into a repulser. 

### Part 5: Blowing smoke

These basic building blocks can be used for a lot of different effects. We are going to use them to emulate smoke. 

This effect works best to my eyes with white particles on a black background. 

The first thing we will handle is the movement and positioning. 

Move the emitter down to the bottom of the page. 

We want our smoke to flow upwards, so comment out the line adding in the gravity. 

Now, to make it look like he smoke isn't coming from a single point, randomize the x position of new particles. Range over something like 40 pixels -- 20 on each side of the emitters location. 

Already this will start looking a little smoke-like -- especially if you interact with he stream with your attractor in repulse mode. 

#### Add a sprite

A very common approach is to replace our basic shapes with images, or _sprites_. In this case, we are going to use a blurred circle that looks like a little ball of cotton. More to the point, we will make one.

Create a new global variable called `smoke`. 

In `setup`, use `createGraphics` to make a small (25,25) offscreen graphics area. 

Write a function called `drawSmoke(g)` and pass it your new graphics region. In it, iterate over every pixel in the graphics context and draw a `point` that is colored based on the distance from the center. All of the points should be white, but the alpha value should range from 0 to 16 based on the distance from the center. Note that you will probably not be able to see white points with an alpha value of 16 on a black background. We are counting on multiple particles layering on top of one another to form our smoke.

Use the `dist` function to find the distance between each point and the center of the context. Then use `map` to determine the right alpha value. The distance will range from 0 (at the center) to about 1/3 of the width of the context. You want to map this to 16 when the dist is virtually zero and 0 when the distance reaches 1/3 of the width.

Use this value to set the stroke, and then draw a single point at the pixel location you just examined. 

Because we are using transparency in these images, make sure that the first thing you do is call clear on your new graphics context to get rid of any background.

When you are done, replace the call to `circle` in the `Particle` with a call to `image` that displays your smoke image. 

**Note**: If the image isn't working, just try placing a copy in the corner of the canvas for debugging purposes and use a higher alpha value so you can see what you are doing. 

### Part 6: Play

There are a lot of control knobs you can tweak in your simulation: the rate of particle creation, the initial speed, the color and size of the particle image, the force of the attractor, the spread of the emissions, etc. try some different values and see how they affect the effect. 


## Finishing up

Commit your changes to git and push them back up to GitHub. I will find them there.

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/#/p5/background)  
[clear](https://p5js.org/reference/#/p5/clear)  
[constrain](https://p5js.org/reference/#/p5/constrain)  
[createCanvas](https://p5js.org/reference/#/p5/createCanvas)  
[createVector](https://p5js.org/reference/#/p5/createVector)  
[dist](https://p5js.org/reference/#/p5/dist)  
[div](https://p5js.org/reference/#/p5.Vector/div)  
[fromAngle](https://p5js.org/reference/#/p5.Vector/fromAngle)  
[magSq](https://p5js.org/reference/#/p5.Vector/magSq)  
[map](https://p5js.org/reference/#/p5/map)  
[mult](https://p5js.org/reference/#/p5.Vector/mult)  
[normalize](https://p5js.org/reference/#/p5.Vector/normalize)  
[p5.Vector](https://p5js.org/reference/#/p5.Vector)  
[point](https://p5js.org/reference/#/p5/point)  
[radians](https://p5js.org/reference/#/p5/radians)  
[random](https://p5js.org/reference/#/p5/random)  
[stroke](https://p5js.org/reference/#/p5/stroke)  
[sub](https://p5js.org/reference/#/p5.Vector/sub)  