---
title: "CS 467 - Lecture 08"
date: "2024-10-02"
name: "Lecture 08"
published: true
---

In our first lecture, I provided you with Philip Galanter's definition of generative art

> Generative art refers to any art practice in which the artist uses a system, such as a set of natural language rules, a computer program, a machine, or other procedural invention, that is set into motion with some degree of autonomy, thereby contributing to or resulting in a completed work of art.

A key piece here is that we are ceding some level of control to a process. There is a fine line here since we are writing the code about what it actually means to cede control to the process. The mouse following tutorial we did, for example, caused one of you to question if it was really "generative art". I would (and did) argue that there is still an algorithmic process happening, but it is a fine line.

**sketch 1**

```javascript
let position;

function setup() {
  createCanvas(600, 600);
  position = createVector(width / 2, height / 2);
  strokeWeight(10);
}

function draw() {
  point(position.x, position.y);
}
```

this has some minimalistic appeal, but this is pretty boring

**sketch 2**

```javascript
let position;

function setup() {
  createCanvas(600, 600);
  position = createVector(width / 2, height / 2);
  strokeWeight(10);
}

function draw() {
  background("white");
  point(pos.x, pos.y);

  position.x = max(0, min(position.x + random(-3, 3), width));
  position.y = max(0, min(position.y + random(-3, 3), height));
}
```

this is more dynamic, but it is still pretty plain

**sketch 3**

```javascript
let position;

function setup() {
  createCanvas(600, 600);
  position = createVector(width / 2, height / 2);
  strokeWeight(10);
}

function draw() {
  point(position.x, position.y);

  position.x = max(0, min(position.x + random(-3, 3), width));
  position.y = max(0, min(position.y + random(-3, 3), height));
}
```

we have to remove some code, but it has become a little more interesting

**sketch 4**

```javascript
let position;

function setup() {
  createCanvas(600, 600);
  position = createVector(width / 2, height / 2);
  strokeWeight(25);
  stroke(0, 3);
}

function draw() {
  point(pos.x, pos.y);

  position.x = max(0, min(position.x + random(-3, 3), width));
  position.y = max(0, min(position.y + random(-3, 3), height));
}
```

Add a little bit of color

**sketch 5**

```javascript
let position;
let hue = 0;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  position = createVector(width / 2, height / 2);
  strokeWeight(10);
}

function draw() {
  // background("white");
  stroke(hue, 100, 100, 10);
  point(position.x, position.y);
  position.x = max(0, min(position.x + random(-3, 3), width));
  position.y = max(0, min(position.y + random(-3, 3), height));

  hue = (hue + 360 + random(-5, 5)) % 360;
}
```

with a small addition to how the point is visualized, we have made this much more interesting (though I won't claim it is riveting)

What are we (or maybe just I) responding to? **Complexity**
At each step, I added a little more complexity

- random movement
- movement trace
- transparency so we can see where it dwells
- color for a little interest

[See it in action](../sketch/2024-10-02_complexity)

We are attracted to complexity
this doesn't mean _complicated_ or _perplexing_ (though it can)
we mean systems that have a lot of component pieces that are interacting

Complexity can lead to **emergence** - characteristics that are unexpected or more than the sum of the parts, as it were

Sometimes, as in our tiling, this means that we get patterns that we didn't expect
Others, we get true chaotic behavior with non-linear, unpredictable results

To me, this is one of the draws of generative art -- the idea that I can write all the code for a system and still be surprised

Galanter uses complexity theory as a lens for talking about different kinds of generative art

![Generative art complexity](./lecture08/genart_complexity.png)

Philip Galanter, "Generative Art Theory"

We have already visited the two extremes of this. We have looked at tiling and L-systems and randomization

Today we will dig into randomization a little bit more

# Generating random numbers

where do we get random numbers?

- rolling dice
- flipping coins
- shuffling cards
- people?
  - people are notoriously poor at generating random numbers
- natural sources of entropy
  - random.org
- pseudo-random number generator (PRNG)

Hopefully you realize that computers all use some form of pseudo-random number generator

example: (sin(x) \* 1000) % 1

```
> x = 1
1
> x = (Math.sin(x) *1000)%1
0.4709848078964569
> x = (Math.sin(x) *1000)%1
0.764089112496265
> x = (Math.sin(x) *1000)%1
0.879613174955125
```

This is basically just diving deep into the less significant bits of the sine function
We wouldn't actually use this sequence for anything important like cryptography -- we would need something with some provable statistical properties (the **Mersenne Twister** is a more robust example that uses shift registers and matrix linear recurrence... and no, I don't know how it works)

In JavaScript, the standard leaves the choice of random number generation to the implementer of the interpreter... so basically you are at the mercy of your browser.

The essential point is that what we think of as a random number generator is actually just a fixed sequence of numbers based on an initial _seed_ value. If we start from the same seed, we get the same sequence.

A nice feature of this is we can get repeatable pseudo random numbers

We have been using the `random()` from p5js
we have never talked about the seed and we aren't getting repeated behavior, why not?

If we don't set the seed with `randomSeed` then it is set for us, usually using the current time so that every run is unique.

# Considerations when using random numbers

### bounding and parameterization

pure randomness is usually too messy
in the color flurry, I used a smaller range to bound the colors and sizes for aesthetic reasons

this will be a common approach for us as generative artists when we are using randomness, we will think about the parameters of the system and what the appropriate ranges are for the parameters

parameterization in and of itself is a whole technique that generative artists will often use, wether or not the parameters are then randomized. We can think of a lot of what we do as defining a search space of possible designs and then swimming around to find one that we like. randomness is just one way to do that exploration.

Another approach is to think in terms of applying random _variance_ instead of generating random values
this bounds the value into a local region
the region may travel with the value, but we are making small changes instead of big radical ones

### discrete vs continuous

we also want to think about whether we want continuous values or discrete ones

We can think in terms of breaking up the range of our random values into bins.

<!-- show example of random maze -->

[Maze example](../sketch/2024-10-02_random-maze)

What if we wanted something that would happen 70% of the time?

```javascript
if (random() < 0.7) {
  do_thing();
} else {
  do_other_thing();
}
```

our random function can take in an array and it will return a random value from the collection of options

[Tiles example](../sketch/2024-10-02_random-tiles)

What if we want weighted discrete values?
One approach that works well is to load multiple copies into an array

`[A,B,C,A]`

- A, 50%
- B 25%
- C 25%

### distribution

Our random number generator approximates a **uniform distribution** -- any value in the range is equally likely

p5js also provides `randomGaussian()`, which will give us a Gaussian distribution
it has two optional parameters

- `mean` - the mean value to center around
- `sd` - the standard distribution

take a look at the distribution sketch

We aren't limited to these for distribution

<!-- Show distribution visualization -->

[Distribution visualizer](../sketch/2024-10-02_random-distribution)
