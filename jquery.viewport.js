(function($) {

function getContentOption(options) {
    var isObject = typeof(options) == 'object';

    if (isObject && options.jquery != null) {
        return options;
    } else if (isObject && options.tagName != null) {
        return $(options);
    } else if (isObject && $.isArray(options)) {
        return $(options);
    } else if (isObject && options.content != null) {
        return getContentOption(options.content);
    }

    return $.fn.viewport.defaults.content;
}

var publicMethods = {
    content: function() {
        return this.content;
    },
    binder: function() {
        return this.binder;
    },
    update: function() {
        this.adjust();
    },
    size: function(height, width) {
        if (height == null || width == null) {
            return this.getContentSize();
        }
        this.setContentHeight(height);
        this.setContentWidth(width);
    },
    height: function(height) {
        if (height == null) {
            return this.getContentSize().height;
        }
        this.setContentHeight(height);
    },
    width: function(width) {
        if (width == null) {
            return this.getContentSize().width;
        }
        this.setContentWidth(width);
    }
};

$.fn.viewport = function(input) {
    input = input || {};

    var element = this.eq(0);
    var viewport = element.data('viewport');

    if (typeof(input) == 'string' && viewport && $.isFunction(publicMethods[input])) {
        var args = Array.prototype.slice.call(arguments, 1);
        var result = publicMethods[input].apply(viewport, args);

        if (result) {
            return result;
        }
    }

    if (!viewport) {
        var options = {content: getContentOption(input)};

        if (!$.isArray(input) && input.tagName == null && input.jquery == null) {
            options = $.extend({}, input, options);
        }

        options = $.extend({}, $.fn.viewport.defaults, options);
        viewport = createViewport(element, options);
        element.data('viewport', viewport);
    }

    return this;
};

$.fn.viewport.defaults = {
    binderClass: 'viewportBinder',
    contentClass: 'viewportContent',
    content: false,
    height: false,
    width: false
};

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

    adjust();

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