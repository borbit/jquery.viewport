(function($) {

$.widget('ui.viewport', {
    options:{
        binderClass: 'viewportBinder',
        contentClass: 'viewportContent',
        position: 'center',
        content: false,
        height: false,
        width: false
    },

    _create: function() {
        var content = this.options.content;
        var isObject = typeof(content) == 'object';

        if (isObject && content.tagName != null) {
            this.options.content = $(content);
        } else if (isObject && $.isArray(content)) {
            this.options.content = $(content);
        }

        this.viewport = createViewport(this.element, this.options);
        this.viewport.init();
        this.viewport.adjust();
    },

    content: function() { return this.viewport.content; },
    binder:  function() { return this.viewport.binder; },
    adjust: function() { this.viewport.adjust(); },

    update:  function() {
        this.viewport.updateContentSize();
        this.viewport.adjust();
    },

    size: function(height, width) {
        if (height == null || width == null) {
            return this.viewport.getContentSize();
        }
        this.viewport.setContentHeight(height);
        this.viewport.setContentWidth(width);
    },

    height: function(height) {
        if (height == null) {
            return this.viewport.getContentSize().height;
        }
        this.viewport.setContentHeight(height);
    },

    width: function(width) {
        if (width == null) {
            return this.viewport.getContentSize().width;
        }
        this.viewport.setContentWidth(width);
    }
});

function createViewport(element, options) {
    var binder = $('<div class="' + options.binderClass + '"></div>');
    var content = $('<div class="' + options.contentClass + '"></div>');

    binder.css({position: 'absolute', overflow: 'hidden'});
    element.css({position: 'relative', overflow: 'hidden'});
    content.css({position: 'absolute'});

    var contents = false;
    if (options.content == false && element.contents().length) {
        contents = element.contents().detach();
    } else if (options.content != false) {
        contents = options.content.detach();
    }

    content.append(contents);
    binder.append(content);
    element.append(binder);

    var centerHorizontal = true,
        centerVertical = true,
        heightDiff = 0,
        widthDiff = 0;

    var contentPosition = {top: 0, left: 0};
    var contentSize = {height: 0, width: 0};
    var viewportSize = {height: 0, width: 0};

    element.bind('dragstop', function(event, ui) {
        if(contentPosition.top != ui.position.top) {
            centerHorizontal = false;
        }
        if(contentPosition.left != ui.position.left) {
            centerVertical = false;
        }
        contentPosition.left = ui.position.left;
        contentPosition.top = ui.position.top;
    });

    function init() {
        updateContentSize();
        updateContentPosition();
    }

    function updateContentPosition() {
        var position = options.position.split(' ');

        if (position.indexOf('bottom') != -1) {
            centerVertical = false;
            contentPosition.top = viewportSize.height - contentSize.height;
        } else if (position.indexOf('top') != -1) {
            centerVertical = false;
            contentPosition.top = 0;
        }

        if (position.indexOf('right') != -1) {
            centerHorizontal = false;
            contentPosition.left = viewportSize.width - contentSize.width;
        } else if (position.indexOf('left') != -1) {
            centerHorizontal = false;
            contentPosition.left = 0;
        }
    }

    function updateContentSize() {
        if (options.width != false && options.height != false) {
            content.height(options.height);
            content.width(options.width);
        } else if (contents != false) {
            content.height(contents.height());
            content.width(contents.width());
        }

        contentSize = {
            height: content.height(),
            width: content.width()
        };
    }

    function adjust() {
        viewportSize.height = element.height();
        viewportSize.width = element.width();

        var diff;

        if (viewportSize.height > contentSize.height) {
            content.css('top', 0);
            binder.height(contentSize.height);
            binder.css('top', Math.floor(viewportSize.height / 2) -
                              Math.floor(contentSize.height / 2))
        } else {
            diff = contentSize.height - viewportSize.height;
            binder.height(viewportSize.height + diff * 2);
            binder.css('top', -diff);

            if (centerVertical) {
                contentPosition.top = Math.floor(diff / 2);
                content.css('top', contentPosition.top);
            } else {
                var newTop = contentPosition.top + (diff - heightDiff);
                newTop = newTop >= 0 ? newTop : 0;
                contentPosition.top = newTop;
                content.css('top', newTop);
            }
            heightDiff = diff;
        }

        if (viewportSize.width > contentSize.width) {
            content.css('left', 0);
            binder.width(contentSize.width);
            binder.css('left', Math.floor(viewportSize.width / 2) -
                               Math.floor(contentSize.width / 2));
        } else {
            diff = contentSize.width - viewportSize.width;
            binder.width(viewportSize.width + diff * 2);
            binder.css('left', -diff);

            if (centerHorizontal) {
                contentPosition.left = Math.floor(diff / 2);
                content.css('left', contentPosition.left);
            } else {
                var newLeft = contentPosition.left + (diff - widthDiff);
                newLeft = newLeft >= 0 ? newLeft : 0;
                contentPosition.left = newLeft;
                content.css('left', newLeft);
            }
            widthDiff = diff;
        }
    }

    function setContentHeight(height) {
        if (height != null) {
            contentSize.height = height;
            content.height(height);
        }
    }

    function setContentWidth(width) {
        if (width != null) {
            contentSize.width = width;
            content.width(width);
        }
    }

    function getContentSize() {
        return contentSize;
    }

    return {
        init: init,
        adjust: adjust,
        updateContentSize: updateContentSize,
        setContentHeight: setContentHeight,
        setContentWidth: setContentWidth,
        getContentSize: getContentSize,
        content: content,
        binder: binder
    };
}

})(jQuery);