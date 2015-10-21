function Scorecard() {
  this.gameFrames = [];
  this.rolls = [];
};

Scorecard.prototype.roll = function(pins){
  this.gameFrames.filter(function(frame){
    return !frame.isOver();
  })[0].registerGo(pins);
  this.rolls.push(pins);
};

Scorecard.prototype.addFrame = function(frame) {
  this.gameFrames.push(new frame(this.gameFrames.length));
};

Scorecard.prototype.rollsTotal = function() {
  return this.gameFrames.reduce(function(a,b){return a+b.total()}, 0)
};

Scorecard.prototype.bonuses = function(){
  return this.gameFrames.filter(function(frame)
    {if(frame.bonus()){return frame.bonus();}
    }).map(function(frame){return frame.bonus()});
};

Scorecard.prototype.grandTotal = function(){
  return this.rollsTotal() + this.bonusTotal();
};

Scorecard.prototype.bonusTotal = function(){
  var rolls = this.rolls;
  var total = 0
  this.bonuses().forEach(function(bonus){
    bonus.forEach(function(rollIndex){
      if(rolls[rollIndex]){total += rolls[rollIndex]}});
  });
  return(total);
};
