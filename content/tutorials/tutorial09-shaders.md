---
title: "CS 467 - Tutorial nine"
date: "2024-10-30"
due: "2024-11-04T14:15"
name: "Tutorial 09"
published: true
---

#### Goals

- Build a 2D cellular automata
- Learn how to write a shader
- Learn how to use frame buffers to pass information to shaders

## Prerequisites

1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/r4IlMAOY).
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Assignment

For this tutorial we are going to build a 2D cellular automata that abstractly mimics water droplets falling in a puddle.

![Practical 9 Goal](./tutorial09/drips.png)

This would be somewhat to unreasonably slow (depending on your computer) if we were to attempt to do this kind of pixel level management. So, we are going to turn to our new tool: the fragment shader. We will get a number of advantages here. The primary one is speed. Since we can calculate the next state for all of our automata in isolation, we can really take advantage of the parallelization of doing this on the GPU. The second advantage is that this is actually a little easier to code because we only have to write the code to handle a single pixel.

Our CA design is very simple:

- we are using a von Neumann neighborhood (NSEW)
- state is a continuous value between 0 and 1
- we have one rule: the next state is the current state plus the average of the neighbors minus the previous state

_**Tip**: We can't debug shader code by stepping through it or adding print statements. As a result, I recommend using color if you are trying to debug things. Either output values you are curious about as colors, or use conditionals to output really obvious colors so you know your code is being run._

#### Starter code

I have given you some starter code which loads in the shader. It also includes a function that reports any errors you might encounter compiling the shader code to the console, so you will probably want to have the console open.

### Part 1: Create our states

Looking at the CA design, you can see that we need to keep track of the current state, the next state, _and_ the previous state. If we were doing this the way you did the 1D CA, you would have a class, and it would have three properties, and it would all get very fiddly.

To be able to use the fragment shader, the hardest part is to design how we store our state data so we can communicate it to the GPU. We don't want to pass individual values as uniforms, we want to dump the entire state of the system down at once. We do this by encoding our data in a texture -- an image the same size as our canvas. From the shader's perspective, this is basically a big lookup table. The values in the texture are technically colors, but we can treat them as arbitrary values as well.

To create a texture, we are going to use a frame buffer. We have a lot of different choices about how we communicate the state data. In this instance, we will store the current state in the red channel and the previous state in the blue channel of the pixels of the texture. To make things a little smoother, we will actually create two frame buffers and switch between them like we did when we were creating feedback.

Go ahead and create two frame buffers in `setup()`. We also want to initialize their states to 0. So for each buffer, set the background to black (also in `setup`).

In `draw()`, inside of the conditional, call `begin` on your next state buffer. Inside you want to use `setUniform()` to assign your current state buffer to `tex1`. If your state is stored in a buffer called `state`, here is what that would look like:

```javascript
caShader.setUniform("tex1", state);
```

_Why `tex1`? Our textures will all be passed in with names of the form `tex0`, `tex1`, etc... Because we are using the filter shader, p5.js is already setting `tex0` with the contents of the current canvas (or frame buffer). We are, admittedly, abusing the filter shader a little bit since we aren't actually filtering the contents of the frame buffer, we are just replacing them._

After the uniform has been set, call `filter()` on the shader to run it. This will now output the result into your next state frame buffer. Call `end()` on the frame buffer and then use `image()` to display the result. After that, use our array trick flip the two frame buffers.

The result will not be overwhelming since the shader isn't doing much yet -- the goal now is just for no errors.

### Part 2: Implementing the CA

You want to turn your attention to the shader now (`shaders/ca.frag`).

### Reading the state values

You need to add the uniform we are passing down here. These are a new data type: `sampler2D`. The full syntax is:

```javascript
uniform sampler2D tex1;
```

Now we need to be able to read the values for the current state and the previous state out of the texture.

The location of the current fragment is stored in `vTexCoord` (which is coming from the vertex shader -- that is why it is labeled with `varying`). This is a texture coordinate, rather than a point in 3D space, so it only has two dimensions, each of which ranges from 0 to 1.

To read the value at our location out of the texture, we have another new function: `texture2D()`, which takes a `sampler2D` and a `vec2`. It returns a color (a `vec4`), and we can extract just the red channel with `.r`. So, to get the current state, we would do something like this:

```glsl
float state = texture2D(tex1, vTexCoord).r;
```

Use the same technique to get the previous state out of the green channel.

We also need the current states of the four cardinal neighbors. The question is, how far away is the neighbor? We can get this from another uniform that p5js is setting automatically for us: `texelSize`. This tells us the distance to the next fragment across the texture. This is another `vec2`. To find the neighbors, you will want to use this to build new offset vectors that can be added directly to the current position (recall that we can add vectors together with `+`).

Use this to find the current state of the four cardinal neighbors.

### Computing the next state

Our formula for the next state is the current state plus the average of the neighbors minus the previous state. This will propagate the wave.

As we saw, setting `gl_FragColor` to determine the color of the current fragment is the ultimate objective of the fragment shader. Change the version that I left you so that the next state is in the red channel, the current state is in the green, and the previous state is in the blue channel (we are just pushing everything down a channel).

If you run the code now, you will see... a black screen. We need something to fire off our ripples.

### Part 3: Making waves

Add a `mouseClicked` function. When the mouse is clicked, draw a small red circle at the mouse location into the current state frame buffer.

Now, when you click you will see ripples radiating out across the space. Now there is no dampening in our system, so that single wavefront will just bounce around and we won't have our nice little raindrops -- it is interesting, but not what we want.

Go back to the shader and multiply the next state value by 0.9999 (it doesn't take much). Now the wave will die off after radiating out a little bit.

To get the look of the example, we need more drops. Go back to the `draw()` function. After you have done the buffer swap, edit the current state buffer to add a couple of small red circles of random size and in random locations around the canvas. Now you should get a constant sprinkle of raindrops.

### Part 4: Explore and play

Conceptually, there is a lot going on here, with the fragment shader, the multiple frame buffers, and the CA on top of it all. At the same time, there is fairly little code to write. Take the time to experiment and play around with it. See if you can really understand how all of the parts work.

**Challenges**

These are optional. I present them to get you thinking about what is going on here and to give you some direction if you get really inspired to dig deeper.

Our output is basically just the raw dump of our state. Because the current, next and previous states are all similar, we generally see activates nodes as some shade of grey. What if we wanted to transform the state into a more interesting visual? We can't change the colors that we are outputting in the fragment shader because we need that state data for the next cycle. We _could_ pick over the frame buffer pixel by pixel and set a color based on the state we find there, but then we are back to walking every pixel and we lose some of our gains of working in the shader. A better solution would be to write another shader that reads the state information and transforms it into a color.

Another challenge would be to have the waves be different colors. For that you would probably need change the representation of the state from a single color channel to a full color. That would mean you need another frame buffer so you can pass the current and previous states as separate textures.

## Finishing up

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5241804) ([submission directions](../resources/gradescope))

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/#/p5/background)  
[circle](https://p5js.org/reference/#/p5/circle)  
[createCanvas](https://p5js.org/reference/#/p5/createCanvas)  
[createFramebuffer](https://p5js.org/reference/#/p5/createFramebuffer)  
[createFilterShader](https://p5js.org/reference/#/p5/createFilterShader)  
[fill](https://p5js.org/reference/#/p5/fill)  
[filter](https://p5js.org/reference/#/p5/filter)  
[imageMode](https://p5js.org/reference/#/p5/imageMode)  
[image](https://p5js.org/reference/#/p5/image)  
[p5.Shader](https://p5js.org/reference/p5/p5.Shader/)
