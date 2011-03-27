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
    },

    // $(...).viewport({position: 'top'});
    testPositionParamContentFramePostionSetToTop: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'top'});
        
        var viewportContent = element.viewport('content');

        assertEquals('100px', viewportContent.css('top'));
    },

    // $(...).viewport({position: 'bottom'});
    testPositionParamContentFramePostionSetToBottom: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'bottom'});

        var viewportContent = element.viewport('content');

        assertEquals('0px', viewportContent.css('top'));
    },

    // $(...).viewport({position: 'center'});
    testPositionParamContentFramePostionSetToCenter: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'center'});

        var viewportContent = element.viewport('content');

        assertEquals('50px', viewportContent.css('top'));
    },

    // $(...).viewport({position: 'left'});
    testPositionParamContentFramePostionSetToLeft: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'left'});

        var viewportContent = element.viewport('content');

        assertEquals('100px', viewportContent.css('left'));
    },

    // $(...).viewport({position: 'right'});
    testPositionParamContentFramePostionSetToRight: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'right'});

        var viewportContent = element.viewport('content');

        assertEquals('0px', viewportContent.css('left'));
    },

    // $(...).viewport({position: 'top left'});
    testPositionParamContentFramePostionSetToTopLeft: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'top left'});

        var viewportContent = element.viewport('content');

        assertEquals('100px', viewportContent.css('top'));
        assertEquals('100px', viewportContent.css('left'));
    },

    // $(...).viewport({position: 'top right'});
    testPositionParamContentFramePostionSetToTopRight: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'top right'});

        var viewportContent = element.viewport('content');

        assertEquals('100px', viewportContent.css('top'));
        assertEquals('0px', viewportContent.css('left'));
    },

    // $(...).viewport({position: 'bottom left'});
    testPositionParamContentFramePostionSetToBottomLeft: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'bottom left'});

        var viewportContent = element.viewport('content');

        assertEquals('0px', viewportContent.css('top'));
        assertEquals('100px', viewportContent.css('left'));
    },

    // $(...).viewport({position: 'bottom right'});
    testPositionParamContentFramePostionSetToBottomRight: function() {
        var element = $('<div></div>').height(100).width(100);
        var content = $('<div></div>').height(200).width(200);

        element.viewport({content: content, position: 'bottom right'});

        var viewportContent = element.viewport('content');

        assertEquals('0px', viewportContent.css('top'));
        assertEquals('0px', viewportContent.css('left'));
    }
});