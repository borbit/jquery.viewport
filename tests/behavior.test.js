TestCase("behavior", {
    setUp: function() {
        this.defaults = $.fn.viewport.defaults;
    },

    testReturnsJQueryObject: function() {
        var viewport = $('<div></div>').viewport();

        assertObject(viewport);
        assertNotUndefined(viewport.jquery);
    },

    testDefaultOptions: function() {
        assertNotUndefined(this.defaults.content);
        assertNotUndefined(this.defaults.binderClass);
        assertNotUndefined(this.defaults.contentClass);
        assertNotUndefined(this.defaults.height);
        assertNotUndefined(this.defaults.width);
    },

    testViewportHasOverflowPropertySetToHidden: function() {
        var viewport = $('<div></div>').viewport();

        assertEquals('hidden', viewport.css('overflow'));
    },

    testViewportHasPositionPropertySetToRelative: function() {
        var element = $('<div></div>').viewport();

        assertEquals('relative', element.css('position'));
    },

    testViewportHasCorrectDOMStructure: function() {
        var element = $('<div></div>').viewport();

        var binder = element.viewport('binder');
        var content = element.viewport('content');

        assertEquals(1, binder.length);
        assertEquals(1, content.length);
    },

    testViewportBinderHasPositionPropertySetToAbsolute: function() {
        var element = $('<div></div>').viewport();
        var binder = element.viewport('binder');

        assertEquals('absolute', binder.css('position'));
    },

    testViewportContentHasPositionPropertySetToAbsolute: function() {
        var element = $('<div></div>').viewport();
        var binder = element.viewport('binder');
        var content = element.viewport('content');

        assertEquals('absolute', content.css('position'));
    },

    testViewportContentHasTheSameSizeAsElementPassedThroughOptionContent: function() {
        var content = $('<div class="content"></div>');
        content.height(100);
        content.width(100);
        
        var element = $('<div></div>').viewport({content: content});
        var viewportBinder = element.viewport('binder');
        var viewportContent = element.viewport('content');

        assertEquals(content.height(), viewportContent.height());
        assertEquals(content.width(), viewportContent.width());
    },

    testBinderBoxHasTheSameSizeAsAContentBoxIfContentBoxIsSmallerThenViewportBox: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(100);
        content.width(100);

        element.viewport({content: content});
        var viewportBinder = element.viewport('binder');

        assertEquals(100, viewportBinder.height());
        assertEquals(100, viewportBinder.width());
    },

    testBinderBoxIsInTheCenterIfContentBoxIsSmallerThenViewportBox: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(100);
        content.width(100);

        element.viewport({content: content});
        var viewportBinder = element.viewport('binder');

        element.appendTo(document.body);

        assertEquals('200px', viewportBinder.css('left'));
        assertEquals('200px', viewportBinder.css('top'));
    },

    testContentBoxHasLeftAndTopPropertiesSetTo0IfItIsSmallerThenViewportBox: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(100);
        content.width(100);

        element.viewport({content: content});
        var viewportBinder = element.viewport('binder');
        var viewportContent = element.viewport('content');

        element.appendTo(document.body);

        assertEquals('0px', viewportContent.css('left'));
        assertEquals('0px', viewportContent.css('top'));
    },

    testBinderBoxHasCorrectSizeIfContentBoxIsBiggerThenViewportBox: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        var viewport = element.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);

        assertEquals(900, viewportBinder.height());
        assertEquals(900, viewportBinder.width());
    },

    testBinderBoxIsInTheCenterIfContentBoxIsBiggerThenViewportBox: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        element.viewport({content: content});
        var viewportBinder = element.viewport('binder');

        element.appendTo(document.body);

        assertEquals('-200px', viewportBinder.css('left'));
        assertEquals('-200px', viewportBinder.css('top'));
    },

    testContentBoxHasCorrectLeftAndTopPropertiesIfItIsBiggerThenViewportBox: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        element.viewport({content: content});
        var viewportBinder = element.viewport('binder');
        var viewportContent = element.viewport('content');

        element.appendTo(document.body);

        assertEquals('100px', viewportContent.css('left'));
        assertEquals('100px', viewportContent.css('top'));
    },

    testOnlyFirstFetchedElementIsProcessedAsViewport: function() {
        var content = $('<div class="content"></div>');

        $(document.body).append($('<div class="viewport"></div>'));
        $(document.body).append($('<div class="viewport"></div>'));

        $('.viewport').viewport({content: content});

        var viewport_1 = $('.viewport').eq(0);
        var viewport_2 = $('.viewport').eq(1);

        assertEquals(1, viewport_1.find('.' + this.defaults.binderClass).length);
        assertEquals(0, viewport_2.find('.' + this.defaults.binderClass).length);
    },

    testContentBoxHasCorrectPositionAfterItWasDraggedAndViewportSizeBecomeSmaller: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        element.viewport({content: content});

        content.trigger('dragstart');
        content.css('left', 50);
        content.css('top', 50);
        content.trigger('dragstop', {position: {left: 50, top: 50}});

        element.height(300);
        element.width(300);
        element.viewport('update');

        var viewportBinder = element.viewport('binder');
        var viewportContent = element.viewport('content');

        element.appendTo(document.body);
        
        assertEquals(1100, viewportBinder.height());
        assertEquals(1100, viewportBinder.width());
        assertEquals('250px', viewportContent.css('left'));
        assertEquals('250px', viewportContent.css('top'));
    },

    testContentBoxHasCorrectPositionAfterItWasDraggedAndViewportSizeBecomeBigger: function() {
        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        element.viewport(content)

        content.trigger('dragstart');
        content.css('left', 50);
        content.css('top', 50);
        content.trigger('dragstop', {position: {left: 50, top: 50}});

        element.height(650);
        element.width(650);
        element.viewport('update');

        var viewportBinder = element.viewport('binder');
        var viewportContent = element.viewport('content');

        element.appendTo(document.body);

        assertEquals(750, viewportBinder.height());
        assertEquals(750, viewportBinder.width());
        assertEquals('0px', viewportContent.css('left'));
        assertEquals('0px', viewportContent.css('top'));
    }
});