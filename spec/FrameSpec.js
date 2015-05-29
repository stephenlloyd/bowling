describe("Frame", function() {
  var frame;

  beforeEach(function() {
    frame = new Frame();
  });

  it("know if there is a strike", function() {
    frame.registerGo(1);
    expect(frame.isOver()).toEqual(false);
  });

});
