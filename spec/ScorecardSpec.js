describe('Scorecard', function() {
  var scorecard;
  beforeEach(function(){
    scorecard = new Scorecard();
  });

  it('knows its total', function() {
    scorecard.addFrame(Frame);
    scorecard.roll(10);
    expect(scorecard.rollsTotal()).toEqual(10);
  });

  it('knows when it cant calculate a total', function(){
    scorecard.addFrame(Frame);
    expect(scorecard.rollsTotal()).toEqual(0);
  });

  it('knows what bonuses it has', function() {
    scorecard.addFrame(Frame);
    scorecard.roll(10);
    expect(scorecard.bonuses()).toEqual([[1,2]]);
  });

  it ("can calculate a grand total", function(){
    scorecard.addFrame(Frame);
    scorecard.addFrame(Frame);
    scorecard.roll(10);
    scorecard.roll(3);
    scorecard.roll(3);
    expect(scorecard.grandTotal()).toEqual(22);
  });

  it("doens't blow up if it can't add a bonus",function(){
    scorecard.addFrame(Frame);
    scorecard.roll(10);
    expect(scorecard.grandTotal()).toEqual(10);
  });

  it("can calculate a perfect game", function(){
    for(var i = 0;i < 10; i++){
      scorecard.addFrame(Frame);
      scorecard.roll(10);}
    scorecard.roll(10);
    scorecard.roll(10);
    expect(scorecard.grandTotal()).toEqual(300);
  });

});