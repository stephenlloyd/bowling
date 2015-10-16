describe('Game', function() {
  var game;
  beforeEach(function(){
    game = new Game();
  });

  it('knows its total', function() {
    var frame = {total : function(){return 10} };
    game.addFrame(frame);
    expect(game.total()).toEqual(10);
  });

  it('knows when it cant calculate a total', function(){
    var frame = { total : function(){return null} };
    game.addFrame(frame);
    expect(game.total()).toEqual(0);
  });

  it('knows what bonuses it has', function() {
    var frame = {total : function(){return 10}, bonus : function() { return {bonus_index: 1, bonus_amount : "total"}}};
    game.addFrame(frame);
    expect(game.bonuses()).toEqual([{bonus_index: 1, bonus_amount : "total"}]);
  });

  it ("can calculate a grand total", function(){
    var frame = {total : function(){return 10}, bonus : function() { return {bonus_index: 1, bonus_amount : "total"}}};
    var frameTwo = {total : function(){return 3}, bonus : function(){}};
    game.addFrame(frame);
    game.addFrame(frameTwo);
    expect(game.grandTotal()).toEqual(16);
  });

  it("doens't blow up if it can't add a bonus",function(){
    var frame = {total : function(){return 10}, bonus : function() { return {bonus_index: 1, bonus_amount : "total"}}};
    game.addFrame(frame);
    expect(game.grandTotal()).toEqual(10);
  });


});