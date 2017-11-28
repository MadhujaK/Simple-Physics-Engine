function Particle(x,y) {
  this.pos = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.show = function() {
    stroke(255, 20);
    strokeWeight(4);
    point(this.pos.x,this.pos.y);
  }
  this.update = function() {
    this.vel.add(this.acc);
    //this.vel.limit(5);
    this.pos.add(this.vel);
    //this.acc.mult(0);
  }
  this.attracted = function(target) {
    var force = p5.Vector.sub(target, this.pos);
    var dsq = force.magSq();
    dsq = constrain(dsq, 25, 500);
    var G = 6;
    var magni = G / dsq;
    force.setMag(magni);
    this.acc = force;
  }
}
var attractor;
var particles = [];

function setup() {
  createCanvas(400,400);
  background(51);
  attractor = createVector(200,200);
  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(200,100));
  }
  
}
function draw() {
  
  stroke(255);
  strokeWeight(4);
  point(attractor.x,attractor.y); 
  for(var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    particle.show();
    particle.update();
    particle.attracted(attractor);
  }
  
}
