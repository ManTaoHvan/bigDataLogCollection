// ******* SITEMAP TOOLBAR VIEWER ACTIONS ******** // 注释加密 
$ahmtao.internal(function ($ax) {
    var userTriggeredEventNames = ['onClick', 'onDoubleClick', 'onMouseOver', 'onMouseMove', 'onMouseOut', 'onMouseDown', 'onMouseUp',
        'onKeyDown', 'onKeyUp', 'onFocus', 'onLostFocus', 'onTextChange', 'onSelectionChange', 'onSelectedChange', 'onSelect', 'onUnselect',
        'onSwipeLeft', 'onSwipeRight', 'onSwipeUp', 'onSwipeDown', 'onDragStart', 'onDrag', 'onDragDrop', 'onScroll', 'onContextMenu', 'onMouseHover', 'onLongClick'];
    
    // 注释加密 
    // 注释加密 

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    $ax.messageCenter.addMessageListener(function (message, data) {
        // 注释加密 
        if(message == 'toggleSelectWidgetNote') {

            if (!IOS) {
                $('.widgetNoteSelected').removeClass('widgetNoteSelected');
            }

            if(!data.value) return;

            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 

            $ax('*').each(function(obj, elementId) {
                if (obj.id == data.id) {
                    if (!IOS) {
                        $('#' + elementId).addClass('widgetNoteSelected');
                    }

                    _scrollToSelectedNote($('#' + elementId), data.view);
                }
            });
        }
    });

    var _scrollToSelectedNote = function ($elmt, view) {
        var isLandscape = IOS ? window.orientation != 0 && window.orientation != 180 : false;
        var winWidth = !IOS ? $(window).width() : (isLandscape ? window.screen.height : window.screen.width) - view.panelWidthOffset;
        var winHeight = !IOS ? $(window).height() : view.height;
        var docLeft = $('html').last().scrollLeft();
        var docTop = $('html').last().scrollTop();
        var docRight = docLeft + winWidth;
        var docBottom = docTop + winHeight;

        var scale = $('#base').css('transform');;
        scale = (scale == "none") ? 1 : Number(scale.substring(scale.indexOf('(') + 1, scale.indexOf(',')));

        var bodyLeft = ($('body').css('left') !== undefined && $('body').css('left') !== "auto") ? Number($('body').css('left').replace('px','')) : 0;
        var top = scale * Number($elmt.css('top').replace('px', ''));
        var bottom = top + scale * $elmt.height();
        var left = scale * Number($elmt.css('left').replace('px', '')) + bodyLeft;
        var right = left + scale * $elmt.width();

        var doHorizontalMove = left < docLeft || right > docRight;
        var doVerticalMove = top < docTop || bottom > docBottom;
        var padding = scale * 50;

        var newScrollLeft = 0
        if (left < docLeft) {
            newScrollLeft = left - padding;
        } else if (right > docRight) {
            newScrollLeft = right + padding - winWidth;
        }

        var newScrollTop = 0
        if (top < docTop) {
            newScrollTop = top - padding;
        } else if (bottom > docBottom) {
            newScrollTop = bottom + padding - winHeight;
        }

        // 注释加密 
        if (view.h || view.scaleVal == 1 || view.scaleVal == 2) {
            doHorizontalMove = false;
        }

        // 注释加密 
        if ((view.scaleVal == 1 || view.h) && (left > docRight)) {
            doVerticalMove = false;
        }

        // 注释加密 
        if (doHorizontalMove && doVerticalMove) {
            $("html, body").animate({ scrollLeft: newScrollLeft, scrollTop: newScrollTop }, 300);
        } else if (doHorizontalMove) {
            $("html, body").animate({ scrollLeft: newScrollLeft }, 300);
        } else if (doVerticalMove) {
            $("html, body").animate({ scrollTop: newScrollTop }, 300);
        }
    }

    var highlightEnabled = false;
    $ax.messageCenter.addMessageListener(function(message, data) {
        if(message == 'highlightInteractive') {
            highlightEnabled = data == true;
            _applyHighlight($ax('*'));
        }
    });

    var _applyHighlight = $ax.applyHighlight = function(query, ignoreUnset) {
        if(ignoreUnset && !highlightEnabled) return;

        var pulsateClassName = 'legacyPulsateBorder';
        // 注释加密 
        var _isInteractive = function(diagramObject) {
            if(diagramObject && diagramObject.interactionMap) {
                for(var index in userTriggeredEventNames) {
                    if(diagramObject.interactionMap[userTriggeredEventNames[index]]) return true;
                }
            }
            return false;
        };

        // 注释加密 
        var _findMatchInParent = function(id) {
            var parents = $ax('#' + id).getParents(true, ['layer'])[0];
            for(var i in parents) {
                var parentId = parents[i];
                var parentObj = $ax.getObjectFromScriptId(parentId);
                if(_isInteractive(parentObj)) return true;
            }
            return false;
        };

        // 注释加密 
        var $matchingElements = query.filter(function (obj, id) {

            // 注释加密 
            if($ax.public.fn.IsLayer(obj.type)) return false;

            if(_isInteractive(obj)) return true;
            else if($ax.public.fn.IsVector(obj.type) && obj.referencePageUrl) return true;

            // 注释加密 
            // 注释加密 
            return _findMatchInParent(id);
        }).$();

        var isHighlighted = $matchingElements.is('.' + pulsateClassName);

        // 注释加密 
        if(highlightEnabled && !isHighlighted) {
            $matchingElements.addClass(pulsateClassName);
        } else if(!highlightEnabled && isHighlighted) {
            $matchingElements.removeClass(pulsateClassName);
        }
    };
    
    $ahmtao.getIdAndRectAtLoc = function (data) {
        var element = document.elementFromPoint(data.x, data.y);
        if (!element) return undefined;

        var jObj = _getElementIdFromTarget(element);
        if (jObj.length > 0) {
          var id = jObj.attr('id');
          var axObj = $ax('#' + id);
          var rect = axObj.pageBoundingRect();
          return { 'id': id, 'rect': rect };
        }
        return undefined;
    }

    $ahmtao.getIdRectAndStyleAtLoc = function(data) {
        var element = document.elementFromPoint(data.x, data.y);
        if (!element) return undefined;

        var jObj = _getElementIdFromTarget(element);
        if (jObj.length > 0) {
          var id = jObj.attr('id');
          return $ahmtao.getRectAndStyleById(id);
        }
        return undefined;
    }

    $ahmtao.getRectAndStyleById = function (id) {
        var axObj = $ax('#' + id);
        var rect = axObj.pageBoundingRect();
        var style = $ax.style.computeFullStyle(id, $ax.style.generateState(id), $ax.adaptive.currentViewId);
        style.text = axObj.text();
        return { 'id': id, 'rect': rect, 'style': style };
    }

    $ahmtao.isIdVisible = function (id) {
        return id ? $ax.visibility.IsIdVisible(id) : false;
    }

    var _getElementIdFromTarget = function (target) {
        var targetId = target.id;
        var jTarget = $(target);
        while((!targetId || targetId.indexOf('cache') > -1) && jTarget[0].tagName != 'HTML') {
            jTarget = jTarget.parent();
            targetId = jTarget.attr('id');
        }
        if(targetId && targetId != 'base') {
            var sections = targetId.split('_');
            return $('#' + sections[0]);
        }
        return '';
    }

});