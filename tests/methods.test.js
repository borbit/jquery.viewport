TestCase("methods", {
    testHeightMethodChangesContentFrameHeight: function() {
        var element = $('<div></div>').viewport();
        element.viewport('height', 1000);

        var viewportContent = element.viewport('content');

        assertEquals(1000, viewportContent.height());
    },

    testHeightMethodIsCalledWithoutParamReturnsHeight: function() {
        var height = 100;

        var element = $('<div></div>').viewport({height: height, width: 200});

        assertEquals(height, element.viewport('height'));
    },

    testWidthMethodChangesContentFrameWidth: function() {
        var width = 1000;

        var element = $('<div></div>').viewport();
        element.viewport('width', width);

        var viewportContent = element.viewport('content');

        assertEquals(width, viewportContent.width());
    },

    testWidthMethodIsCalledWithoutParamReturnsWidth: function() {
        var width = 100;

        var element = $('<div></div>').viewport({width: width, height: 200});

        assertEquals(width, element.viewport('width'));
    },

    testAdjustMethodAdjustsBinderFrameAfterViewportSizeIsChanged: function() {
        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        var element = $('<div></div>').viewport({content: content});
        element.height(300);
        element.width(300);
        
        element.viewport('adjust');

        var viewportBinder = element.viewport('binder');

        element.appendTo(document.body);

        assertEquals(1100, viewportBinder.height());
        assertEquals(1100, viewportBinder.width());
    },

    testAdjustMethodAdjustsContentFramePositionViewportSizeIsChanged: function() {
        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        var element = $('<div></div>').viewport({content: content});
        element.height(300);
        element.width(300);

        element.viewport('adjust');

        var viewportContent = element.viewport('content');

        element.appendTo(document.body);

        assertEquals('200px', viewportContent.css('left'));
        assertEquals('200px', viewportContent.css('top'));
    },

    testAdjustMethodAdjustsBinderFrameSizeIfContentFrameSizeIsChanged: function() {
        var element = $('<div></div>').viewport();

        element.height(500);
        element.width(500);

        element.viewport('size', 1000, 2000);
        element.viewport('adjust');

        var viewportBinder = element.viewport('binder');

        assertEquals(1500, viewportBinder.height());
        assertEquals(3500, viewportBinder.width());
    },

    testUpdateMethodUpdatesContentFrameSizeIfContentIsChanged: function() {
        var content = $('<div></div>').height(1000).width(1000);
        var element = $('<div></div>').height(500).width(500);

        element.viewport({content: content})

        content.height(700).width(800);

        element.viewport('update');

        var viewportContent = element.viewport('content');

        assertEquals(700, viewportContent.height());
        assertEquals(800, viewportContent.width());
    },

    testUpdateMethodReturnsReferenceToJQueryObject: function() {
        var element = $('<div></div>').viewport();

        assertEquals(element.viewport('update'), element);
    },

    testSizeMethodChangesContentFrameSize: function() {
        var element = $('<div></div>').viewport();

        element.viewport('size', 1000, 2000);
        var viewportContent = element.viewport('content');

        assertEquals(1000, viewportContent.height());
        assertEquals(2000, viewportContent.width());
    },

    testSizeMethodIsCalledWithoutParamsReturnsWidthAndHeight: function() {
        var height = 100;
        var width = 200;

        var element = $('<div></div>').viewport();

        element.viewport('size', height, width);

        var size = element.viewport('size');

        assertEquals(height, size.height);
        assertEquals(width, size.width);
    },

    testSizeMethodReturnsReferenceToJQueryObject: function() {
        var element = $('<div></div>').viewport();

        assertEquals(element, element.viewport('size', 1000, 2000));
    },

    testContentMethodReturnsJQueryObjectWithContentElement: function() {
        var element = $('<div></div>').viewport();

        assertTrue(element.viewport('content').hasClass(element.viewport('option', 'contentClass')));
    },

    testBinderMethodReturnsJQueryObjectWithBinderElement: function() {
        var element = $('<div></div>').viewport();
        
        assertTrue(element.viewport('binder').hasClass(element.viewport('option', 'binderClass')));
    }
});