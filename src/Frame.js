function Frame(index) {
  this.index = index;
  this.pins = 10;
  this.turns = 0
}

Frame.prototype.registerGo = function(pinCount) {
  if (this.isOver()){throw("The frame is over.")};
  if(this.turns == 0){this.firstPoints = pinCount}
  this.pins -= pinCount;
  this.turns ++;
};

Frame.prototype.isOver = function() {
  return (this.pins === 0 || this.turns === 2);
}

Frame.prototype.isSpare = function() {
  return (this.pins === 0 && this.turns === 2)
};

Frame.prototype.isStrike = function() {
  return (this.pins === 0 && this.turns === 1)
}

Frame.prototype.total = function(){
  return 10 - this.pins;
}

Frame.prototype.firstScore = function(){
  return this.firstPoints;
}

Frame.prototype.bonus = function(){
  if(this.isStrike()){return {bonus_index : this.index+1, bonus_amount: "total"}};
  if(this.isSpare()){return {bonus_index : this.index+1, bonus_amount: "firstScore"}};
}
