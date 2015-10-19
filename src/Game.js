function Game() {
  this.gameFrames = [new Frame(0), new Frame(1),new Frame(2),new Frame(3),new Frame(4),new Frame(5),new Frame(6),new Frame(7),new Frame(8),new Frame(9)];
  this.rolls = [];
};

Game.prototype.roll = function(pins){
  this.gameFrames.filter(function(frame){
    return !frame.isOver();
  })[0].registerGo(pins);
  this.rolls.push(pins);
};

Game.prototype.addFrame = function(frame) {
  this.gameFrames.push(frame);
};

Game.prototype.total = function() {
  return this.gameFrames.reduce(function(a,b){return a+b.total()}, 0)
};

Game.prototype.bonuses = function(){
  return this.gameFrames.filter(function(frame)
    {if(frame.bonus()){return frame.bonus();}
    }).map(function(frame){return frame.bonus()});
};

Game.prototype.grandTotal = function(){
  return this.total() + this.bonusTotals();
};

Game.prototype.bonusTotals = function(){
  var rolls = this.rolls;
  var total = 0
  this.bonuses().forEach(function(bonus){
    bonus.forEach(function(rollIndex){
      if(rolls[rollIndex]){total += rolls[rollIndex]}});
  });
  return(total);
};



  // var frames = this.gameFrames;
  // return this.bonuses().map(function(bonus){
  //    try{ return (frames[bonus["bonus_index"]][bonus["bonus_amount"]]());
  //   }catch(err){return 0;}
  // }).reduce(function(a,b){return a + b }, 0);
