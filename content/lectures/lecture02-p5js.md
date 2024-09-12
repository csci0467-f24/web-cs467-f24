---
title: "CS 467 - Lecture 02"
date: "2024-09-11"
name: "Lecture 02"
published: true
---

# p5.js


There is no need for any sort of special tools for doing creative coding
Artists have been making their own for decades
	My ImageSpace tool was written in straight Python
	My more recent work has combined Python and Blender

	
However, there are a number of tools that have been developed specifically to make it easier for generative artists to get started
	The two most popular are probably openFrameworks and Processing
		openFrameworks is really a collection of C++ libraries
		We are going to use Processing
		
Processing was originally developed by Casey Reas and Ben Fry at MIT
	It is essentially a library that sits on top of Java with its own IDE
		It provides a collection of simple functions for drawing and abstracts away all of the messy details of creating a GUI in Java
		However, under the hood you still can write pure Java
	The core library was so successful it has been reimplemented on top of a couple of different languages
	
P5.js is the latest incarnation of Processing in JavaScript
	We are going to use this for the class
	Chosen primarily because of the ease of sharing things online
	The one downside is that it is harder to connect the code to desktop processes (for example, working with a kinect, etc…)
		Fortunately, it is not too difficult to switch between the two if you know both JavaScript and Java, so if there is a need later, you can certainly make the jump
		
There are a couple of different ways to get up and running with p5.js
	There is an online editor so you can start working immediately
	<!-- _We will start with that now_ -->
	
I like that there is a handy online editor that allows us to jump in instantly, but my preference is to create my own web pages and either include the library as a local bundle or use a CDN link to get it into the page. This makes it easier for us to manage our files.


In all cases, we will have an html file and a JavaScript file
<!-- look at it in the web editor -->
For folks who have done 312 or 466 with me, this is a simplified model
- We aren't going to worry about complex build steps
- There isn't an included development server
- We are back to basics (_which also means some of the messy sides of JavaScript like a single namespace_)


We can work with the files as local, just opening them in the browser to run them without the need for a server, but we will generally want to run a server however, and VSCode makes that pretty easy

Almost every Processing sketch starts with the same two functions: setup and draw
- The p5.js library will find your setup function and call it when it is ready to go
	- Note that before this function is called, none of the p5.js functions or variables are available, which means you can't use them to declare global variables, for example
- Typically, the first line in setup() will be createCanvas(), which we use define the bounds of the drawing area

This function will also be used for any initialization we want to do

The `draw` function will be called for us to draw the canvas

Example time: draw a circle

This is the strength of Processing: simple declarative commands without the messy implementation details

We can do the same thing with the canvas tag and vanilla JavaScript, but we have to think more about the details

<!-- Don't forget to remove the background call -->


```javascript
function setup() {
	createCanvas(700, 700);
}
function draw() {
	circle(100,100,50);
}

```

### Coordinates

As with many (but not all) computer graphics,
- The origin is in the top left
- X increases to the right
- Y increases down
	
### 2D shapes
		
- `circle(x, y, diameter)`
- `ellipse(x, y, w, h)`
- `rect(x,y,w,h)` also has optional arguments for rounded corners
- `square(x,y,s)` also has optional arguments for rounded corners
- `point(x,y)`
- `line(x1,y1,x2,y2)`
- `triangle(x1, y1, x2, y2, x3, y3)`
- `quad(x1,y1,x2,y2,x3,y3,x4,y4)`


Modes
	- `rectMode()`
		- `CORNER` - default
		- `CORNERS` - first two args are one corner, and the other two are the diagonally opposite corner
		- `CENTER` - first two arguments are the center instead of the top left corner
		- `RADIUS` - first two arguments are the center, the other two are half of the radius
	- `elipseMode()`
		- all of the same modes, but `CENTER` is the default
		- for `CORNER` and `CORNERS`, we imagine a box around the ellipse

This illustrates an important aspect of working with Processing -- the library is _modal_ 
	there are immediate functions that do things right now (like `circle()`)
	and there are functions like these that change the state of the system -- and it stays that way until another function call changes it
	


## Add the mouse

If we change the `x` and` y` to `mouseX` and `mouseY`
We can draw with the mouse
Why does this work? Surely we only drew one circle?

The `draw() `method is being called in a loop
This gives us cheap animation
Every time the loop cycles, it draws on top of what was there
Even when the circle wasn't moving, p5.js was just drawing on top of it
				

To clear the screen, we can use the `background()` function
		
```javascript
background('white');
```

This paints a colored rectangle over the whole screen, clearing it


# Goal

You should be able to:
- set up p5.js
- understand the p5.js coordinate space
- create basic animated sketches in p5.js with 2D shapes
- understand the modal nature of p5.js functions
- use the mouse position in your sketches