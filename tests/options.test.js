module('options');

test('"height" and "width" options are applied to the content frame', function() {
    var element = $('<div/>').viewport({height: 1000, width: 2000});
    var viewportContent = element.viewport('content');

    equal(viewportContent.height(), 1000);
    equal(viewportContent.width(), 2000);
});

test('"contentClass" option is applied to the content frame', function() {
    var myClass = 'myClass';
    var element = $('<div/>').viewport({contentClass: myClass});
    var viewportContent = element.viewport('content');

    ok(viewportContent.hasClass(myClass));
});

test('"binderClass" option is applied to the binder frame', function() {
    var myClass = 'myClass';
    var element = $('<div/>').viewport({binderClass: myClass});
    var viewportBinder = element.viewport('binder');

    ok(viewportBinder.hasClass(myClass));
});

// $(...).viewport({position: 'top'});
test('"position: top" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'top'});
    
    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '100px');
});

// $(...).viewport({position: 'bottom'});
test('"position: bottom" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'bottom'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '0px');
});

// $(...).viewport({position: 'center'});
test('"position: center" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'center'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '50px');
});

// $(...).viewport({position: 'left'});
test('"position: left" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'left'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('left'), '100px');
});

// $(...).viewport({position: 'right'});
test('"position: right" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'right'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('left'), '0px');
});

// $(...).viewport({position: 'top left'});
test('"position: top left" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'top left'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '100px');
    equal(viewportContent.css('left'), '100px');
});

// $(...).viewport({position: 'top right'});
test('"position: top right" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'top right'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '100px');
    equal(viewportContent.css('left'), '0px');
});

// $(...).viewport({position: 'bottom left'});
test('"position: bottom left" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'bottom left'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '0px');
    equal(viewportContent.css('left'), '100px');
});

// $(...).viewport({position: 'bottom right'});
test('"position: bottom right" option is applied to the content frame', function() {
    var element = $('<div/>').height(100).width(100);
    var content = $('<div/>').height(200).width(200);

    element.viewport({content: content, position: 'bottom right'});

    var viewportContent = element.viewport('content');

    equal(viewportContent.css('top'), '0px');
    equal(viewportContent.css('left'), '0px');
});