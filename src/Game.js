function Game() {
  this.gameFrames = [];
  this.rolls = [];
};

Game.prototype.roll = function(pins){
  this.gameFrames.filter(function(frame){
    return !frame.isOver();
  })[0].registerGo(pins);
  this.rolls.push(pins);
};

Game.prototype.addFrame = function(frame) {
  this.gameFrames.push(new frame(this.gameFrames.length));
};

Game.prototype.rollsTotal = function() {
  return this.gameFrames.reduce(function(a,b){return a+b.total()}, 0)
};

Game.prototype.bonuses = function(){
  return this.gameFrames.filter(function(frame)
    {if(frame.bonus()){return frame.bonus();}
    }).map(function(frame){return frame.bonus()});
};

Game.prototype.grandTotal = function(){
  return this.rollsTotal() + this.bonusTotal();
};

Game.prototype.bonusTotal = function(){
  var rolls = this.rolls;
  var total = 0
  this.bonuses().forEach(function(bonus){
    bonus.forEach(function(rollIndex){
      if(rolls[rollIndex]){total += rolls[rollIndex]}});
  });
  return(total);
};
