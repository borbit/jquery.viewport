(function($) {

$.widget('ui.viewport', {
    options:{
        binderClass: 'viewportBinder',
        contentClass: 'viewportContent',
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
        this.viewport.adjust();
    },

    content: function() { return this.viewport.content; },
    binder:  function() { return this.viewport.binder; },
    update:  function() { this.viewport.adjust(); },

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

    if (options.width != false && options.height != false) {
        content.height(options.height);
        content.width(options.width);
    } else if (options.content != false) {
        content.height(options.content.height());
        content.width(options.content.width());
    }

    if (options.content != false) {
        content.append(options.content.detach())
    } else {
        content.append(element.contents().detach());
    }

    binder.append(content);
    element.append(binder);

    var contentOffset = {
        left: content.offset().left,
        top: content.offset().top
    };

    var contentSize = {
        height: content.height(),
        width: content.width()
    };

    var centerHorizontal = true,
        centerVertical = true,
        heightDiff = 0,
        widthDiff = 0;

    element.bind('dragstop', function(event, ui) {
        if(contentOffset.top != ui.position.top) {
            centerHorizontal = false;
        }
        if(contentOffset.left != ui.position.left) {
            centerVertical = false;
        }
        contentOffset.left = ui.position.left;
        contentOffset.top = ui.position.top;
    });

    function adjust() {
        var viewportSize = {
            height: element.height(),
            width: element.width()
        };

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
                contentOffset.top = Math.floor(diff / 2);
                content.css('top', contentOffset.top);
            } else {
                var newTop = contentOffset.top + (diff - heightDiff);
                newTop = newTop >= 0 ? newTop : 0;
                content.css('top', newTop);
                contentOffset.top = newTop;
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
                contentOffset.left = Math.floor(diff / 2);
                content.css('left', contentOffset.left);
            } else {
                var newLeft = contentOffset.left + (diff - widthDiff);
                newLeft = newLeft >= 0 ? newLeft : 0;
                content.css('left', newLeft);
                contentOffset.left = newLeft;
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
        adjust: adjust,
        setContentHeight: setContentHeight,
        setContentWidth: setContentWidth,
        getContentSize: getContentSize,
        content: content,
        binder: binder
    };
}

})(jQuery);