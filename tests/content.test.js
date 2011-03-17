TestCase("content", {
    // $(...).viewport({content: jQueryObject});
    testPassingThroughOptionContentAsJQueryObject: function() {
        var content = $('<div class="content"></div>');
        var element = $('<div></div>').viewport({content: content});
        var viewportContent = element.viewport('content');

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $(...).viewport(jQueryObject);
    testPassingThroughFirstParamAsJQueryObject: function() {
        var content = $('<div class="content"></div>');
        var element = $('<div></div>').viewport(content);
        var viewportContent = element.viewport('content');

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $(...).viewport(DOMElement);
    testPassingThroughFirstParamAsDOMElement: function() {
        var content = $('<div class="content"></div>');
        var element = $('<div></div>').viewport(content.get(0));
        var viewportContent = element.viewport('content');

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $('<div><div class="content"></div></div>').viewport();
    testInitiallContentPassedIfParamIsNotSet: function() {
        var element = $('<div><div class="content"></div></div>').viewport();
        var viewportContent = element.viewport('content');

        assertEquals(1, viewportContent.find('.content').length);
    },

    // $('<div><div class="content"></div></div>').viewport();
    testInitiallContentMovedIfContentParamIsNotSet: function() {
        var element = $('<div><div class="content">asdasd</div></div>').viewport();
        var viewportContent = element.viewport('content');

        assertEquals(1, viewportContent.find('.content').length);
        assertEquals(0, element.children('.content').length);        
    },

    // $('<div><div class="cont"></div><div class="cont"></div></div>').viewport();
    testInitiallContentThatAreSeveralElementsAreMovedIfContentParamIsNotSet: function() {
        /*:DOC html = <div>
            <div class="content_1"></div>
            <div class="content_2"></div>
            <div class="content_3"></div>
            <div class="content_4"></div>
            <div class="content_5"></div>
            </div>
        */

        var element = $(this.html).viewport();
        var viewportContent = element.viewport('content');

        assertEquals(5, viewportContent.children().length);
        assertEquals(1, element.children().length);
    },

    // $(...).viewport(ArrayOfDOMElements);
    testPassingThroughContentParamAsArrayOfDOMElements: function() {
        var content = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ];

        var element = $('<div></div>').viewport(content);
        var viewportContent = element.viewport('content');

        assertEquals(5, viewportContent.children().length);
    },

    // $(...).viewport({content: ArrayOfDOMElements});
    testPassingThroughContentOptionAsArrayOfDOMElements: function() {
        var content = [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        ];

        var element = $('<div></div>').viewport({content: content});
        var viewportContent = element.viewport('content');

        assertEquals(5, viewportContent.children().length);
    }
})