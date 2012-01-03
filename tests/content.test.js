module('content');

// $(...).viewport({content: jQueryObject});
test('passed through "content" option as a jQuery object', function() {
    var content = $('<div class="content"></div>');
    var element = $('<div/>').viewport({content: content});
    var viewportContent = element.viewport('content');

    equal(viewportContent.find('.content').length, 1);
});

// $('<div><div class="content"></div></div>').viewport();
test('initial content is used if "content" option is not passed', function() {
    var element = $('<div><div class="content"></div></div>').viewport();
    var viewportContent = element.viewport('content');

    equal(viewportContent.find('.content').length, 1);
});

// $('<div><div class="content">asdasd</div></div>').viewport();
test('initial content is moved to the content frame', function() {
    var element = $('<div><div class="content">asdasd</div></div>').viewport();
    var viewportContent = element.viewport('content');

    equal(viewportContent.find('.content').length, 1);
    equal(element.children('.content').length, 0);
});

// $('<div><div class="cont"></div><div class="cont"></div></div>').viewport();
test('initial content that are several elements is moved to the content frame', function() {
    var html = 
        '<div>\
            <div class="content_1"></div>\
            <div class="content_2"></div>\
            <div class="content_3"></div>\
            <div class="content_4"></div>\
            <div class="content_5"></div>\
        </div>';

    var element = $(html).viewport();
    var viewportContent = element.viewport('content');
    
    equal(viewportContent.children().length, 5);
    equal(element.children().length, 1);
});

// $(...).viewport({content: ArrayOfDOMElements});
test('passed through "content" option as an array of DOM elements', function() {
    var content = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
    ];

    var element = $('<div/>').viewport({content: content});
    var viewportContent = element.viewport('content');

    equal(viewportContent.children().length, 5);
});