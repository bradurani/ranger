describe("Gives modules an fully featured ajax helper", function(){
    var helper;
    var $;
    var console;

    beforeEach(function(){
        $ = {
            ajax: function(){}
        };
        console = {
            log : function(){ }
        };
        helper = Ranger.getHelperTestObject('ajax', [$, RSVP.Promise, console]);
        spyOn($, 'ajax');
        spyOn(console, 'log').and.callThrough();
    });

    it("calls jquery.ajax on _send", function(){
        var data = { url: "http://foo", foo: "bar" };
        expect(helper._send(data)).toBeTruthy();
        expect($.ajax).toHaveBeenCalledWith(data);
        expect(console.log.calls.count()).toEqual(1);
    });

    it("calls console.log on Promise fulfill", function(){
        //how to?
    });
});