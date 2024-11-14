---
title: "CS 467 - Tutorial Seven"
date: "2024-10-21"
due: "2024-10-23T14:15"
name: "Tutorial 07"
published: true
---

#### Goals

- Get a basic framework for working with sound
- Learn about using frame buffers to create visual feedback
- Learn how to use our analysis tools to do some basic beat detection

## Prerequisites

1. Accept the assignment on our [Github Classroom](https://classroom.github.com/a/C-q5hl4A).
1. Clone the repository GitHub classroom creates to your local computer (in your shell, type `git clone` and the name of the repository)

## Assignment

In this tutorial, you are going to implement an audio visualization that look like this:

![Practical 7 Goal](./tutorial07/tutorial07.png)

_Links to the references for the included functions can be found at the bottom._

### Part 1: Familiarize yourself with the code

In the starter code that I have provided, I have set up the two sound sources: a sound file and the microphone.

Loading a sound file is very straightforward and works like loading an image. We want to do our work in `preload` to make sure the media is ready for us when we start to draw.

_Potential gotcha -- sounds cannot start automatically. The user must interact with the page in some way before the sound will play._

In the provided code, the microphone is also loaded and there is some user interface code for switching between sources (the space bar) and starting and stopping the animation and sound ('p').

### Part 2: Draw the waveform

Create a new global variable called `fft`. In `setup()`, add

```javascript
fft = new p5.FFT();
```

You need to connect the `fft` to whichever sound source we are using. Go the `setSource` function and find the place where it says `sound.play()`. Add a line after it that says `sound.connect(fft)`. Do the same for the `mic`.

In the `draw()` function, you are going to call `fft.waveform()` to get the waveform. This is a list of 1024 samples with values in the range $[-1, 1]$.

Set the stroke color (my color was `(100, 255, 100)`) and turn off the fill.

Use `beginShape()` and a loop to draw all of the points. The `x` coordinate will come from the index of the sample in the list, and the `y` will come from the value.

Use `map()` to make sure that the waveform perfectly fills the canvas width.

For the `y` coordinate, we want to center the range, so map the amplitudes to $[-50, 50]$. Of course this will put half of the wave offscreen. Use translate to move the wave down near the bottom (leave about 10 pixels of padding).

Run it now. It should look like the demo I showed in class. Interesting, but not _really_ interesting.

### Part 3: Feedback with framebuffers

To make this more interesting, we are going to add _feedback_. The idea of feedback is to take the output, loop it back around and add it as input for the next loop. In truth, from some perspective, when we don't use `background` we could think of that as a form of feedback -- in every loop the output is the sum of the current drawing and everything that came before. This approach is a little limited, however. Feedback is more interesting when we manipulate the old output in some way before feeding it back to the new drawing.

#### Framebuffers

To implement this, we are going to introduce the _framebuffer_. Technically, the framebuffer is the memory on your computer where pixel data is stored for output to your display device. `p5.Framebuffer` is a class that provides access to a dedicated portion of this memory for drawing. We can use the framebuffer in a similar way to the way we used `p5.Graphics` -- we draw onto it instead of the canvas, and then if we want to see the result on the canvas, we use `image` to display it. The primary differences are that the framebuffer is much faster and we use a different approach for drawing into it.

To use the framebuffer, we need to be in `WEBGL` mode, so add `WEBGL` as a third argument to `createCanvas` just like you have previously for 3D drawing. When we switch to `WEBGL` the origin moves to the center of the canvas, so you will need to update the positioning of your waveform.

Now we can move the drawing into the framebuffer. Create a new variable called `current`. In `setup()` initialize `current` with

```javascript
current = createFramebuffer({ format: FLOAT });
```

_Notice that we did not provide a size. Our framebuffer is now the same size as the canvas, though it can be resized._

To draw into the frame buffer, add `current.begin()` the code that draws the content and `current.end()` after it. For us, we want everything from `background(0)` to the end of drawing the waveform (notice the difference from drawing into a graphics context where we had to preface every call with the name of the context).

To see the contents of the framebuffer, you need to place an image on the canvas. Change the imageMode to `CENTER` and then place the framebuffer in the middle of the canvas. Everything should look the same as before.

#### Feedback

The way we add feedback is to have _two_ framebuffers. One is the framebuffer we are drawing into (`current`), while the other holds the drawing from the last time we drew (we will call that `prev`). If we add the contents of `prev` to current, we will get feedback. To make it more interesting than just not erasing, we want to transform `prev` in some way that diminishes it before we draw (scale it, fade it, etc...).

So the steps are

- draw a transformed version of `prev` into `current`
- draw new content into `current`
- use `image()` to draw `current` onto the canvas
- swap `current` and `prev` so that `prev` holds the latest drawing and `current` is ready to be reused

There is some flexibility here. The swap of the buffers can come at the top or the end of the process. If we make the old contents semi-transparent or change the blend mode, we can reverse the order of placing the previous contents in `current` and adding the new drawing. For now, however, you should keep this order.

Create a new variable called `prev` and initialize it the same way that you did `current`.

Before you draw the waveform (but after `current.begin()`), add a `push()` and `pop()`. Add `translate(0, -1)` after the `push`, and then use `image()` to place `prev` into `current`.

After your drawing flip the buffer using this cute JavaScript trick:

```javascript
[current, prev] = [prev, current];
```

If you run this now, you will see the old waveforms moving up the screen.

We are going to add two more effects. Scale by .98 and rotate by 0.05. Now the old waveforms will spiral into the distance. You should experiment with those values to see what other effects you can get. Feel free to leave any interesting results you get.

Feedback is a powerful effect, and I think it works particularly well for audio work since reactions are so transitory. You just have to think very carefully about what is in `prev` and how you will use it to make the next image.

### Beat detection

While we can create interesting visualizations just using the raw data from our three tools, sometimes it can be nice to have reactions that aren't quite so obviously the output of those three tools. One thing we can try to do is have something that responds to the beat.

The basic idea for detecting beats is to detect those moments when we hit the top of a rapid rise in amplitude. Unfortunately, this is non-trivial for a number of reasons. First, it is impossible in real time to absolutely know that the _next_ sample will go down. Second, in a lot of music the beat is buried in a lot of other sounds. This especially problematic when the sound is heavily compressed to sound louder (which is true of a lot of modern music). If we really wanted to do this properly, we would do offline analysis added to statistical work to figure out what the expected beat interval actually is. We aren't going to do that. We are just going to try to get close.

#### Finding the level

Before we start detecting beats, we need to think where we are going to detect them. We could detect them using the amplitude, but this is easily fooled by songs with a lot going on. So, instead, what we are going to do is try to isolate a frequency that responds the way we want, and for that we need the spectrum data.

I have already done some experimenting with the included track, and I determined that the frequency in slot 630 works well enough for us (no, I don't know what actual frequency that is).

Create a `const` at the top called `FREQUENCY` and set it to 630.

Now we need to extract that from the spectrum. In the `draw()` function, before you start work on `current`, add the following:

```javascript
let spectrum = fft.analyze(); // get the frequency information
let level = spectrum[FREQUENCY];
```

#### Detecting the beat

Start by adding a new local variable called `beat` and set it to `false`.

What we will look for is a jump from one sample to the next, so we need to remember the previous value of `level`. Create a new variable called `lastLevel` at the top and set it to 0.

We also need a threshold. Create another `const` at the top and call this one `THRESHOLD`. Set it to 15 (again, this is a somewhat arbitrary number I determined through some experimentation).

Add a conditional to check if the change from `lastLevel` to `level` is greater than `THRESHOLD`. If it is, set `beat` to `true`.

After the conditional, update `lastLevel`.

#### Drawing

When `beat` is `true`, draw something new. For my drawing I added a yellow circle near the edge of the spiral. You can do whatever you like, just remember it will follow the path of the spiral.

Run this and it should line up with the cymbals in the included track, or if you are using the microphone it will detect handclaps or other loud, sharp noises.

#### Refining

You will find that this sometimes draws multiple times on the same beat. We can fix this by adding a blind period where it won't look for changes. Add another constant called `HOLD_TIME`. This is the number of frames we will wait before looking again. 10 is a reasonable value for this. Add another global variable called `waitTime` and set it to 0.

On every call to `draw`, subtract one from `waitTime`. If you detect a beat, set `waitTime` to `HOLD_TIME`. Finally, change the conditional so that `waitTime` has to be less than or equal to zero as well.

Now you should have somewhat reasonable beat detection.

#### Thoughts

This beat detection is not perfect, and it is tuned to one particular feature. In your own pieces you may want to respond to different features and it can take a bit to dial in where on the spectrum you can find the right information (and it might even be buried in the mix).

The binary beat/no beat also makes any mistakes in detection stand out. If you can identify a feature that is approximating the portion of the sound you are interested in, sometimes it can be better to make your visual encoding (color, transparency, size, etc...) be _proportional_ to the level. Something that throbs or pulsates can make it _feel_ like it is being tracked correctly more convincingly than on/off.

### Part 4: Play

Try some different values for our arbitrary constants and see how they change things.

Play around with the transformations to see what other effects you can make.

## Finishing up

When you are ready to submit,

- commit your changes to your git repository (`git add` and `git commit` -- see the [guide](../resources/git) for details)
- push your changes to GitHub (`git push`). _For 312 alums, don't worry about PRs -- a straight commit is fine_
- submit the repository on [Gradescope](https://www.gradescope.com/courses/873354/assignments/5191478) ([submission directions](../resources/gradescope))

## References

Links to the reference pages for the functions you will be using:

[background](https://p5js.org/reference/p5/background)  
[beginShape](https://p5js.org/reference/p5/beginShape)
[createCanvas](https://p5js.org/reference/p5/createCanvas)
[createFramebuffer](https://p5js.org/reference/p5/createFramebuffer)
[endShape](https://p5js.org/reference/p5/endShape)
[fill](https://p5js.org/reference/p5/fill)
[image](https://p5js.org/reference/p5/image)
[imageMode](https://p5js.org/reference/p5/imageMode)

[map](https://p5js.org/reference/p5/map)  
[pop](https://p5js.org/reference/p5/pop)
[push](https://p5js.org/reference/p5/push)
[rotate](https://p5js.org/reference/p5/rotate)
[scale](https://p5js.org/reference/p5/scale)
[stroke](https://p5js.org/reference/p5/stroke)  
[translate](https://p5js.org/reference/p5/translate)
[vertex](https://p5js.org/reference/p5/vertex)

[p5.AudioIn](https://p5js.org/reference/p5.sound/p5.AudioIn/)
[p5.FFT](https://p5js.org/reference/p5.sound/p5.FFT/)
[p5.SoundFile](https://p5js.org/reference/p5.sound/p5.SoundFile/)
