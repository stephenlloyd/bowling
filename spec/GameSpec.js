describe('Game', function() {
  var game;
  beforeEach(function(){
    game = new Game();
  });

  it('knows its total', function() {
    game.addFrame(Frame);
    game.roll(10);
    expect(game.rollsTotal()).toEqual(10);
  });

  it('knows when it cant calculate a total', function(){
    game.addFrame(Frame);
    expect(game.rollsTotal()).toEqual(0);
  });

  it('knows what bonuses it has', function() {
    game.addFrame(Frame);
    game.roll(10);
    expect(game.bonuses()).toEqual([[1,2]]);
  });

  it ("can calculate a grand total", function(){
    game.addFrame(Frame);
    game.addFrame(Frame);
    game.roll(10);
    game.roll(3);
    game.roll(3);
    expect(game.grandTotal()).toEqual(22);
  });

  it("doens't blow up if it can't add a bonus",function(){
    game.addFrame(Frame);
    game.roll(10);
    expect(game.grandTotal()).toEqual(10);
  });

  it("can calculate a perfect game", function(){
    for(var i = 0;i < 10; i++){
      game.addFrame(Frame);
      game.roll(10);}
    game.roll(10);
    game.roll(10);
    expect(game.grandTotal()).toEqual(300);
  });

});