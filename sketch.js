const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var button
var bunny;
var fr,rope2;
var cut_sound;
var eating_sound;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var bg_img;
var food;
var rabbit;

let engine;
let world;
var rope,fruit,ground;

var canW,canH

function preload()
{
  rabbit = loadImage('Rabbit.png');
  food = loadImage('apple.png');
  bg_img = loadImage('background.jpg');
 
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');

}

function setup() {
  engine = Engine.create();
  world = engine.world;
 
  var isMobile=/iphone|ipad|ipod|android/i.test(navigator.userAgent)
  if(isMobile){
    canW=displayWidth
    canH=displayHeight
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW=windowWidth
    canH=windowHeight
    createCanvas(windowWidth+80,windowHeight);
  }
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40})
  rope3 = new Rope(4,{x:400,y:225})
  ground = new Ground(200,canH,600,20);
 
  bunny = createSprite(420,canH-80,100,100);
  bunny.addImage('rabbitImg',rabbit)
  bunny.scale = 0.2;
 
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  
  button = createImg('cut_button.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_button.png')
  button2.size(50,50)
  button2.mouseClicked(drop2)
  button2.position(330,35)

  button3 = createImg('cut_button.png')
  button3.size(50,50)
  button3.mouseClicked(drop3)
  button3.position(360,200)
  
  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit)
  fruit_con_3 = new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() {
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  Engine.update(engine);
  rope.show();
  rope2.show();
  rope3.show();
  ground.show();

  if(collide(fruit,bunny)===true){
    eating_sound.play();
  }
 
  drawSprites();
}

function drop(){
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
  rope.break(); 
}

function drop2(){
  fruit_con_2.detach();
  fruit_con_2 = null; 
  cut_sound.play();
  rope2.break();
}

function drop3(){
  fruit_con_3.detach();
  fruit_con_3 = null; 
  cut_sound.play();
  rope3.break();
}

function collide(body,sprite)
{
  if(body!=null)
  {
  var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
  if(d<=80)
  {
  World.remove(engine.world,fruit);
  fruit = null;
  return true; 
  }
  else{
  return false;
  }
  }
}





