const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;

var cannon;
var angle;

var cannonball;

var balls = [];

function preload(){
  backgroundImg = loadImage("assets/background.gif");
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angle = -PI/4;

  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 130, 100, angle);

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);

  image(backgroundImg, 0, 0, width, height);
  tower.display();
  cannon.display();

  for (var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
  }

  Engine.update(engine);
}

function keyReleased() {
  if (keyCode == DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW){
    cannonball = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonball);
  }
}

function showCannonBalls(ball, index){
ball.display();
if( ball.body.position.x >= width || ball.body.position.y >= height - 50){
  World.remove(world, ball.body);
  balls.splice(index, 1);
}
}
