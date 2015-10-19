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

  it("knows what bonuses are due for strike",function(){
    frame.registerGo(10);
    expect(frame.bonus()).toEqual([2,3]);
  });

  it("knows what bonuses are due for spare",function(){
    frame.registerGo(1);
    frame.registerGo(9);
    expect(frame.bonus()).toEqual([2]);
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

  it("knows if it is the last frame", function(){
    var frame = new Frame(9);
    expect(frame.isLastFrame()).toEqual(true);
  });

  it("knows that a strike for the last frame is not over", function(){
    var frame = new Frame(9);
    frame.registerGo(10);
    expect(frame.isOver()).toEqual(false);
  });

  it("knows that two stikes for the last frame is not over ", function(){
    var frame = new Frame(9);
    frame.registerGo(10);
    frame.registerGo(10);
    expect(frame.isOver()).toEqual(false);
  });

  it("knows that a spare on the last frame is now over", function(){
    var frame = new Frame(9);
    frame.registerGo(1);
    frame.registerGo(9);
    expect(frame.isOver()).toEqual(false);
  });

  it("can calculate the score for the last frame when two stikes", function(){
    var frame = new Frame(9);
    frame.registerGo(10);
    frame.registerGo(10);
    frame.registerGo(1);
    expect(frame.total()).toEqual(21)
  });

  it("can calculate the score for the last frame when three stikes", function(){
    var frame = new Frame(9);
    frame.registerGo(10);
    frame.registerGo(10);
    frame.registerGo(10);
    expect(frame.total()).toEqual(30)
  });
  it("can calculate the score for the last frame spare and and 5", function(){
    var frame = new Frame(9);
    frame.registerGo(9);
    frame.registerGo(1);
    frame.registerGo(5);
    expect(frame.total()).toEqual(15);
  })

  it("can knows the last frame is over when two bad throws", function(){
    var frame = new Frame(9);
    frame.registerGo(1);
    frame.registerGo(1);
    expect(frame.isOver()).toEqual(true)
  })

  it("can knows the last frame is over when two great throws", function(){
    var frame = new Frame(9);
    frame.registerGo(10);
    frame.registerGo(10);
    expect(frame.isOver()).toEqual(false)
  });

  it("can knows the last frame is not over when two alright throws", function(){
    var frame = new Frame(9);
    frame.registerGo(5);
    frame.registerGo(5);
    expect(frame.isOver()).toEqual(false)
  });

  it("can knows the last frame is over when three alright throws", function(){
    var frame = new Frame(9);
    frame.registerGo(5);
    frame.registerGo(5);
    frame.registerGo(5);
    expect(frame.isOver()).toEqual(true)
  });
});
