TestCase("options", {
    testHeightAndWeightParamsContentElementHasCorrectSize: function() {
        var element = $('<div></div>').viewport({height: 1000, width: 2000});
        var viewportContent = element.viewport('content');

        assertEquals(1000, viewportContent.height());
        assertEquals(2000, viewportContent.width());
    },

    testContentClassParamContentElementHasCorrectClass: function() {
        var myClass = 'myClass';
        
        var element = $('<div></div>').viewport({contentClass: myClass});
        var viewportContent = element.viewport('content');

        assertTrue(viewportContent.hasClass(myClass));
    },

    testBinderClassParamBinderElementHasCorrectClass: function() {
        var myClass = 'myClass';

        var element = $('<div></div>').viewport({binderClass: myClass});
        var viewportBinder = element.viewport('binder');

        assertTrue(viewportBinder.hasClass(myClass));
    }
});