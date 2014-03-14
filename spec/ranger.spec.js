describe("Provides a useful JavaScript micro-framework for web pages", function() {
    var app;

    beforeEach(function(){
        app = new Ranger(window, true, []);
    });

    it("Finds the root constructor for a constructor with a prototype inheritance chain", function(){
        var Test = function(){};
        var Foo = function(){};
        var Bar = function(){};
        var Baz = function(){};
        Bar.prototype = new Baz();
        Foo.prototype = new Bar();
        Test.prototype = new Foo();

        expect(app._getRootClass(Test)).toEqual(Baz);
    });

    it("Does not find the wrong root constructor for a constructor with a prototype inheritance chain", function(){
        var Test = function(){};
        var Foo = function(){};
        var Bar = function(){};
        var Baz = function(){};
        Bar.prototype = new Baz();
        Foo.prototype = new Bar();
        Test.prototype = new Foo();

        expect(app._getRootClass(Test)).not.toEqual(Foo);
    });
});