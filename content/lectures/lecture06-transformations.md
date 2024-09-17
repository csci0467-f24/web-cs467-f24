---
title: "CS 467 - Lecture 06"
date: "2023-03-02"
name: "Lecture 06"
published: false
---

Today we are going to talk a little bit about geometric transformation
	
As hopefully you realize, this is pretty much just math
		
In fact we have already done this a collection of times before
all of our tutorials so far have involved figuring out how to place shapes in different locations


			
## Basic translations

#### translate

What we have done are examples of **translation** -- moving elements around

It really is as simple as adding some fixed offset to all points of our shapes
If we imagine a unit square around the origin, we would translate it to point(x,y) by adding (x,y) to all of the corners, and it would now be a square around point (x,y)

%%Draw a picture of this%%
		
In p5.js, we have a function called `translate(x,y)` that does this for us
		
Like `fill` and `stroke`, it is state based -- we issue it and then everything we draw afterwards is translated

			P'x = Px + x
			P'y = Py + y
		
```javascript
fill("red");
circle(80,80, 80);

translate(80,80);
fill("blue");
circle(0,0,40);
```

[Example in action](../sketch/2023-03-02-translate)
				

#### Scale

We have `scale(sx, sy)`
		
This behaves as if we multiplied every coordinate by the scale factor

Note the different defaults
	For translate, the default values are 0,0
	For scale, they are 1,1
	
P'x = sxPx
P'y = syPy
			
```javascript
fill('red');
rect(0,0,100,75);
scale(2,2);
fill('blue');
rect(100,100,100,75); // manually moved for illustration
```

What happens when we change y to 1
	The rect gets smaller AND it changes position
	
[Example in action](../sketch/2023-03-02-scale)

#### Rotate

`rotate(angle)`


%%Show example of what it looks like to rotate a square drawn in the middle of the canvas%%
		
```javascript
angleMode(DEGREES);
fill('red');
rect(200,200,125,100);
rotate(45);
fill('blue');
rect(200,200,100,75);
```

This one is a little hard to wrap your head around at first -- it is a rotation around the origin

P'x = Pxcos(θ) - Pysin(θ)
P'y = Pxsin(θ) + Pycos(θ)

[Example in action](../sketch/2023-03-02-rotate)

#### Shear

`shearX(angle)`
`shearY(angle)`

```javascript
fill('red');
shearX(45);
rect(200,200,125,100);
```


These skew shapes about the axis by the angle
I'll let you experiment with those (they are less fundamentally useful, and I honestly never use them)

## Coordinate systems
I find the most useful way to think of this is that we have moved the coordinate frame

If we are drawing complex objects, it is usually easier to draw these centered on the origin
Using this mode of thinking, we can translate to where they should be, and then draw around the origin


This also leads us to write more reusable code
	While we can instrument our shapes with lots of xs and ys the way we did with drawShape() in the last practical, this becomes a pain as shapes become more complex
	If we draw our shapes with respect to 0,0 and then just translate, the code becomes much easier to understand

Thinking in these terms, how would we spin an object about its center?
	Translate to the object's location
	Rotate the coordinate system
	Draw the shape centered on the origin
	
```javascript
let angle = 0;
function setup() {
	createCanvas(640, 480);
	// noLoop();
	rectMode(CENTER);
}
function draw() {
	background(255);
	fill('red');
	rect(200,200,100,75);

	translate(100,100);
	rotate(angle);

	fill('blue');
	rect(0,0,100,75);
	angle += 1;
}
```

[Example in action](../sketch/2023-03-02-spin-object)

Another cute trick: how would we get the mathematical coordinate system (centered, y up, x to the right)?
	Translate to the middle
	`scale(1,-1)`


```javascript
translate(width/2, height/2);
scale(1,-1);

stroke("blue")
line(0,200,0,-200);

stroke("red");
line(200,0,-200,0);

stroke("black");

fill("red");
circle(100,100,50);

fill("green");
circle(100,-100,50);

fill("blue");
circle(-100,100,50);

fill("yellow");
circle(-100,-100,50);
```

[Example in action](../sketch/2023-03-02-coordinates)

What we are doing is composing transformations
	This allows us to draw complex objects where objects are placed in relation to other objects
		Think of the difficulty of figuring out how to attach a hand on the end of an arm doing the math by hand
			By composing transformations, we can hold everything together relatively
			
			
### transformation state

the downside of the fact that transformations are composed is that when we apply a transformation it is just added to all of the transformations that have come before

we can write new transformations that "undo" earlier ones (e.g., if we previously rotated forward 30 degrees, we can rotate back by the 30 degrees to undo it). 
- this means we have to keep track of every value (and will make making changes later a nightmare)
- this is also onerous if we have a long sequence of transformations to back out of


p5.js (and most graphics tools) provide us with a better way

they maintain a **stack** for storing transformation state
- we have `push()` that adds the current state to the stack
- and `pop()` which removes the last pushed transformation state and restores it

	As a side note, `push`/`pop` operate on _all_ state including `fill` and `stroke` etc…


Unless we are doing something very simple, the general rule of thumb is to `push` before you perform a transformation and `pop` when you are done

The `draw` function automatically pushes and pops at its start and end, but it is good practice to always use `push` and pop `around` transformations
	
	
	
```javascript
let angle = 0;
function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES);
	//noLoop();
}
function draw() {
	background(255);
	push()
		translate(width/2, height/2);
		rotate(angle);
		angle+=1;
		push();
			rotate(-45);
			rect(0,0,150,25);
			translate(150, 0);
			rotate(45);
			rect(0,0,150,25);
		pop();
		push();
			scale(-1, 1);
			rotate(-45);
			rect(0,0,150,25);
			translate(150, 0);
			rotate(45);
			rect(0,0,150,25);
		pop();
	pop();
}
```

[Example in action](../sketch/2023-03-02-stack)



## L-Systems

[L-Systems example](../sketch/2023-03-01-l-systems)