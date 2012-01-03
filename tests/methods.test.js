module('"height" method');

test('changes content frame\'s height', function() {
    var element = $('<div/>').viewport();
    var content = element.viewport('content');
    
    element.viewport('height', 1000);

    equal(content.height(), 1000);
});

test('returns content frame\'s height when is called without param', function() {
    var height = 100;
    var element = $('<div/>').viewport({height: height, width: 200});

    equal(element.viewport('height'), height);
});

module('"width" method');

test('changes content frame\'s width', function() {
    var width = 1000;
    var element = $('<div/>').viewport();
    var viewportContent = element.viewport('content');
    
    element.viewport('width', width);

    equal(viewportContent.width(), width);
});

test('returns content frame\'s width when is called without param', function() {
    var width = 100;
    var element = $('<div/>').viewport({width: width, height: 200});

    equal(element.viewport('width'), width);
});

module('"adjust" method');

test('adjusts binder frame after viewport size is changed', function() {
    var content = $('<div class="content"></div>');
    content.height(700);
    content.width(700);

    var element = $('<div/>').viewport({content: content});
    var viewportBinder = element.viewport('binder');
    element.height(300);
    element.width(300);
    
    element.viewport('adjust');
    element.appendTo(document.body);
    
    equal(viewportBinder.height(), 1100);
    equal(viewportBinder.width(), 1100);
    
    element.remove();
});

test('adjusts content frame position after viewport size is changed', function() {
    var content = $('<div class="content"></div>');
    content.height(700);
    content.width(700);

    var element = $('<div/>').viewport({content: content});
    var viewportContent = element.viewport('content');
    element.height(300);
    element.width(300);

    element.viewport('adjust');
    element.appendTo(document.body);

    equal(viewportContent.css('left'), '200px');
    equal(viewportContent.css('top'), '200px');
    
    element.remove();
});

test('adjusts binder frame\'s size after content size is changed', function() {
    var element = $('<div/>').viewport();
    var viewportBinder = element.viewport('binder');
    element.height(500);
    element.width(500);

    element.viewport('size', 1000, 2000);
    element.viewport('adjust');

    equal(viewportBinder.height(), 1500);
    equal(viewportBinder.width(), 3500);
});

module('"update" method');

test('updates content frame size after content size is changed', function() {
    var content = $('<div/>').height(1000).width(1000);
    var element = $('<div/>').height(500).width(500);

    element.viewport({content: content})

    content.height(700).width(800);

    element.viewport('update');

    var viewportContent = element.viewport('content');

    equal(viewportContent.height(), 700);
    equal(viewportContent.width(), 800);
});

test('returns reference to jQuery object', function() {
    var element = $('<div/>').viewport();

    equal(element.viewport('update'), element);
});

test('updates content frame\'s position after it was dragged and viewport size become smaller', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(700);
    content.width(700);
    
    element.viewport({content: content});

    var viewportBinder = element.viewport('binder');
    var viewportContent = element.viewport('content');

    viewportContent.trigger('dragstart');
    viewportContent.css('left', 50);
    viewportContent.css('top', 50);
    viewportContent.trigger('dragstop', {position: {left: 50, top: 50}});

    element.height(300);
    element.width(300);

    element.viewport('update');
    
    element.appendTo(document.body);
    
    equal(viewportBinder.height(), 1100);
    equal(viewportBinder.width(), 1100);
    equal(viewportContent.css('left'), '250px');
    equal(viewportContent.css('top'), '250px');
    
    element.remove();
});

test('updates content frame\'s position after it was dragged and viewport size become bigger', function() {
    var content = $('<div/>');
    content.height(700);
    content.width(700);

    var element = $('<div/>');
    element.height(500);
    element.width(500);

    element.viewport({content: content});

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

    equal(viewportBinder.height(), 750);
    equal(viewportBinder.width(), 750);
    equal(viewportContent.css('left'), '0px');
    equal(viewportContent.css('top'), '0px');
    
    element.remove();
});

module('"size" method');

test('changes content frame\'s size', function() {
    var element = $('<div/>').viewport();
    var viewportContent = element.viewport('content');
    
    element.viewport('size', 1000, 2000);

    equal(viewportContent.height(), 1000);
    equal(viewportContent.width(), 2000);
});

test('returns width and height of the content frame when is called without params', function() {
    var height = 100;
    var width = 200;
    var element = $('<div/>').viewport();

    element.viewport('size', height, width);

    var size = element.viewport('size');

    equal(size.height, height);
    equal(size.width, width);
});

test('returns reference to jQuery object of the viewport', function() {
    var element = $('<div/>').viewport();

    equal(element, element.viewport('size', 1000, 2000));
});

module('"content" method');

test('returns jQuery object of the content frame', function() {
    var element = $('<div/>').viewport();

    ok(element.viewport('content').hasClass('viewportContent'));
});

module('"binder" method');

test('returns jQuery object of the binder frame', function() {
    var element = $('<div></div>').viewport();
    
    ok(element.viewport('binder').hasClass('viewportBinder'));
});