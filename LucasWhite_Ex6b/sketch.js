//Palm Tree Vectors!


var system;

var boo = true;

function setup() {
  createCanvas(600, 600);
  system = new ParticleSystem(createVector(width/2, height/2));
  background(random(160,200),random(160,200),random(160,200));
}

function draw() {
  fill(244,164,96);
  rect((width/2)-30,height/2,60,height/2);
  system.addParticle();
  system.run();
  
  boo = !boo;
  
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  
  if(boo)
  {
  this.velocity = createVector(random(-2.5,-1), random(-1, 0));
  }
  else
  {
    this.velocity = createVector(random(2.5,1), random(-1, 0));
  }
  this.position = position.copy();
  this.lifespan = 180.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  fill(0,255,120, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};