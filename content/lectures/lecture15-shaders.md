---
title: "CS 467 - Lecture 15"
date: "2024-10-30"
name: "Lecture 15"
published: true
---

This is a little bit of a digression. This isn't a major theme, like Repetition or Transformation or Complexity. It also isn't a technique like simulation. It isn't even a tool like noise or the various curves. For us this is primarily about speed (though it does open the door for some new ways to think about things).

# Graphics pipeline

To understand shaders, we need to talk briefly about the graphics pipeline, which is used for hardware acceleration of polygon based 3D graphics.

The graphics pipeline consists of a couple of stages. This is a simplified version because we don't care about most of the details at the moment.

- the application outputs vertices and shape data
- the geometry stage handles the view
  - it transforms the points according to the transformation matrix and the camera position
  - it projects the vertices to 2D based on the type of camera
  - it clips edges with vertices that can't be seen
  - transforms the projection to fit the viewport
  - this outputs which parts of the 2D plane are covered by our shapes
- the rasterization stage handles the coloring
  - for each point on the projected plane (fragment) we need to determine its color
  - this outputs colors which are sent to the frame buffer

## shaders

The reason we care is because the pipeline is programmable. We can write programs called **shaders** which can change the behavior of the geometry and rasterization stages. For the geometry stage, we have the **vertex shader** and for the rasterization stage, we have the **fragment shader**. We are going to focus on the fragment shader.

When doing 3D graphics, we can set the shader to use for rendering an object the way we have been using `fill()` to color our shapes. It is typically used to map textures to a surface, determine the surface's material properties, and determine how to color the surface based on the lighting. We can also do procedural things like generate new textures or make the surface seem like it has more detail than was provided.

# shaders for 2D

While you can do all of those things with your 3D piece in p5.js, we are going to focus on a simplified model. We render a rectangle that fills the entire view and then use the fragment shader to texture the rectangle. In essence, this just allows us to draw with the fragment shader.

Why do this? Primarily speed. If you have a graphics card, the fragment shader is run there. The GPU has a simpler architecture than the CPU, which makes it faster, it is also smaller, so it has many more cores, allowing the shader to be heavily parallelized. This is further helped by the fact that our fragments don't rely on each other so they can be processed in any order or simultaneously.

This is how the `filter` operations in p5js are implemented. It considers the state of the canvas to be a texture, which is passed to a shader for processing, and then the output is rendered back out on top of the canvas.

# GLSL

One downside to using shaders is that we need to learn a new language. There are a couple of different shader languages, which are largely determined by the environment we are in. For us, we are using WEBGL, which is an OpenGL variant, so we will be using the OpenGL Shader Language (GLSL).

For the most part, GLSL works basically like C. It has the same basic syntax for loops and functions.

We have some new types, the most important of which is the `vec`, which allow us to store what are in essence fixed sized lists (or vectors). These come in three sizes: `vec2`, `vec3`, and `vec4`. We can access them like they are positions ( `.xyzw`), colors (`.rgba`), or texture coordinates (`.stpq`). We can use any number of these (`v.x`, `v.xy`, etc...), or even change their order to reorder the values (`w = v.yxz`). This is a great data type and it has all sorts of tricks. We can perform all of the basic operations (add, subtract, multiply and divide) on these and they will do the right thing. We can even do it with scalar values and vectors so we can do things like scale all of the components at once.

It is also worth pointing out the the compiler is _very_ fussy and _very_ strict and not big on telling us what the problem is. An example that will bite everyone at some point is that floating point numbers always need a value on both sides of the radix point: 0.2, 2.0, etc....

To communicate between the application and the fragment shader, we will set _uniforms_, which will then be available in our shader as constants.

# Shaders in p5js

We have two primary ways we can work with shaders. There are _filter shaders_. We load a fragment shader and then pass it to `filter()`. p5js will take the canvas and send it to the shader as a texture and place the result on top of the canvas. So we would typically do this _after_ we draw the things we want to process. We are going to abuse this a little bit

The second approach is more traditional. We need to provide both a vertex and a fragments shader and use `shader` before drawing geometry (like `fill()`), and the result will be applied as a texture to the shape. if we want the current contents of the canvas, we need to pass it ourselves.

Shaders can also be written as strings in your code, or they can be in separate files that are loaded in. I prefer to load separate files, if only because it means that I get syntax highlighting while I write the shader, which can help find some simple errors.
