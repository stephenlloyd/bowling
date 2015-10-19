function Frame(index) {
  this.index = index;
  this.pins = 0;
  this.turns = 0
}

Frame.prototype.registerGo = function(pinCount) {
  if (this.isOver()){throw("The frame is over.")};
  this.pins += pinCount;
  this.turns ++;
};

Frame.prototype.isOver = function() {
  if(this.isLastFrame()){return this.isLastFrameOver();
  }else{
  return (this.pins === 10 || this.turns === 2);}
};

Frame.prototype.isLastFrameOver = function(){
  return ((this.turns === 2 && this.pins < 10) || (this.score === 20) || (this.turns === 3));
};

Frame.prototype.isSpare = function() {
  return (this.pins === 10 && this.turns === 2)
};

Frame.prototype.isStrike = function() {
  return (this.pins === 10 && this.turns === 1)
};

Frame.prototype.total = function(){
  return this.pins;
};


Frame.prototype.bonus = function(){
  if(this.isStrike()){return [this.index+1, this.index+2]};
  if(this.isSpare()){return [this.index+1]};
};

Frame.prototype.isLastFrame = function(){
  return this.index === 9;
};
