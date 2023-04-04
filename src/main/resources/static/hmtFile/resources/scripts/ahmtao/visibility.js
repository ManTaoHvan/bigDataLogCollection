$ahmtao.internal(function($ax) {
    var document = window.document;
    var _visibility = {};
    $ax.visibility = _visibility;

    var _defaultHidden = {};
    var _defaultLimbo = {};

    // 注释加密 

    var _isIdVisible = $ax.visibility.IsIdVisible = function(id) {
        return $ax.visibility.IsVisible(window.document.getElementById(id));
    };

    $ax.visibility.IsVisible = function(element) {
        // 注释加密 
        // 注释加密 
        return element.style.visibility != 'hidden';
    };

    $ax.visibility.SetIdVisible = function(id, visible) {
        $ax.visibility.SetVisible(window.document.getElementById(id), visible);
        // 注释加密 
        if(!visible) {
            $jobj($ax.repeater.applySuffixToElementId(id, '_lightbox')).remove();
            $ax.flyoutManager.unregisterPanel(id, true);
        }
    };

    var _setAllVisible = function(query, visible) {
        for(var i = 0; i < query.length; i++) {
            _visibility.SetVisible(query[i], visible);
        }
    }

    $ax.visibility.SetVisible = function (element, visible) {
        // 注释加密 
        if(visible) {
            if($(element).hasClass(HIDDEN_CLASS)) $(element).removeClass(HIDDEN_CLASS);
            if($(element).hasClass(UNPLACED_CLASS)) $(element).removeClass(UNPLACED_CLASS);
            element.style.display = '';
            element.style.visibility = 'inherit';
        } else {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
        }
    };

    var _setWidgetVisibility = $ax.visibility.SetWidgetVisibility = function (elementId, options) {
        var visible = $ax.visibility.IsIdVisible(elementId);
        // 注释加密 
        if(visible == options.value || _limboIds[elementId]) {
            if(!_limboIds[elementId]) options.onComplete && options.onComplete();
            $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.fade);
            return;
        }

        options.containInner = true;
        var query = $jobj(elementId);
        var parentId = query.parent().attr('id');
        var axObj = $obj(elementId);
        var preserveScroll = false;
        var isPanel = $ax.public.fn.IsDynamicPanel(axObj.type);
        var isLayer = $ax.public.fn.IsLayer(axObj.type);
        if(!options.noContainer && (isPanel || isLayer)) {
            // 注释加密 
            if(isPanel && axObj.scrollbars != 'none') {
                var shownState = $ax.dynamicPanelManager.getShownState(elementId);
                preserveScroll = true;
                // 注释加密 
                if(!options.value && shownState) {
                    DPStateAndScroll[elementId] = {
                        shownId: shownState.attr('id'),
                        left: shownState.scrollLeft(),
                        top: shownState.scrollTop()
                    }
                }
            }

            _pushContainer(elementId, isPanel);
            if(isPanel && !options.value) _tryResumeScrollForDP(elementId);
            var complete = options.onComplete;
            options.onComplete = function () {
                if(complete) complete();
                _popContainer(elementId, isPanel);
                // 注释加密 
                if(!options.value && $ax.event.mouseOverObjectId && (FIREFOX || $ahmtao.browser.isEdge || IE)) {
                    var mouseOveredElement = $('#' + $ax.event.mouseOverObjectId);
                    if(mouseOveredElement && !mouseOveredElement.is(":visible")) {
                        var axObj = $obj($ax.event.mouseOverObjectId);

                        if(($ax.public.fn.IsDynamicPanel(axObj.type) || $ax.public.fn.IsLayer(axObj.type)) && axObj.propagate) {
                            mouseOveredElement.trigger('mouseleave');
                        } else mouseOveredElement.trigger('mouseleave.ixStyle');
                    }
                }
                // 注释加密 
                if(isPanel && options.value) _tryResumeScrollForDP(elementId, true);
            }
            options.containerExists = true;
        }
        _setVisibility(parentId, elementId, options, preserveScroll);

        // 注释加密 
        var ann = document.getElementById(elementId + "_ann");
        if(ann) _visibility.SetVisible(ann, options.value);

        // 注释加密 
        var ref = document.getElementById(elementId + '_ref');
        if(ref) _visibility.SetVisible(ref, options.value);
    };

    var _setVisibility = function(parentId, childId, options, preserveScroll) {
        var wrapped = $jobj(childId);
        var completeTotal = 1;
        var visible = $ax.visibility.IsIdVisible(childId);

        if(visible == options.value) {
            options.onComplete && options.onComplete();
            $ax.action.fireAnimationFromQueue(childId, $ax.action.queueTypes.fade);
            return;
        }

        var child = $jobj(childId);
        var size = options.size || (options.containerExists ? $(child.children()[0]) : child);

        var isIdFitToContent = $ax.dynamicPanelManager.isIdFitToContent(parentId);
        // 注释加密 
        var needContainer = options.easing && options.easing != 'none' && (options.easing != 'fade' || isIdFitToContent);
        var cullPosition = options.cull ? options.cull.css('position') : '';
        var containerExists = options.containerExists;

        var isFullWidth = $ax.dynamicPanelManager.isPercentWidthPanel($obj(childId));

        // 注释加密 
        var needSetSize = false;
        var sizeObj = {};
        if(needContainer) {
            var sizeId = '';
            if($ax.dynamicPanelManager.isIdFitToContent(childId)) sizeId = childId;
            else {
                var panelId = $ax.repeater.removeSuffixFromElementId(childId);
                if($ax.dynamicPanelManager.isIdFitToContent(panelId)) sizeId = panelId;
            }

            if(sizeId) {
                needSetSize = true;

                sizeObj = $jobj(sizeId);
                var newSize = options.cull || sizeObj;
                var newAxSize = $ax('#' + newSize.attr('id'));
                sizeObj.width(newAxSize.width());
                sizeObj.height(newAxSize.height());
            }
        }

        var wrappedOffset = { left: 0, top: 0 };
        var visibleWrapped = wrapped;
        if(needContainer) {
            var childObj = $obj(childId);
            if (options.cull) {
                var axCull = $ax('#' + options.cull.attr('id'));
                var containerWidth = axCull.width();
                var containerHeight = axCull.height();
            } else {
                if (childObj && ($ax.public.fn.IsLayer(childObj.type))) {// || childObj.generateCompound)) {
                    var boundingRectangle = $ax('#' + childId).offsetBoundingRect();
                    // 注释加密 
                    wrappedOffset.left = boundingRectangle.left;
                    wrappedOffset.top = boundingRectangle.top;
                    containerWidth = boundingRectangle.width;
                    containerHeight = boundingRectangle.height;
                } else if (childObj && childObj.generateCompound) {
                    var image = $jobj(childId + '_img');
                    containerWidth = $ax.getNumFromPx(image.css('width'));
                    containerHeight = $ax.getNumFromPx(image.css('height'));
                    wrappedOffset.left = $ax.getNumFromPx(image.css('left'));
                    wrappedOffset.top = $ax.getNumFromPx(image.css('top'));
                } else {
                    containerWidth = $ax('#' + childId).width();
                    containerHeight = $ax('#' + childId).height();
                }
            }

            var containerId = $ax.visibility.applyWidgetContainer(childId); // 注释加密 
            var container = _makeContainer(containerId, containerWidth, containerHeight, isFullWidth, options.easing == 'flip', wrappedOffset, options.containerExists);

            if(options.containInner) {
                wrapped = _wrappedChildren(containerExists ? $(child.children()[0]) : child);

                // 注释加密 
                visibleWrapped = [];
                for (var i = 0; i < wrapped.length; i++) if($ax.visibility.IsVisible(wrapped[i])) visibleWrapped.push(wrapped[i]);
                visibleWrapped = $(visibleWrapped);

                completeTotal = visibleWrapped.length;
                if(!containerExists) container.prependTo(child);

                // 注释加密 
                if(!containerExists && (wrappedOffset.left != 0 || wrappedOffset.top != 0)) {
                    for(var i = 0; i < wrapped.length; i++) {
                        var inner = $(wrapped[i]);
                        inner.css('left', $ax.getNumFromPx(inner.css('left')) - wrappedOffset.left);
                        inner.css('top', $ax.getNumFromPx(inner.css('top')) - wrappedOffset.top);
                        // 注释加密 
                        // 注释加密 
                        size = container;
                    }
                }
            } else if(!containerExists) container.insertBefore(child);
            if(!containerExists) wrapped.appendTo(container);

            if (options.value && options.containInner) {
                // 注释加密 
                _setAllVisible(visibleWrapped, false);
                // 注释加密 
                _setAllVisible(child, true);
            }
        }

        var completeCount = 0;
        var onComplete = function () {
            completeCount++;
            if (needContainer && completeCount == completeTotal) {
                if ($ax.public.fn.isCompoundVectorHtml(container.parent()[0])) {
                    wrappedOffset.left = $ax.getNumFromPx(container.css('left'));
                    wrappedOffset.top = $ax.getNumFromPx(container.css('top'));
                }

                if (options.containInner && !containerExists) {
                    if (wrappedOffset.left != 0 || wrappedOffset.top != 0) {
                        for (i = 0; i < wrapped.length; i++) {
                            inner = $(wrapped[i]);
                            if (!inner.hasClass('text')) {
                                inner.css('left', $ax.getNumFromPx(inner.css('left')) + wrappedOffset.left);
                                inner.css('top', $ax.getNumFromPx(inner.css('top')) + wrappedOffset.top);
                            }
                        }
                    }

                    wrapped.filter('.text').css({ 'left': '', 'top': '' });
                }

                if(options.containInner && !options.value) {
                    _setAllVisible(child, false);
                    _setAllVisible(visibleWrapped, true);
                }

                if(containerExists) {
                    if(!options.settingChild) container.css('position', 'relative;');
                } else {
                    wrapped.insertBefore(container);
                    container.remove();
                }

                if(childObj && $ax.public.fn.IsDynamicPanel(childObj.type) && window.modifiedDynamicPanleParentOverflowProp) {
                    child.css('overflow', 'hidden');
                    window.modifiedDynamicPanleParentOverflowProp = false;
                }
            }

            // 注释加密 

            if(!needContainer || completeTotal == completeCount) {
                if(options.cull) options.cull.css('position', cullPosition);

                if(needSetSize) {
                    sizeObj.css('width', 'auto');
                    sizeObj.css('height', 'auto');
                }

                options.onComplete && options.onComplete();

                if(options.fire) {
                    $ax.event.raiseSyntheticEvent(childId, options.value ? 'onShow' : 'onHide');
                    $ax.action.fireAnimationFromQueue(childId, $ax.action.queueTypes.fade);
                }
            }
        };

        // 注释加密 
        if(!visibleWrapped.length) {
            if(!options.easing || options.easing == 'none') {
                $ax.visibility.SetIdVisible(childId, options.value);
                completeTotal = 1;
                onComplete();
            } else {
                window.setTimeout(function() {
                    completeCount = completeTotal - 1;
                    onComplete();
                },options.duration);
            }

            return;
        }

        if(!options.easing || options.easing == 'none') {
            $ax.visibility.SetIdVisible(childId, options.value);
            completeTotal = 1;
            onComplete();
        } else if(options.easing == 'fade') {
            if(options.value) {
                if(preserveScroll) {
                    visibleWrapped.css('opacity', 0);
                    visibleWrapped.css('visibility', 'inherit');
                    visibleWrapped.css('display', 'block');
                    // 注释加密 
                    _tryResumeScrollForDP(childId);
                    visibleWrapped.animate({ opacity: 1 }, {
                        duration: options.duration,
                        easing: 'swing',
                        queue: false,
                        complete: function() {
                            $ax.visibility.SetIdVisible(childId, true);
                            visibleWrapped.css('opacity', '');
                            onComplete();
                        }
                    });
                } else {
                    // 注释加密 
                    visibleWrapped.css('visibility', 'inherit');
                    visibleWrapped.fadeIn({
                        queue: false,
                        duration: options.duration, 
                        complete: onComplete
                    });
                }
            } else {
                // 注释加密 
                visibleWrapped.animate({ opacity: 0 }, { duration: options.duration, easing: 'swing', queue: false, complete: function() {
                    $ax.visibility.SetIdVisible(childId, false);
                    visibleWrapped.css('opacity', '');

                    onComplete();
                }});
            }
        } else if (options.easing == 'flip') {
            // 注释加密 
            var trapScroll = _trapScrollLoc(childId);
            var innerContainer = $('<div></div>');
            innerContainer.attr('id', containerId + "_inner");
            innerContainer.data('flip', options.direction == 'left' || options.direction == 'right' ? 'y' : 'x');
            innerContainer.css({
                position: 'relative',
                'width': containerWidth,
                'height': containerHeight,
                'display': 'flex'
            });

            innerContainer.appendTo(container);
            wrapped.appendTo(innerContainer);

            if(childObj && $ax.public.fn.IsDynamicPanel(childObj.type)) var containerDiv = child;
            else containerDiv = parentId ? $jobj(parentId) : child.parent();

            completeTotal = 1;
            var flipdegree;

            var originForFlip = containerWidth / 2 + 'px ' + containerHeight / 2 + 'px';
            if (options.value) {
                innerContainer.css({
                    '-webkit-transform-origin': originForFlip,
                    '-ms-transform-origin': originForFlip,
                    'transform-origin': originForFlip,
                });

                // 注释加密 
                // 注释加密 
                switch(options.direction) {
                    case 'right':
                    case 'left':
                        _setRotateTransformation(innerContainer, _getRotateString(true, options.direction === 'right', options.showFlipBack));
                        flipdegree = 'rotateY(0deg)';
                        break;
                    case 'up':
                    case 'down':
                        _setRotateTransformation(innerContainer, _getRotateString(false, options.direction === 'up', options.showFlipBack));
                        flipdegree = 'rotateX(0deg)';
                        break;
                }

                var onFlipShowComplete = function() {
                    var trapScroll = _trapScrollLoc(childId);
                    $ax.visibility.SetIdVisible(childId, true);

                    wrapped.insertBefore(innerContainer);
                    innerContainer.remove();
                    trapScroll();

                    onComplete();
                };

                innerContainer.css({
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden'
                });

                child.css({
                    'display': '',
                    'visibility': 'inherit'
                });

                visibleWrapped.css({
                    'display': '',
                    'visibility': 'inherit'
                });

                innerContainer.css({
                    '-webkit-transition-duration': options.duration + 'ms',
                    'transition-duration': options.duration + 'ms'
                });

                if(preserveScroll) _tryResumeScrollForDP(childId);
                _setRotateTransformation(innerContainer, flipdegree, containerDiv, onFlipShowComplete, options.duration, true);
            } else { // 注释加密 
                innerContainer.css({
                    '-webkit-transform-origin': originForFlip,
                    '-ms-transform-origin': originForFlip,
                    'transform-origin': originForFlip,
                });
                switch(options.direction) {
                    case 'right':
                    case 'left':
                        flipdegree = _getRotateString(true, options.direction !== 'right', options.showFlipBack);
                        break;
                    case 'up':
                    case 'down':
                        flipdegree = _getRotateString(false, options.direction !== 'up', options.showFlipBack);
                        break;
                }

                var onFlipHideComplete = function() {
                    var trapScroll = _trapScrollLoc(childId);
                    wrapped.insertBefore(innerContainer);
                    $ax.visibility.SetIdVisible(childId, false);

                    innerContainer.remove();
                    trapScroll();

                    onComplete();
                };

                innerContainer.css({
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden',
                    '-webkit-transition-duration': options.duration + 'ms',
                    'transition-duration': options.duration + 'ms'
                });

                if(preserveScroll) _tryResumeScrollForDP(childId);
                _setRotateTransformation(innerContainer, flipdegree, containerDiv, onFlipHideComplete, options.duration, true);
            }

            trapScroll();
        } else {
            // 注释加密 
            completeTotal = $addAll(visibleWrapped, childId).length;
            if(options.value) {
                _slideStateIn(childId, childId, options, size, false, onComplete, visibleWrapped, preserveScroll);
            } else {
                var tops = [];
                var lefts = [];
                for(var i = 0; i < visibleWrapped.length; i++) {
                    var currWrapped = $(visibleWrapped[i]);
                    
                    tops.push(fixAuto(currWrapped, 'top'));
                    lefts.push(fixAuto(currWrapped, 'left'));
                }

                var onOutComplete = function () {
                    // 注释加密 
                    $ax.visibility.SetIdVisible(childId, false);
                    for(i = 0; i < visibleWrapped.length; i++) {
                        currWrapped = $(visibleWrapped[i]);
                        $ax.visibility.SetVisible(currWrapped[0], false);
                        currWrapped.css('top', tops[i]);
                        currWrapped.css('left', lefts[i]);
                    }
                    onComplete();
                };
                _slideStateOut(size, childId, options, onOutComplete, visibleWrapped);
            }
        }

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
    };

    // 注释加密 
    var fixAuto = function (jobj, prop) {
        var val = jobj.css(prop);
        return val == 'auto' ? '0px' : val;
    };

    var _getRotateString = function (y, neg, showFlipBack) {
        // 注释加密 
        // 注释加密 
        return 'rotate' + (y ? 'Y' : 'X') + '(' + (neg ? '-' : '') + (showFlipBack ? 180 : IE ? 91 : 90) + 'deg)';
    }

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    var _wrappedChildren = function (child) {
        return child.children();
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
    };

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var _setRotateTransformation = function(elementsToSet, transformValue, elementParent, flipCompleteCallback, flipDurationMs, useAnimationFrame) {
        if(flipCompleteCallback) {
            // 注释加密 
            // 注释加密 
            window.setTimeout(flipCompleteCallback, flipDurationMs);
        }

        var trasformCss = {
            '-webkit-transform': transformValue,
            '-moz-transform': transformValue,
            '-ms-transform': transformValue,
            '-o-transform': transformValue,
            'transform': transformValue
        };

        if(useAnimationFrame) {
            if (FIREFOX) $('body').hide().show(0); // 注释加密 
            requestAnimationFrame(function() {
                elementsToSet.css(trasformCss);
            });
        } else elementsToSet.css(trasformCss);

        // 注释加密 
        // 注释加密 
        if(elementParent && elementParent.css('overflow') === 'hidden') {
            elementParent.css('overflow', 'visible');
            window.modifiedDynamicPanleParentOverflowProp = true;
        }
    };

    $ax.visibility.GetPanelState = function(id) {
        var children = $ax.visibility.getRealChildren($jobj(id).children());
        for(var i = 0; i < children.length; i++) {
            if(children[i].style && $ax.visibility.IsVisible(children[i])) return children[i].id;
        }
        return '';
    };

    var containerCount = {};
    $ax.visibility.SetPanelState = function(id, stateId, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn, showWhenSet) {
        var show = !$ax.visibility.IsIdVisible(id) && showWhenSet;
        if(show) $ax.visibility.SetIdVisible(id, true);

        // 注释加密 
        if($ax.visibility.IsIdVisible(stateId)) {
            if(show) {
                $ax.event.raiseSyntheticEvent(id, 'onShow');
                // 注释加密 
                $ax.dynamicPanelManager.fitParentPanel(id);
            }

            $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.setState);
            return;
        }

        var hasEasing = easingIn != 'none' || easingOut != 'none';
        if(hasEasing) _pushContainer(id, true);

        var state = $jobj(stateId);
        var oldStateId = $ax.visibility.GetPanelState(id);
        var oldState = $jobj(oldStateId);

        var isFixed = $jobj(id).css('position') == 'fixed';
        // 注释加密 
        if(isFixed) $ax.dynamicPanelManager.adjustFixed(id, oldState.width(), oldState.height(), state.width(), state.height());

        _bringPanelStateToFront(id, stateId, oldStateId, easingIn == 'none' || durationIn == '0');

        var fitToContent = $ax.dynamicPanelManager.isIdFitToContent(id);
        var resized = false;
        if(fitToContent) {
            // 注释加密 
            // 注释加密 
            // 注释加密 
            var newBoundingRect = $ax('#' + stateId).childrenBoundingRect();
            var width = newBoundingRect.right;
            var height = newBoundingRect.bottom;
            var oldBoundingRect = $ax('#' + id).size();
            var oldWidth = oldBoundingRect.right;
            var oldHeight = oldBoundingRect.bottom;
            resized = width != oldWidth || height != oldHeight;
            // 注释加密 

            $ax.visibility.setResizedSize(id, $obj(id).percentWidth ? oldWidth : width, height);
        }

        // 注释加密 
        var movement = (directionOut == 'left' || directionOut == 'up' || state.children().length == 0) && oldState.children().length != 0 ? oldState : state;
        var onCompleteCount = 0;
        var onComplete = function () {
            // 注释加密 
            // 注释加密 
            // 注释加密 
            _bringPanelStateToFront(id, stateId, oldStateId, false);

            if (window.modifiedDynamicPanleParentOverflowProp) {
                var parent = id ? $jobj(id) : child.parent();
                parent.css('overflow', 'hidden');
                window.modifiedDynamicPanleParentOverflowProp = false;
            }

            $ax.dynamicPanelManager.fitParentPanel(id);
            $ax.dynamicPanelManager.updatePanelPercentWidth(id);
            $ax.dynamicPanelManager.updatePanelContentPercentWidth(id);
            $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.setState);
            $ax.event.raiseSyntheticEvent(id, "onPanelStateChange");
            $ax.event.leavingState(oldStateId);
            if (hasEasing) _popContainer(id, true);

            $ax.dynamicPanelManager.updateMobileScroll(id, stateId);
        };
        // 注释加密 
        _setVisibility(id, oldStateId, {
            value: false,
            easing: easingOut,
            direction: directionOut,
            duration: durationOut,
            containerExists: true,
            onComplete: function() { // 注释加密 
                if (++onCompleteCount == 2) onComplete();
            },
            settingChild: true,
            size: movement,
            // 注释加密 
            cull: easingOut == 'none' || state.children().length == 0 ? oldState : state,
            showFlipBack: true
        });

        _setVisibility(id, stateId, {
            value: true,
            easing: easingIn,
            direction: directionIn,
            duration: durationIn,
            containerExists: true,
            onComplete: function () { // 注释加密 
                if (++onCompleteCount == 2) onComplete();
            },
            settingChild: true,
            // 注释加密 
            size: movement,
            showFlipBack: true
        });

        if(show) $ax.event.raiseSyntheticEvent(id, 'onShow');
        if(resized) $ax.event.raiseSyntheticEvent(id, 'onResize');
    };

    var containedFixed = {};
    var _pushContainer = _visibility.pushContainer = function(id, panel) {
        var count = containerCount[id];
        if(count) containerCount[id] = count + 1;
        else {
            var trapScroll = _trapScrollLoc(id);
            var jobj = $jobj(id);
            var children = jobj.children();
            var css = {
                position: 'relative',
                top: 0,
                left: 0
            };

            if(!panel) {
                var boundingRect = $ax('#' + id).offsetBoundingRect();
                // 注释加密 
                css.top = boundingRect.top;
                css.left = boundingRect.left;
            }

            var container = $('<div></div>');
            container.attr('id', ''); // 注释加密 
            container.css(css);
            // 注释加密 
            jobj.append(container);
            containerCount[id] = 1;

            // 注释加密 
            if(panel) {
                for(var i = 0; i < children.length; i++) {
                    var child = $(children[i]);
                    var childContainer = $('<div></div>');
                    childContainer.attr('id', $ax.visibility.applyWidgetContainer(child.attr('id')));
                    childContainer.css(css);
                    child.after(childContainer);
                    childContainer.append(child);
                    container.append(childContainer);
                }
            } else {
                var focus = _getCurrFocus();
                if(focus) $ax.event.addSuppressedEvent($ax.repeater.removeSuffixFromElementId(focus), 'OnLostFocus');

                // 注释加密 
                var childIds = $ax('#' + id).getChildren()[0].children;
                for(var i = 0; i < childIds.length; i++) {
                    var childId = childIds[i];
                    var childObj = $jobj(childId);
                    var fixedInfo = $ax.dynamicPanelManager.getFixedInfo(childId);
                    if(fixedInfo.fixed) {
                        var axObj = $ax('#' + childId);
                        var viewportLocation = axObj.viewportLocation();
                        var left = viewportLocation.left;
                        var top = viewportLocation.top;
                        // 注释加密 
                        // 注释加密 
                        containedFixed[childId] = { left: left, top: top, fixed: fixedInfo };
                        childObj.css('left', left);
                        childObj.css('top', top);
                        childObj.css('margin-left', 0);
                        childObj.css('margin-top', 0);
                        childObj.css('right', 'auto');
                        childObj.css('bottom', 'auto');
                        childObj.css('position', 'absolute');
                    }
                    var cssChange = {
                        left: '-=' + css.left,
                        top: '-=' + css.top
                    };
                    if($ax.getTypeFromElementId(childId) == $ax.constants.LAYER_TYPE) {
                        _pushContainer(childId, false);
                        $ax.visibility.applyWidgetContainer(childId, true).css(cssChange);
                    } else {
                        // 注释加密 
                        // 注释加密 
                        // 注释加密 

                        // 注释加密 
                        // 注释加密 
                        // 注释加密 
                        // 注释加密 
                        // 注释加密 
                        // 注释加密 
                        childObj = $addAll(childObj, childId);
                        childObj.css(cssChange);
                    }

                    container.append(childObj);
                }
                _setCurrFocus(focus);
            }
            container.attr('id', $ax.visibility.applyWidgetContainer(id)); // 注释加密 
            trapScroll();
        }
    };

    var _popContainer = _visibility.popContainer = function (id, panel) {
        var count = containerCount[id];
        if(!count) return;
        count--;
        containerCount[id] = count;
        if(count != 0) return;

        var trapScroll = _trapScrollLoc(id);

        var jobj = $jobj(id);
        var container = $ax.visibility.applyWidgetContainer(id, true);

        // 注释加密 
        // 注释加密 
        // 注释加密 
        var size = $ax('#' + id).size();
        container.css('width', size.width);
        container.css('height', size.height);
        var focus = _getCurrFocus();
        if(focus) $ax.event.addSuppressedEvent($ax.repeater.removeSuffixFromElementId(focus), 'OnLostFocus');
        jobj.append(container.children());
        _setCurrFocus(focus);
        $('body').first().append(container);

        // 注释加密 
        if(panel) {
            var children = jobj.children();
            for(var i = 0; i < children.length; i++) {
                var childContainer = $(children[i]);
                var child = $(childContainer.children()[0]);
                childContainer.after(child);
                childContainer.remove();
            }
        } else {
            var left = container.css('left');
            var top = container.css('top');
            var childIds = $ax('#' + id).getChildren()[0].children;
            for (var i = 0; i < childIds.length; i++) {
                var childId = childIds[i];
                var cssChange = {
                    left: '+=' + left,
                    top: '+=' + top
                };
                if($ax.getTypeFromElementId(childId) == $ax.constants.LAYER_TYPE) {
                    $ax.visibility.applyWidgetContainer(childId, true).css(cssChange);
                    _popContainer(childId, false);
                } else {
                    var childObj = $jobj(childId);
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    
                    var allObjs = $addAll(childObj, childId); // 注释加密 
                    allObjs.css(cssChange);

                    var fixedInfo = containedFixed[childId];
                    if(fixedInfo) {
                        delete containedFixed[childId];

                        childObj.css('position', 'fixed');
                        var deltaX = $ax.getNumFromPx(childObj.css('left')) - fixedInfo.left;
                        var deltaY = $ax.getNumFromPx(childObj.css('top')) - fixedInfo.top;

                        fixedInfo = fixedInfo.fixed;
                        if(fixedInfo.horizontal == 'left') childObj.css('left', fixedInfo.x + deltaX);
                        else if(fixedInfo.horizontal == 'center') {
                            childObj.css('left', '50%');
                            childObj.css('margin-left', fixedInfo.x + deltaX);
                        } else {
                            childObj.css('left', 'auto');
                            childObj.css('right', fixedInfo.x - deltaX);
                        }

                        if(fixedInfo.vertical == 'top') childObj.css('top', fixedInfo.y + deltaY);
                        else if(fixedInfo.vertical == 'middle') {
                            childObj.css('top', '50%');
                            childObj.css('margin-top', fixedInfo.y + deltaY);
                        } else {
                            childObj.css('top', 'auto');
                            childObj.css('bottom', fixedInfo.y - deltaY);
                        }

                        $ax.dynamicPanelManager.updatePanelPercentWidth(childId);
                        $ax.dynamicPanelManager.updatePanelContentPercentWidth(childId);

                    }
                }
            }
        }
        container.remove();
        trapScroll();
    };

    var _trapScrollLoc = function(id) {
        var locs = {};
        var states = $jobj(id).find('.panel_state');
        for(var i = 0; i < states.length; i++) {
            var state = $(states[i]);
            locs[state.attr('id')] = { x: state.scrollLeft(), y: state.scrollTop() };
        }
        return function() {
            for(var key in locs) {
                var state = $jobj(key);
                state.scrollLeft(locs[key].x);
                state.scrollTop(locs[key].y);
            }
        };
    }

    var _getCurrFocus = function () {
        // 注释加密 
        var id = window.lastFocusedClickable && window.lastFocusedClickable.id;

        if(!id) return id;
        var jobj = $(window.lastFocusedClickable);
        return jobj.is('a') || jobj.is('input') ? id : '';
    }

    var _setCurrFocus = function(id) {
        if(id) {
            // 注释加密 
            var trap = $ax.event.blockEvent($ax.repeater.removeSuffixFromElementId(id), 'OnFocus');
            window.setTimeout(function () {
                $jobj(id).focus();
                trap();
            }, 0);
        }
    }

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    var DPStateAndScroll = {}
    var _tryResumeScrollForDP = function (dpId, deleteId) {
        var scrollObj = DPStateAndScroll[dpId];
        if(scrollObj) {
            var shownState = document.getElementById(scrollObj.shownId);
            if(scrollObj.left) shownState.scrollLeft = scrollObj.left;
            if(scrollObj.top) shownState.scrollTop = scrollObj.top;
            if(deleteId) delete DPStateAndScroll[dpId];
        }
    }; // 注释加密 
    var _makeContainer = function (containerId, width, height, isFullWidth, isFlip, offset, containerExists) {
        if(containerExists) var container = $jobj(containerId);
        else {
            container = $('<div></div>');
            container.attr('id', containerId);
        }
        var css = {
            position: 'absolute',
            width: width,
            height: height,
            display: 'flex'
        };

        if(!containerExists) {
            // 注释加密 
            css.top = offset.top;
            css.left = offset.left;
        }


        if(isFlip) {
            css.perspective = '800px';
            css.webkitPerspective = "800px";
            css.mozPerspective = "800px";
        } else css.overflow = 'hidden';

        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        
        container.css(css);
        return container;
    };

    var CONTAINER_SUFFIX = _visibility.CONTAINER_SUFFIX = '_container';
    var CONTAINER_INNER = CONTAINER_SUFFIX + '_inner';
    _visibility.getWidgetFromContainer = function(id) {
        var containerIndex = id.indexOf(CONTAINER_SUFFIX);
        if(containerIndex == -1) return id;
        return id.substr(0, containerIndex) + id.substr(containerIndex + CONTAINER_SUFFIX.length);
    };

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    _visibility.applyWidgetContainer = function (id, returnJobj, skipCheck, checkInner) {
        // 注释加密 
        if(id.indexOf(CONTAINER_SUFFIX) != -1) return returnJobj ? $jobj(id) : id;

        // 注释加密 
        var containerId = $ax.repeater.applySuffixToElementId(id, checkInner ? CONTAINER_INNER : CONTAINER_SUFFIX);
        if(!returnJobj) return containerId;

        // 注释加密 
        var container = $jobj(containerId);
        if(skipCheck || container.length) return container;
        // 注释加密 
        if(!checkInner) return $jobj(id);

        // 注释加密 
        container = $jobj($ax.repeater.applySuffixToElementId(id, CONTAINER_SUFFIX));
        return container.length ? container : $jobj(id);
    };

    _visibility.isContainer = function(id) {
        return id.indexOf(CONTAINER_SUFFIX) != -1;
    };

    _visibility.getRealChildren = function(query) {
        while(query.length && $(query[0]).attr('id').indexOf(CONTAINER_SUFFIX) != -1) query = query.children();
        return query;
    };

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 

    var _slideStateOut = function (container, stateId, options, onComplete, jobj) {
        var directionOut = options.direction;
        var axObject = $ax('#' + container.attr('id'));
        var width = axObject.width();
        var height = axObject.height();

        _blockSetMoveIds = true;

        if(directionOut == "right") {
            $ax.move.MoveWidget(stateId, width, 0, options, false, onComplete, false, jobj, true);
        } else if(directionOut == "left") {
            $ax.move.MoveWidget(stateId, -width, 0, options, false, onComplete, false, jobj, true);
        } else if(directionOut == "up") {
            $ax.move.MoveWidget(stateId, 0, -height, options, false, onComplete, false, jobj, true);
        } else if(directionOut == "down") {
            $ax.move.MoveWidget(stateId, 0, height, options, false, onComplete, false, jobj, true);
        }

        _blockSetMoveIds = false;
    };

    var _slideStateIn = function (id, stateId, options, container, makePanelVisible, onComplete, jobj, preserveScroll) {
        var directionIn = options.direction;
        var axObject = $ax('#' +container.attr('id'));
        var width = axObject.width();
        var height = axObject.height();

        if (makePanelVisible) $ax.visibility.SetIdVisible(id, true);
        for (i = 0; i < jobj.length; i++) $ax.visibility.SetVisible(jobj[i], true);

        for(var i = 0; i < jobj.length; i++) {
            var child = $(jobj[i]);
            var oldTop = $ax.getNumFromPx(fixAuto(child, 'top'));
            var oldLeft = $ax.getNumFromPx(fixAuto(child, 'left'));
            if (directionIn == "right") {
                child.css('left', oldLeft - width + 'px');
            } else if(directionIn == "left") {
                child.css('left', oldLeft + width + 'px');
            } else if(directionIn == "up") {
                child.css('top', oldTop + height + 'px');
            } else if(directionIn == "down") {
                child.css('top', oldTop - height + 'px');
            }
        }

        if(preserveScroll) _tryResumeScrollForDP(id);

        _blockSetMoveIds = true;

        if(directionIn == "right") {
            $ax.move.MoveWidget(stateId, width, 0, options, false, onComplete, false, jobj, true);
        } else if(directionIn == "left") {
            $ax.move.MoveWidget(stateId, -width, 0, options, false, onComplete, false, jobj, true);
        } else if(directionIn == "up") {
            $ax.move.MoveWidget(stateId, 0, -height, options, false, onComplete, false, jobj, true);
        } else if(directionIn == "down") {
            $ax.move.MoveWidget(stateId, 0, height, options, false, onComplete, false, jobj, true);
        }

        _blockSetMoveIds = false;
    };

    $ax.visibility.GetPanelStateId = function(dpId, index) {
        var itemNum = $ax.repeater.getItemIdFromElementId(dpId);
        var panelStateId = $ax.repeater.getScriptIdFromElementId(dpId) + '_state' + index;
        return $ax.repeater.createElementId(panelStateId, itemNum);
    };

    $ax.visibility.GetPanelStateCount = function(id) {
        return $ax.visibility.getRealChildren($jobj(id).children()).length;
    };

    var _bringPanelStateToFront = function (dpId, stateId, oldStateId, oldInFront) {
        var panel = $jobj(dpId);
        var frontId = oldInFront ? oldStateId : stateId;
        if(containerCount[dpId]) {
            frontId = $ax.visibility.applyWidgetContainer(frontId);
            panel = $ax.visibility.applyWidgetContainer(dpId, true, false, true);
        }
        $jobj(frontId).appendTo(panel);
        // 注释加密 
        // 注释加密 
        if((IE || FIREFOX) && window.lastFocusedClickable && $ax.event.getFocusableWidgetOrChildId(window.lastFocusedControl) == window.lastFocusedClickable.id) {
            // 注释加密 
            if($jobj(oldStateId).find('#' + window.lastFocusedClickable.id.split('_')[0]).length) $(window.lastFocusedClickable).triggerHandler('blur');
        }
    };

    var _limboIds = _visibility.limboIds = {};
    // 注释加密 
    var _addLimboAndHiddenIds = $ax.visibility.addLimboAndHiddenIds = function(newLimboIds, newHiddenIds, query, skipRepeater) {
        var limboedByMaster = {};
        for(var key in newLimboIds) {
            if (!$ax.public.fn.IsReferenceDiagramObject($ax.getObjectFromElementId(key).type)) continue;
            var ids = $ax.model.idsInRdoToHideOrLimbo(key);
            for(var i = 0; i < ids.length; i++) limboedByMaster[ids[i]] = true;
        }

        var hiddenByMaster = {};
        for(key in newHiddenIds) {
            if (!$ax.public.fn.IsReferenceDiagramObject($ax.getObjectFromElementId(key).type)) continue;
            ids = $ax.model.idsInRdoToHideOrLimbo(key);
            for(i = 0; i < ids.length; i++) hiddenByMaster[ids[i]] = true;
        }

        // 注释加密 
        newLimboIds = $.extend(newLimboIds, limboedByMaster);
        newHiddenIds = $.extend(newHiddenIds, hiddenByMaster);

        // 注释加密 
        query.each(function(diagramObject, elementId) {
            // 注释加密 
            if(diagramObject.isContained || $ax.public.fn.IsReferenceDiagramObject(diagramObject.type) || $ax.public.fn.IsTableCell(diagramObject.type) || $jobj(elementId).hasClass('sub_menu')) return;
            if(diagramObject.type == 'table' && $jobj(elementId).parent().hasClass('ax_menu')) return;
            if(skipRepeater) {
                // 注释加密 
                if($ax.getParentRepeaterFromElementIdExcludeSelf(elementId)) return;
            }

            var scriptId = $ax.repeater.getScriptIdFromElementId(elementId);
            var shouldBeVisible = Boolean(!newLimboIds[scriptId] && !newHiddenIds[scriptId]);
            var isVisible = Boolean(_isIdVisible(elementId));
            if(shouldBeVisible != isVisible) {
                _setWidgetVisibility(elementId, { value: shouldBeVisible, noContainer: true });
            }
        });

        _limboIds = _visibility.limboIds = $.extend(_limboIds, newLimboIds);

    };

    var _clearLimboAndHidden = $ax.visibility.clearLimboAndHidden = function(ids) {
        _limboIds = _visibility.limboIds = {};
    };

    $ax.visibility.clearLimboAndHiddenIds = function(ids) {
        for(var i = 0; i < ids.length; i++) {
            var scriptId = $ax.repeater.getScriptIdFromElementId(ids[i]);
            delete _limboIds[scriptId];
        }
    };

    $ax.visibility.resetLimboAndHiddenToDefaults = function (query) {
        if(!query) query = $ax('*');
        _clearLimboAndHidden();
        _addLimboAndHiddenIds(_defaultLimbo, _defaultHidden, query);
    };

    $ax.visibility.isScriptIdLimbo = function(scriptId) {
        if(_limboIds[scriptId]) return true;

        var repeater = $ax.getParentRepeaterFromScriptId(scriptId);
        if(!repeater) return false;

        var itemId = $ax.getItemIdsForRepeater(repeater)[0];
        return _limboIds[$ax.repeater.createElementId(scriptId, itemId)];
    }

    $ax.visibility.isElementIdLimboOrInLimboContainer = function (elementId) {
        var parent = document.getElementById(elementId);
        while(parent) {
            var scriptId = $ax.repeater.getScriptIdFromElementId($(parent).attr('id'));
            if(_limboIds[scriptId]) return true;
            parent = parent.parentElement;
        }
        return false;
    }

    var _blockSetMoveIds = false;
    var _movedIds = _visibility.movedIds = {};
    var _resizedIds = _visibility.resizedIds = {};
    var _rotatedIds = _visibility.rotatedIds = {};

    $ax.visibility.getMovedLocation = function(scriptId) {
        return _movedIds[scriptId];

        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
    };

    $ax.visibility.setMovedLocation = function (scriptId, left, top) {
        if ($jobj(scriptId).css('position') == 'fixed') return;
        _movedIds[scriptId] = { left: left, top: top };
    };

    $ax.visibility.moveMovedLocation = function (scriptId, deltaLeft, deltaTop) {
        if(_blockSetMoveIds) return false;

        var offsetLocation = $ax('#' + scriptId).offsetLocation();
        $ax.visibility.setMovedLocation(scriptId, offsetLocation.x + deltaLeft, offsetLocation.y + deltaTop);

        if($ax.getTypeFromElementId(scriptId) == $ax.constants.LAYER_TYPE) {
            var childIds = $ax('#' + scriptId).getChildren()[0].children;
            for (var i = 0; i < childIds.length; i++) {
                $ax.visibility.moveMovedLocation(childIds[i], deltaLeft, deltaTop);
            }
        }
    };

    $ax.visibility.getResizedSize = function(scriptId) {
        return _resizedIds[scriptId];

        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
    };

    $ax.visibility.setResizedSize = function(scriptId, width, height) {
        _resizedIds[scriptId] = { width: width, height: height };
    };

    $ax.visibility.getRotatedAngle = function (scriptId) {
        return _rotatedIds[scriptId];
    };

    $ax.visibility.setRotatedAngle = function (scriptId, rotation) {
        _rotatedIds[scriptId] = rotation;
    };

    $ax.visibility.clearMovedAndResized = function () {
        _movedIds = _visibility.movedIds = {};
        _resizedIds = _visibility.resizedIds = {};
        _rotatedIds = _visibility.rotatedIds = {};
    };

    $ax.visibility.clearMovedAndResizedIds = function (elementIds) {
        for (var i = 0; i < elementIds.length; i++) {
            var id = elementIds[i];
            delete _movedIds[id];
            delete _resizedIds[id];
            delete _rotatedIds[id];
        }
    };

    $ax.visibility.initialize = function() {
        // 注释加密 
        $('.' + HIDDEN_CLASS).each(function (index, diagramObject) {
            _defaultHidden[$ax.repeater.getScriptIdFromElementId(diagramObject.id)] = true;
        });

        $('.' + UNPLACED_CLASS).each(function (index, diagramObject) {
            _defaultLimbo[$ax.repeater.getScriptIdFromElementId(diagramObject.id)] = true;
        });

        _addLimboAndHiddenIds(_defaultLimbo, _defaultHidden, $ax('*'), true);
    };

    _visibility.initRepeater = function(repeaterId) {
        var html = $('<div></div>');
        html.append($jobj(repeaterId + '_script').html());

        html.find('.' + HIDDEN_CLASS).each(function (index, element) {
            _defaultHidden[$ax.repeater.getScriptIdFromElementId(element.id)] = true;
        });

        html.find('.' + UNPLACED_CLASS).each(function (index, element) {
            _defaultLimbo[$ax.repeater.getScriptIdFromElementId(element.id)] = true;
        });
    }

    var HIDDEN_CLASS = _visibility.HIDDEN_CLASS = 'ax_default_hidden';
    var UNPLACED_CLASS = _visibility.UNPLACED_CLASS = 'ax_default_unplaced';

});