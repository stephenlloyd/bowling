describe("Frame", function() {
  var frame;

  beforeEach(function() {
    frame = new Frame(1);
  });

  it("knows that it is not over", function() {
    frame.registerGo(1);
    expect(frame.isOver()).toEqual(false);
  });

  it("knows its total",function(){
    frame.registerGo(4);
    expect(frame.total()).toEqual(4)
  });

  it("knows the total for the first roll",function(){
    frame.registerGo(1);
    frame.registerGo(9);
    expect(frame.firstScore()).toEqual(1);
  });

  it("knows what bonuses are due for strike",function(){
    frame.registerGo(10);
    expect(frame.bonus()).toEqual({bonus_index: 2, bonus_amount: "total"});
  });

  it("knows what bonuses are due for spare",function(){
    frame.registerGo(1);
    frame.registerGo(9);
    expect(frame.bonus()).toEqual({bonus_index: 2, bonus_amount: "firstScore"});
  });

  describe('knows that it is over', function() {

    it("after two turns", function() {
      frame.registerGo(5);
      frame.registerGo(4);
      expect(frame.isOver()).toEqual(true);
    });

    it("after a stike", function() {
      frame.registerGo(10);
      expect(frame.isOver()).toEqual(true);
    })

    it("after a spare", function() {
      frame.registerGo(9);
      frame.registerGo(1);
      expect(frame.isOver()).toEqual(true);
    })

  });

  it('knows that it is a spare', function() {
    frame.registerGo(5);
    frame.registerGo(5);
    expect(frame.isSpare()).toEqual(true);
  });

  it('knows that it is a strike', function(){
    frame.registerGo(10);
    expect(frame.isStrike()).toEqual(true);
  });

  it('go cannot be registered when frame is over', function() {
    frame.registerGo(10);
    expect(function() { frame.registerGo(6) })
      .toThrow('The frame is over.')
  })
});
