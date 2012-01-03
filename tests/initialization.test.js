module('Initialization');

test('returns jQuery object', function() { 
    var element = $('<div/>').viewport();
    
    ok(element.jquery);
});

test('viewport el has overflow property set to hidden', function() {
    var element = $('<div/>').viewport();

    equal(element.css('overflow'), 'hidden');
});

test('viewport el has position property set to relative', function() {
    var element = $('<div/>').viewport();

    equal(element.css('position'), 'relative');
});

test('viewport el has correct DOM structure', function() {
    var element = $('<div/>').viewport();

    var binder = element.find('.viewportBinder');
    var content = binder.find('.viewportContent');

    equal(binder.length, 1);
    equal(content.length, 1);
})

test('binder frame has position property set to absolute', function() {
    var element = $('<div/>').viewport();
    var binder = element.viewport('binder');

    equal(binder.css('position'), 'absolute');
});

test('content frame has position property set to absolute', function() {
    var element = $('<div/>').viewport();
    var content = element.viewport('content');

    equal(content.css('position'), 'absolute');
});

test('content frame has the same size as element passed through "content" option', function() {
    var content = $('<div class="content"></div>');
    content.height(100);
    content.width(200);
    
    var element = $('<div/>').viewport({content: content});
    var viewportContent = element.viewport('content');

    equal(viewportContent.height(), 100);
    equal(viewportContent.width(), 200);
});

test('content frame has the same size as an initial content (static size)', function() {
    var element = $('<div><div style="height:100px;width:200px;"></div>').viewport();
    var viewportContent = element.viewport('content');

    equal(viewportContent.height(), 100);
    equal(viewportContent.width(), 200);
});

test('content frame has the same size as an initial content (inherited size)', function() {
    var element = $('<div style="height:100px;width:200px;">\
        <div style="height:inherit;width:inherit;"></div>');
    
    element.appendTo(document.body);
    element.viewport();
    
    var viewportContent = element.viewport('content');

    equal(viewportContent.height(), 100);
    equal(viewportContent.width(), 200);
    
    element.remove();
});

test('content frame has the same size as an initial content (100% size)', function() {
    var element = $('<div style="height:100px;width:200px;">\
        <div style="height:100%;width:100%;"></div>');
        
    element.appendTo(document.body);
    element.viewport();
    
    var viewportContent = element.viewport('content');

    equal(viewportContent.height(), 100);
    equal(viewportContent.width(), 200);
    
    element.remove();
});

test('binder frame has the same size as a content if content is smaller then viewport', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(100);
    content.width(200);

    element.viewport({content: content});
    var binder = element.viewport('binder');

    equal(binder.height(), 100);
    equal(binder.width(), 200);
});

test('binder frame is in the center if content  is smaller then viewport', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(100);
    content.width(200);

    element.viewport({content: content});
    var binder = element.viewport('binder');

    element.appendTo(document.body);

    equal(binder.css('left'), '150px');
    equal(binder.css('top'), '200px');
    
    element.remove();
});

test('content frame has left and top properties set to 0 if it is smaller then viewport', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(100);
    content.width(200);

    element.viewport({content: content});
    var viewportBinder = element.viewport('binder');
    var viewportContent = element.viewport('content');

    element.appendTo(document.body);
    
    equal(viewportContent.css('left'), '0px');
    equal(viewportContent.css('top'), '0px');
    
    element.remove();
});

test('binder frame has correct size if content is bigger then viewport', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(700);
    content.width(800);

    element.viewport({content: content});
    var viewportBinder = element.viewport('binder');

    equal(viewportBinder.height(), 900);
    equal(viewportBinder.width(), 1100);
});

test('binder frame is in the center if content is bigger then viewport', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(700);
    content.width(800);

    element.viewport({content: content});
    var viewportBinder = element.viewport('binder');

    element.appendTo(document.body);

    equal(viewportBinder.css('left'), '-300px');
    equal(viewportBinder.css('top'), '-200px');
    
    element.remove();
});

test('content frame has correct left and top properties if it is bigger then viewport', function() {
    var element = $('<div/>');
    element.height(500);
    element.width(500);

    var content = $('<div/>');
    content.height(700);
    content.width(800);

    element.viewport({content: content});
    var viewportBinder = element.viewport('binder');
    var viewportContent = element.viewport('content');

    element.appendTo(document.body);

    equal(viewportContent.css('left'), '150px');
    equal(viewportContent.css('top'), '100px');
    
    element.remove();
});