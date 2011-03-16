TestCase("common", {
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
    },

    testViewportHasOverflowPropertySetToHidden: function() {
        var viewport = $('<div></div>').viewport();

        assertEquals('hidden', viewport.css('overflow'));
    },

    testViewportHasPositionPropertySetToRelative: function() {
        var viewport = $('<div></div>').viewport();

        assertEquals('relative', viewport.css('position'));
    },

    testViewportHasCorrectDOMStructure: function() {
        var viewport = $('<div></div>').viewport();

        var binder = viewport.find('.' + this.defaults.binderClass);
        var content = binder.find('.' + this.defaults.contentClass);

        assertEquals(1, binder.length);
        assertEquals(1, content.length);
    },

    testViewportBinderHasPositionPropertySetToAbsolute: function() {
        var viewport = $('<div></div>').viewport();
        var binder = viewport.find('.' + this.defaults.binderClass);

        assertEquals('absolute', binder.css('position'));
    },

    testViewportContentHasPositionPropertySetToAbsolute: function() {
        var viewport = $('<div></div>').viewport();
        var binder = viewport.find('.' + this.defaults.binderClass);
        var content = binder.find('.' + this.defaults.contentClass);

        assertEquals('absolute', content.css('position'));
    },

    // $(...).viewport({content: content});
    testViewportContentHasElementPassedThroughOptionContent: function() {
        var content = $('<div class="content"></div>');
        var viewport = $('<div></div>').viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $(...).viewport(content);
    testViewportContentHasElementPassedThroughFirstParamAsJQueryObject: function() {
        var content = $('<div class="content"></div>');
        var viewport = $('<div></div>').viewport(content);
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $(...).viewport(content.get(0));
    testViewportContentHasElementPassedThroughFirstParamAsDOMElement: function() {
        var content = $('<div class="content"></div>');
        var viewport = $('<div></div>').viewport(content.get(0));
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $(...).viewport();
    testViewportContentHasElementThatInitiallyWasInTheViewportElementIfContentParamIsNotSet: function() {
        var viewport = $('<div><div class="content"></div></div>').viewport();
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1, viewportContent.find('.content').length);
    },

    testViewportContentHasTheSameSizeAsElementPassedThroughOptionContent: function() {
        var content = $('<div class="content"></div>');
        content.height(100);
        content.width(100);
        
        var viewport = $('<div></div>').viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

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

        var viewport = element.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);

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

        var viewport = element.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);

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

        var viewport = element.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

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

        var viewport = element.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);

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

        var viewport = element.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals('100px', viewportContent.css('left'));
        assertEquals('100px', viewportContent.css('top'));
    },

    testViewportHasCorrectDOMStructureIfContentInitiallyIsInTheBody: function() {
        var content = $('<div class="content"></div>');
        var viewport = $('<div class="viewport"></div>');

        $(document.body).append(content);
        $(document.body).append(viewport);

        viewport.viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1, viewportBinder.length);
        assertEquals(1, viewportContent.length);
        assertEquals(1, viewportContent.find('.content').length);
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

    testViewportIsUpdatedAfterViewportSizeIsChangedAndUpdateMethodIsCalled: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        element.viewport({content: content});

        element.height(300);
        element.width(300);
        element.viewport('update');

        var viewportBinder = element.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1100, viewportBinder.height());
        assertEquals(1100, viewportBinder.width());
        assertEquals('200px', viewportContent.css('left'));
        assertEquals('200px', viewportContent.css('top'));
    },

    testUpdateMethodReturnsReferenceToJQueryObjectThatHasBeenPrcessed: function() {
        var element = $('<div></div>');
        var content = $('<div class="content"></div>');

        element.viewport({content: content});

        var result = element.viewport('update');

        assertEquals(result, element);
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

        var viewportBinder = element.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1100, viewportBinder.height());
        assertEquals(1100, viewportBinder.width());
        assertEquals('250px', viewportContent.css('left'));
        assertEquals('250px', viewportContent.css('top'));
    },

    testContentBoxHasCorrectPositionAfterItWasDraggedAndViewportSizeBecomeBigger: function() {
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

        element.height(600);
        element.width(600);
        element.viewport('update');

        element.height(650);
        element.width(650);
        element.viewport('update');

        var viewportBinder = element.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(750, viewportBinder.height());
        assertEquals(750, viewportBinder.width());
        assertEquals('0px', viewportContent.css('left'));
        assertEquals('0px', viewportContent.css('top'));
    },
    
    testContentBoxSizeIsChangedAfterSizeMethodIsCalled: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        element.viewport({content: content});
        element.viewport('size', 1000, 2000);

        var viewportBinder = element.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1000, viewportContent.height());
        assertEquals(2000, viewportContent.width());
    },

    testBinderBoxSizeIsChangedAfterSizeMethodAndUpdateMethodIsCalled: function() {
        var element = $('<div></div>');
        element.height(500);
        element.width(500);

        var content = $('<div class="content"></div>');
        content.height(700);
        content.width(700);

        element.viewport({content: content});
        element.viewport('size', 1000, 2000);
        element.viewport('update');

        var viewportBinder = element.find('.' + this.defaults.binderClass);

        assertEquals(1500, viewportBinder.height());
        assertEquals(3500, viewportBinder.width());
    },

    testSizeMethodReturnsReferenceToJQueryObjectThatHasBeenPrcessed: function() {
        var element = $('<div></div>');
        var content = $('<div class="content"></div>');

        element.viewport({content: content});
        
        var result = element.viewport('size', 1000, 2000);

        assertEquals(result, element);
    },

    testContentMethodReturnsJQueryObjectWithContentElement: function() {
        var element = $('<div></div>');
        var content = $('<div class="content"></div>');

        element.viewport({content: content});

        assertTrue(element.viewport('content').hasClass(this.defaults.contentClass));
    },

    testBinderMethodReturnsJQueryObjectWithBinderElement: function() {
        var element = $('<div></div>');
        var content = $('<div class="content"></div>');

        element.viewport({content: content});

        assertTrue(element.viewport('binder').hasClass(this.defaults.binderClass));
    },

    testSizeMethodReturnsWidthAndHeightIfItIsCalledWithoutParameters: function() {
        var element = $('<div></div>');
        var content = $('<div class="content"></div>');
        var height = 100;
        var width = 200;

        element.viewport({content: content});
        element.viewport('size', height, width);

        var size = element.viewport('size');

        assertEquals(height, size.height);
        assertEquals(width, size.width);
    },

    testElementThatInitiallyWasInTheViewportElementMovedToContentIfContentParamIsNotSet: function() {
        var viewport = $('<div><div class="content"></div></div>').viewport();
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1, viewportContent.find('.content').length);
        assertEquals(0, viewport.children('.content').length);
    },

    testElementsThatInitiallyWereInTheViewportElementMovedToContentIfContentParamIsNotSet: function() {
        /*:DOC html = <div>
            <div class="content_1"></div>
            <div class="content_2"></div>
            <div class="content_3"></div>
            <div class="content_4"></div>
            <div class="content_5"></div>
            </div>
        */

        var viewport = $(this.html).viewport();
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(5, viewportContent.children().length);
        assertEquals(1, viewport.children().length);
    },

    testAllElementsThatArePassedAsArrayThroughContentParamAreAdded: function() {
        var content = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ];

        var viewport = $('<div></div>').viewport(content);
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(5, viewportContent.children().length);
    },

    testAllElementsThatArePassedAsArrayThroughContentParamInOptionsObjectAreAdded: function() {
        var content = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ];

        var viewport = $('<div></div>').viewport({content: content});
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(5, viewportContent.children().length);
    },

    testContentElementHasCorrectSizeIfHeightAndWeightParamsArePassed: function() {
        var content = $('<div></div>');
        var viewport = $('<div></div>').viewport({
            content: content,
            height: 1000,
            width: 2000
        });
        var viewportBinder = viewport.find('.' + this.defaults.binderClass);
        var viewportContent = viewportBinder.find('.' + this.defaults.contentClass);

        assertEquals(1000, viewportContent.height());
        assertEquals(2000, viewportContent.width());
    }
    
});