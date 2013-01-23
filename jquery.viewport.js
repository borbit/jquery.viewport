/*    
    jQuery.Viewport 0.2.3
    
    Makes an element as a handy viewport for displaying content
    with absolute position. For all details and documentation:
    http://borbit.github.com/jquery.viewport/
    
    Copyright (c) 2011-2013 Serge Borbit <serge.borbit@gmail.com>
    
    Licensed under the MIT license
*/
(function($) {

$.widget('ui.viewport', {
    options:{
        binderClass: 'viewportBinder'
      , contentClass: 'viewportContent'
      , position: 'center'
      , content: false
      , height: false
      , width: false
    },

    _create: function() {
        var content = this.options.content;

        if (content.tagName != null || $.isArray(content)) {
            this.options.content = $(content);
        }

        this.viewport = createViewport(this.element, this.options);
        this.viewport.adjust();
    },

    update: function() {
        this.viewport.updateContentSize();
        this.viewport.adjust();
    },
    
    adjust: function() {
        this.viewport.adjust();
    },
    
    content: function() {
        return this.viewport.content;
    },
    
    binder: function() {
        return this.viewport.binder;
    },

    size: function(height, width) {
        if (height == null || width == null) {
            return this.viewport.contentSize;
        }
        this.viewport.setContentHeight(height);
        this.viewport.setContentWidth(width);
    },

    height: function(height) {
        if (height == null) {
            return this.viewport.contentSize.height;
        }
        this.viewport.setContentHeight(height);
    },

    width: function(width) {
        if (width == null) {
            return this.viewport.contentSize.width;
        }
        this.viewport.setContentWidth(width);
    }
});

var BINDER_CSS = {position: 'absolute', overflow: 'hidden'}
  , ELEMENT_CSS = {position: 'relative', overflow: 'hidden'}
  , CONTENT_CSS = {position: 'absolute'};

function createViewport(element, options) {
    var contentPosition = {top: 0, left: 0}
      , viewportSize = {height: 0, width: 0}
      , contentSize = {height: 0, width: 0}
      , centerH = true
      , centerV = true
      , diffH = 0
      , diffW = 0;
    
    var binder = $('<div/>').addClass(options.binderClass);
    var content = $('<div/>').addClass(options.contentClass);

    element.css(ELEMENT_CSS);
    content.css(CONTENT_CSS);
    binder.css(BINDER_CSS);

    var contents = false;
    if (!options.content && element.children().length) {
        contents = element.children();
    } else if (options.content) {
        contents = options.content;
    }
    
    updateContentSize();
    updateContentPosition();
    
    if (contents) {
        contents.detach();
        content.append(contents);
    }
    
    binder.append(content).appendTo(element);

    element.bind('dragstop', function(event, ui) {
        if (contentPosition.top != ui.position.top) {
            centerH = false;
        }
        if (contentPosition.left != ui.position.left) {
            centerV = false;
        }
        contentPosition.left = ui.position.left;
        contentPosition.top = ui.position.top;
    });

    function updateContentPosition() {
        var position = options.position.split(' ');

        if (~$.inArray('bottom', position)) {
            centerV = false;
            contentPosition.top = viewportSize.height - contentSize.height;
        } else if (~$.inArray('top', position)) {
            centerV = false;
            contentPosition.top = 0;
        }

        if (~$.inArray('right', position)) {
            centerH = false;
            contentPosition.left = viewportSize.width - contentSize.width;
        } else if (~$.inArray('left', position)) {
            centerH = false;
            contentPosition.left = 0;
        }
    }

    function updateContentSize() {
        if (options.width !== false && options.height !== false) {
            content.height(options.height);
            content.width(options.width);
        } else if (contents !== false) {
            content.height(contents.outerHeight());
            content.width(contents.outerWidth());
        }

        contentSize.height = content.height();
        contentSize.width = content.width();
    }

    var floor = Math.floor;
    
    function adjust() {
        viewportSize.height = element.height();
        viewportSize.width = element.width();

        var diff, newTop, newLeft;

        if (viewportSize.height > contentSize.height) {
            content.css('top', 0);
            binder.css('height', contentSize.height);
            binder.css('top', floor(viewportSize.height / 2) -
                              floor(contentSize.height / 2));
        } else {
            diff = contentSize.height - viewportSize.height;
            binder.css('height', viewportSize.height + diff * 2);
            binder.css('top', -diff);

            if (centerV) {
                contentPosition.top = floor(diff / 2);
                content.css('top', contentPosition.top);
            } else {
                newTop = contentPosition.top + (diff - diffH);
                newTop >= 0 || (newTop = 0);
                contentPosition.top = newTop;
                content.css('top', newTop);
            }
            diffH = diff;
        }

        if (viewportSize.width > contentSize.width) {
            content.css('left', 0);
            binder.css('width', contentSize.width);
            binder.css('left', floor(viewportSize.width / 2) -
                               floor(contentSize.width / 2));
        } else {
            diff = contentSize.width - viewportSize.width;
            binder.css('width', viewportSize.width + diff * 2);
            binder.css('left', -diff);

            if (centerH) {
                contentPosition.left = floor(diff / 2);
                content.css('left', contentPosition.left);
            } else {
                newLeft = contentPosition.left + (diff - diffW);
                newLeft >= 0 || (newLeft = 0);
                contentPosition.left = newLeft;
                content.css('left', newLeft);
            }
            diffW = diff;
        }
    }

    function setContentHeight(height) {
        contentSize.height = height;
        content.height(height);
    }

    function setContentWidth(width) {
        contentSize.width = width;
        content.width(width);
    }

    return {
        adjust: adjust
      , updateContentSize: updateContentSize
      , setContentHeight: setContentHeight
      , setContentWidth: setContentWidth
      , contentSize: contentSize
      , content: content
      , binder: binder
    };
}

})(jQuery);