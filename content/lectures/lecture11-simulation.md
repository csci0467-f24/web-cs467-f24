---
title: "CS 467 - Lecture 11"
date: "2023-03-28"
name: "Lecture 11"
published: false
---

Before break I said that we used tools like noise to help out when physical simulation of very complex systems was beyond us
	that is not to say we can't do some physical simulation
	
Start with the simple ball example
Many of you have already done some simple physics simulation
	We saw the example of the bouncing ball before break
	This is an idealized system
Constant velocity and perfect elasticity for the bounces


```javascript

class Ball {
  constructor(x, y, radius, color) {
    this.radius = radius;
    this.color = color;
    this.position = createVector(x, y);
    this.velocity = createVector(3,4);
  }

  update(){
    this.position.add(this.velocity);
    if (this.position.x - this.radius< 0 || this.position.x + this.radius >= width){
      this.velocity.x  *= -1;
    }
    if (this.position.y - this.radius < 0 || this.position.y + this.radius >= height){
      this.velocity.y  *= -1;
    }
  }


  draw(){
    fill(this.color);
    circle(this.position.x, this.position.y, this.radius*2);
  }
}

```

In previous animation, we have combined the drawing and the updates. Now we really want to separate them


# Acceleration

Time to revisit early physics class (or learn some basic physics)
	**Velocity** - a vector providing the change in position over time
	**Acceleration** - a vector providing the change in velocity over time

### Rocket ship
let's look at a simple example
this is the basic setup for what is arguably the very first computer game : Space war

We have a simple rocket and we can apply thrust -- in this case acceleration
We can give it a tap of acceleration, and the velocity increases… and then stays constant
		
Look at the update
	We add the acceleration to the velocity
	We add the velocity to the position
	We zero out the acceleration
		We do this just to keep from read adding the acceleration to the system
(and to save remaking the vector)

[Rocket ship simulation in action](../sketch/2023-03-28-rocket)



## Ball with gravity
Let us now add gravity to our ball (v2)

```javascript
constructor(x, y, color, radius){
	this.radius = radius;
	this.position = createVector(x, y);
	this.velocity = createVector(1,0);
	this.acceleration = createVector(0, 1); // <--
	this.color = color;
}
update(){
	this.velocity.add(this.acceleration); // <--
	this.position.add(this.velocity);
	…
			
```

_In the full code, we also updated the `update()` function to keep the ball on the screen_


Wait -- isn't gravity 9.8 m/s? why 1?
	What is a meter?
	We are the creators of this little world -- units and universal constants are up to us
	
If we make the bounce a little bit less than perfectly elastic, we will get the behavior we would expect when letting a ball drop
	(i.e., make the flipped velocities less that 1)

```javascript
if (this.position.x < 0 || this.position.x >= width){
  this.position.x  *= -.9;
}
if (this.position.y < 0 || this.position.y >= height){
  this.position.y  *= -.9;
}
```


### Forces

Of course, if you recall your physics class, what we are really talking about is applying a force to the object

If you recall your physics: $F = ma$
	So the mass gets involved…
	Our objects don't have any mass
		Again, we can make it up -- let's make the mass proportional to the radius
		
So, given a force and a mass, we can calculate the acceleration: $a = F/m$

Of course in a proper complex system there will be many forces acting upon an object

So we need to think about the accumulation of all of the forces

We will write an `applyForce()` function that accumulates all of the forces

```javascript

applyForce(force){
    this.force.add(force);
}
  
```

The assumption here is that `force` is a vector


We then need to change our `update` function
We calculate the acceleration based on the forces and then we clear the current forces

```javascript

const acceleration = p5.Vector.div(this.force, this.mass);
this.force.x = 0;
this.force.y = 0;
this.velocity.add(acceleration);
this.position.add(this.velocity);
```


We can apply a new force in the `update()` function


```javascript

ball.draw();
ball.applyForce(createVector(0,2));
ball.update();
  
```



Here is the [fully developed ball](../sketch/2023-03-28-ball)



## Building a system

We aren't going to build a complete physics system, there are a number of them out there like matter.js, Box2d, etc..., but we will make the first few steps in that direction


We will build a `System` class and we will be able to add objects and forces to it

```javascript

class System{
  objects = [];
  forces = [];

  addObject(obj){
    this.objects.push(obj);
  }

  addForce(force){
    this.forces.push(force);
  }

  update(){
    for (let force of this.forces){
      for (let obj of this.objects){
        obj.applyForce(force);
      }
    }

    for (let obj of this.objects){
        obj.update();
      }

  }

  draw(){
    for (let obj of this.objects){
      obj.draw();
    }
  }
}

```


We can then configure the system in the `setup()`

```javascript

system = new System();
let ball = new Ball(100, 100, 25, "red");

system.addObject(ball);

system.addForce(createVector(0,2))
```

Now it is pretty easy to add new balls in 

```javascript

ball = new Ball(100, 100, 10, "blue");
system.addObject(ball);

```



### gravity

Conceptually, our force is modeling gravity, but there is a problem

the balls all now fall at different rates
	why?

is it what we want?
		well, no. Gravity is effected by the mass of the objects involved
		
on Earth, we get roughly constant acceleration

To get this effect, we need to make the force applied proportional to the mass, so when the mass is divided out, everything will have the same acceleration. 

This requires a slightly more complex force model

There are _many_ ways to do this. This is just one approach

We will create force object with an `applyTo` method, and the method will apply itself to the object. 

```javascript

  let force = {
    base: createVector(0,2),
    applyTo(obj){
      obj.applyForce(this.base);
    }
  }

  system.addForce(force);
  
```


and we need to switch around `update` a little

```javascript

for (let force of this.forces){
  for (let obj of this.objects){
	force.applyTo(obj);
  }
}
    
```


This hasn't really given us anything new yet, but now we can create more complex forces

```javascript

let gravity = {
    base: createVector(0,1),
    applyTo(obj){
      obj.applyForce(p5.Vector.mult(this.base, obj.mass));
    }
  }

  system.addForce(gravity);
  
```


Now our two balls fall at the same rate



### wind

Let's add a wind force

We will set the wind to only blow when the mouse is clicked and we will have it blow towards the center of the canvas

We will start by adding in a new force with no power behind it

```javascript

  wind = {
    base: createVector(0,0),
    applyTo(obj){
      obj.applyForce(this.base);
    }
  }

  system.addForce(wind);
  
```

In the `draw` function, we will update the wind based on the mouse state

```javascript

   if (mouseIsPressed){
    wind.base.x = width/2 - mouseX;
    wind.base.y =  height/2 - mouseY;
    wind.base.normalize();
    wind.base.mult(30);
    console.log(wind.base)
  }else{
    wind.base.mult(0);
  }
  
```


### drag

We can also model _drag_, which could be from fluid or air

The drag equation is $F_D = \frac{1}{2} \rho v^{2}C_DA$
- $\rho$ (rho) - the density of the fluid
- $v$ - the speed of the object in the fluid
- $C_D$ - the drag coefficient
- $A$ - the cross section of the area

We could get formal, but we are just approximating here. We can ignore $\rho$, set the area to 1, and just deal with the velocity and the drag coefficient

```javascript

 const drag = {
    dragCoefficient: .5,
    applyTo(obj){
      // don't do anything if it isn't in the water
      if (obj.radius+obj.position.y > waterLine){
        const v = obj.velocity.copy().normalize();
        v.mult(-this.dragCoefficient * obj.velocity.magSq());
        obj.applyForce(v);
      }

    }
  }

  system.addForce(drag);
  
```


Here is our [simulation system](../sketch/2023-03-28-system), with all of the bells and whistles. 


