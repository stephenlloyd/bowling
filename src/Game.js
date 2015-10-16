function Game() {
  this.gameFrames = [];
}

Game.prototype.addFrame = function(frame) {
  this.gameFrames.push(frame);
}

Game.prototype.total = function() {
  return this.gameFrames.reduce(function(a,b){return a+b.total()}, 0)
}

Game.prototype.bonuses = function(){
  return this.gameFrames.filter(function(frame)
    {if(frame.bonus()){return frame.bonus();}
    }).map(function(frame){return frame.bonus()});
}

Game.prototype.grandTotal = function(){
  return this.total() + this.bonusTotals();
};

Game.prototype.bonusTotals = function(){
  var frames = this.gameFrames;
  return this.bonuses().map(function(bonus){
     try{
      return (frames[bonus["bonus_index"]][bonus["bonus_amount"]]());
    }catch(err){
      return 0;
    }
  }).reduce(function(a,b){return a+b}, 0);
};


