class Ground 
{
  constructor(x, y, w,h) 
  {
    let options = {
     isStatic:true
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.h = h;
    this.w = w;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    fill(148,127,146);
    rect(pos.x,pos.y, this.w, this.h);
    noStroke();
    pop();
  }
}
