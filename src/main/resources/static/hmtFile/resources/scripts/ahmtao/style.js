$ahmtao.internal(function($ax) {
    var _style = {};
    $ax.style = _style;

    var _disabledWidgets = {};
    var _selectedWidgets = {};

    // 注释加密 
    var _originalTextCache = {};
    // 注释加密 
    var _shapesWithSetRichText = {};

    // 注释加密 
    var _adaptiveStyledWidgets = {};

    var _setLinkStyle = function(id, styleName) {
        var parentId = $ax.GetParentIdFromLink(id);
        var style = _computeAllOverrides(id, parentId, styleName, $ax.adaptive.currentViewId);

        var textId = $ax.GetTextPanelId(parentId);
        if(!_originalTextCache[textId]) {
            $ax.style.CacheOriginalText(textId);
        }
        if($.isEmptyObject(style)) return;

        var textCache = _originalTextCache[textId].styleCache;

        _transformTextWithVerticalAlignment(textId, function() {
            var cssProps = _getCssStyleProperties(style);
            $('#' + id).find('*').addBack().each(function(index, element) {
                element.setAttribute('style', textCache[element.id]);
                _applyCssProps(element, cssProps);
            });
        });
    };

    var _resetLinkStyle = function(id) {
        var textId = $ax.GetTextPanelId($ax.GetParentIdFromLink(id));
        var textCache = _originalTextCache[textId].styleCache;

        _transformTextWithVerticalAlignment(textId, function() {
            $('#' + id).find('*').addBack().each(function(index, element) {
                element.style.cssText = textCache[element.id];
            });
        });
        if($ax.event.mouseDownObjectId) {
            $ax.style.SetWidgetMouseDown($ax.event.mouseDownObjectId, true);
        } else if($ax.event.mouseOverObjectId) {
            $ax.style.SetWidgetHover($ax.event.mouseOverObjectId, true);
        }
    };

    $ax.style.SetLinkHover = function(id) {
        _setLinkStyle(id, MOUSE_OVER);
    };

    $ax.style.SetLinkNotHover = function(id) {
        _resetLinkStyle(id);
    };

    $ax.style.SetLinkMouseDown = function(id) {
        _setLinkStyle(id, MOUSE_DOWN);
    };

    $ax.style.SetLinkNotMouseDown = function(id) {
        _resetLinkStyle(id);
        var style = _computeAllOverrides(id, $ax.event.mouseOverObjectId, MOUSE_OVER, $ax.adaptive.currentViewId);

        if(!$.isEmptyObject(style)) $ax.style.SetLinkHover(id);
        // 注释加密 
    };

    var _widgetHasState = function(id, state) {
        if($ax.style.getElementImageOverride(id, state)) return true;
        var diagramObject = $ax.getObjectFromElementId(id);

        // 注释加密 
        var adaptiveIdChain = $ax.style.getViewIdChain($ax.adaptive.currentViewId, id, diagramObject);

        for(var i = 0; i < adaptiveIdChain.length; i++) {
            var viewId = adaptiveIdChain[i];
            var adaptiveStyle = diagramObject.adaptiveStyles[viewId];
            if(adaptiveStyle && adaptiveStyle.stateStyles && adaptiveStyle.stateStyles[state]) return true;
        }

        if(diagramObject.style.stateStyles) {
            var stateStyle = diagramObject.style.stateStyles[state];
            if(!stateStyle) return false;
            return !$.isEmptyObject(stateStyle);
        }

        return false;
    };

    // 注释加密 
    var _hoverOverride = function(id) {
        if($ax.style.IsWidgetDisabled(id)) return DISABLED;
        if($ax.style.IsWidgetSelected(id)) return SELECTED;
        var obj = $ax.getObjectFromElementId(id);
        if(!obj.isContained) return false;
        var path = $ax.getPathFromScriptId($ax.repeater.getScriptIdFromElementId(id));
        path[path.length - 1] = obj.parent.id;
        var itemId = $ax.repeater.getItemIdFromElementId(id);
        return _hoverOverride($ax.getElementIdFromPath(path, { itemNum: itemId }));
    };

    $ax.style.SetWidgetHover = function(id, value) {
        var override = _hoverOverride(id);
        if(override == DISABLED) return;
        if(!_widgetHasState(id, MOUSE_OVER)) return;

        var valToSet = value || _isRolloverOverride(id);
        var state = _generateMouseState(id, valToSet ? MOUSE_OVER : NORMAL, override == SELECTED);
        _applyImageAndTextJson(id, state);
        _updateElementIdImageStyle(id, state);
    };

    var _rolloverOverrides = [];
    var _isRolloverOverride = function(id) {
        return _rolloverOverrides.indexOf(id) != -1;
    };

    $ax.style.AddRolloverOverride = function(id) {
        if(_isRolloverOverride(id)) return;
        _rolloverOverrides[_rolloverOverrides.length] = id;
        if($ax.event.mouseOverIds.indexOf(id) == -1) $ax.style.SetWidgetHover(id, true);
    };

    $ax.style.RemoveRolloverOverride = function(id) {
        var index = _rolloverOverrides.indexOf(id);
        if(index == -1) return;
        $ax.splice(_rolloverOverrides, index, 1);
        if($ax.event.mouseOverIds.indexOf(id) == -1) $ax.style.SetWidgetHover(id, false);
    };

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 

    // 注释加密 
    // 注释加密 

    $ax.style.ObjHasMouseDown = function(id) {
        var obj = $obj(id);
        if($ax.style.getElementImageOverride(id, 'mouseDown') || obj.style && obj.style.stateStyles && obj.style.stateStyles.mouseDown) return true;

        // 注释加密 
        var chain = $ax.style.getViewIdChain($ax.adaptive.currentViewId, id, obj);
        for(var i = 0; i < chain.length; i++) {
            var style = obj.adaptiveStyles[chain[i]];
            if(style && style.stateStyles && style.stateStyles.mouseDown) return true;
        }
        return false;
    };

    $ax.style.SetWidgetMouseDown = function(id, value, checkMouseOver) {
        if($ax.style.IsWidgetDisabled(id)) return;
        if(!_widgetHasState(id, MOUSE_DOWN)) return;

        // 注释加密 
        // 注释加密 
        if(value) var state = MOUSE_DOWN;
        else if(!checkMouseOver || $ax.event.mouseOverIds.indexOf(id) !== -1 && _widgetHasState(id, MOUSE_OVER)) state = MOUSE_OVER;
        else state = NORMAL;

        var mouseState = _generateMouseState(id, state, $ax.style.IsWidgetSelected(id));
        _applyImageAndTextJson(id, mouseState);
        _updateElementIdImageStyle(id, mouseState);
    };

    var _generateMouseState = function(id, mouseState, selected) {

        var isSelectedFocused = function (state) {
            if(!_widgetHasState(id, FOCUSED)) return state;

            var jObj = $('#' + id);
            if(state == SELECTED) return (jObj.hasClass(FOCUSED)) ? SELECTED_FOCUSED : state;
            else return (jObj.hasClass(FOCUSED) || jObj.hasClass(SELECTED_FOCUSED)) ? FOCUSED : state;
        }

        if (selected) {
            if (_style.getElementImageOverride(id, SELECTED)) return isSelectedFocused(SELECTED);

            var obj = $obj(id);
            // 注释加密 
            var viewChain = $ax.style.getViewIdChain($ax.adaptive.currentViewId, id, obj);
            viewChain[viewChain.length] = '';
            if($ax.IsDynamicPanel(obj.type) || $ax.IsLayer(obj.type)) return isSelectedFocused(SELECTED);

            var any = function(dict) {
                for(var key in dict) return true;
                return false;
            };

            for(var i = 0; i < viewChain.length; i++) {
                var viewId = viewChain[i];
                // 注释加密 
                var scriptId = $ax.repeater.getScriptIdFromElementId(id);
                if(obj.adaptiveStyles && obj.adaptiveStyles[viewId] && any(obj.adaptiveStyles[viewId])
                    || obj.images && (obj.images[scriptId + '~selected~' + viewId] || obj.images['selected~' + viewId])) return isSelectedFocused(SELECTED);
            }
            var selectedStyle = obj.style && obj.style.stateStyles && obj.style.stateStyles.selected;
            if(selectedStyle && any(selectedStyle)) return isSelectedFocused(SELECTED);
        }

        // 注释加密 
        return isSelectedFocused(mouseState);
    };

    $ax.style.SetWidgetFocused = function (id, value) {
        if (_isWidgetDisabled(id)) return;
        if (!_widgetHasState(id, FOCUSED)) return;

        if (value) var state = $ax.style.IsWidgetSelected(id) ? SELECTED_FOCUSED : FOCUSED;
        else state = $ax.style.IsWidgetSelected(id) ? SELECTED : NORMAL;

        _applyImageAndTextJson(id, state);
        _updateElementIdImageStyle(id, state);
    }

    $ax.style.SetWidgetSelected = function(id, value, alwaysApply) {
        if(_isWidgetDisabled(id)) return;
        // 注释加密 
        var raiseSelectedEvents = $ax.style.IsWidgetSelected(id) != value;

        if(value) {
            var group = $('#' + id).attr('selectiongroup');
            if(group) {
                $("[selectiongroup='" + group + "']").each(function() {
                    var otherId = this.id;
                    if(otherId == id) return;
                    if ($ax.visibility.isScriptIdLimbo($ax.repeater.getScriptIdFromElementId(otherId))) return;

                    $ax.style.SetWidgetSelected(otherId, false, alwaysApply);
                });
            }
        }
        var obj = $obj(id);
        if(obj) {
            var actionId = id;
            if ($ax.public.fn.IsDynamicPanel(obj.type) || $ax.public.fn.IsLayer(obj.type)) {
                if(!value) $jobj(id).removeClass('selected');
                var children = $ahmtao('#' + id).getChildren()[0].children;
                for(var i = 0; i < children.length; i++) {
                    var childId = children[i];
                    // 注释加密 
                    var childObj = $jobj(childId);
                    if(childObj.hasClass('treeroot')) {
                        var treenodes = childObj.find('.treenode');
                        for(var j = 0; j < treenodes.length; j++) {
                            $ahmtao('#' + treenodes[j].id).selected(value);
                        }
                    } else $ahmtao('#' + childId).selected(value);
                }
            } else {
                var widgetHasSelectedState = _widgetHasState(id, SELECTED);
                while(obj.isContained && !widgetHasSelectedState) obj = obj.parent;
                var itemId = $ax.repeater.getItemIdFromElementId(id);
                var path = $ax.getPathFromScriptId($ax.repeater.getScriptIdFromElementId(id));
                path[path.length - 1] = obj.id;
                actionId = $ax.getElementIdFromPath(path, { itemNum: itemId });
                if(alwaysApply || widgetHasSelectedState) {
                    var state = _generateSelectedState(actionId, value);
                    _applyImageAndTextJson(actionId, state);
                    _updateElementIdImageStyle(actionId, state);
                }
                // 注释加密 
                // 注释加密 
                while(obj.isContained && !$ax.getObjectFromElementId(id).interactionMap) obj = obj.parent;
                path = $ax.getPathFromScriptId($ax.repeater.getScriptIdFromElementId(id));
                path[path.length - 1] = obj.id;
                actionId = $ax.getElementIdFromPath(path, { itemNum: itemId });
            }
        }

        // 注释加密 
        _selectedWidgets[id] = value;
        if(raiseSelectedEvents) $ax.event.raiseSelectedEvents(actionId, value);
    };

    var _generateSelectedState = function(id, selected) {
        var mouseState = $ax.event.mouseDownObjectId == id ? MOUSE_DOWN : $.inArray(id, $ax.event.mouseOverIds) != -1 ? MOUSE_OVER : NORMAL;
        // 注释加密 
        return _generateMouseState(id, mouseState, selected);
    };

    $ax.style.IsWidgetSelected = function(id) {
        return Boolean(_selectedWidgets[id]) || $('#'+id).hasClass('selected');
    };

    $ax.style.SetWidgetEnabled = function(id, value) {
        _disabledWidgets[id] = !value;
        $('#' + id).find('a').css('cursor', value ? 'pointer' : 'default');

        if(!_widgetHasState(id, DISABLED)) return;
        if(!value) {
            _applyImageAndTextJson(id, DISABLED);
            _updateElementIdImageStyle(id, DISABLED);
        } else $ax.style.SetWidgetSelected(id, $ax.style.IsWidgetSelected(id), true);
    };

    $ax.style.SetWidgetPlaceholder = function(id, active, text, password) {
        var inputId = $ax.repeater.applySuffixToElementId(id, '_input');

        // 注释加密 
        // 注释加密 
        var obj = $jobj(inputId);

        var height = document.getElementById(inputId).style['height'];
        var width = document.getElementById(inputId).style['width'];
        obj.attr('style', '');
        // 注释加密 
        // 注释加密 
        if (height) obj.css('height', height);
        if (width) obj.css('width', width);

        if(!active) {
            try { // 注释加密 
                if(password) document.getElementById(inputId).type = 'password';
            } catch(e) { } 
        } else {
            var element = $('#' + inputId)[0];
            var style = _computeAllOverrides(id, undefined, HINT, $ax.adaptive.currentViewId);
            var styleProperties = _getCssStyleProperties(style);

            // 注释加密 
            // 注释加密 

            _applyCssProps(element, styleProperties, true);
            try { // 注释加密 
                if(password && text) document.getElementById(inputId).type = 'text';
            } catch(e) { }
        }
        obj.val(text);
    };

    var _isWidgetDisabled = $ax.style.IsWidgetDisabled = function(id) {
        return Boolean(_disabledWidgets[id]);
    };

    var _elementIdsToImageOverrides = {};
    $ax.style.mapElementIdToImageOverrides = function (elementId, override) {
        for(var key in override) _addImageOverride(elementId, key, override[key]);
    };

    var _addImageOverride = function (elementId, state, val) {
        if (!_elementIdsToImageOverrides[elementId]) _elementIdsToImageOverrides[elementId] = {};
        _elementIdsToImageOverrides[elementId][state] = val;
    }

    $ax.style.deleteElementIdToImageOverride = function(elementId) {
        delete _elementIdsToImageOverrides[elementId];
    };

    $ax.style.getElementImageOverride = function(elementId, state) {
        var url = _elementIdsToImageOverrides[elementId] && _elementIdsToImageOverrides[elementId][state];
        return url;
    };

    $ax.style.elementHasAnyImageOverride = function(elementId) {
        return Boolean(_elementIdsToImageOverrides[elementId]);
    };

    var NORMAL = 'normal';
    var MOUSE_OVER = 'mouseOver';
    var MOUSE_DOWN = 'mouseDown';
    var SELECTED = 'selected';
    var DISABLED = 'disabled';
    var HINT = 'hint';
    var FOCUSED = 'focused';
    var SELECTED_FOCUSED = 'selectedFocused';

    var _generateState = _style.generateState = function(id) {
        return $ax.placeholderManager.isActive(id) ? HINT : _style.IsWidgetDisabled(id) ? DISABLED : _generateSelectedState(id, _style.IsWidgetSelected(id));
    };

    var _progressState = _style.progessState = function(state) {
        if(state == NORMAL) return false;
        if(state == MOUSE_DOWN) return MOUSE_OVER;
        return NORMAL;
    };

    var _unprogressState = function(state, goal) {
        state = state || NORMAL;
        if(state == goal || state == SELECTED_FOCUSED) return undefined;
        if(state == NORMAL && goal == MOUSE_DOWN) return MOUSE_OVER;
        if(state == NORMAL && goal == SELECTED_FOCUSED) return SELECTED;
        if(state == SELECTED && goal == SELECTED_FOCUSED) return FOCUSED;
        return goal;
    };

    var _updateElementIdImageStyle = _style.updateElementIdImageStyle = function(elementId, state) {
        if(!_style.elementHasAnyImageOverride(elementId)) return;

        if(!state) state = _generateState(elementId);

        var style = _computeFullStyle(elementId, state, $ax.adaptive.currentViewId);

        var query = $jobj($ax.repeater.applySuffixToElementId(elementId, '_img'));
        style.size.width = query.width();
        style.size.height = query.height();
        var borderId = $ax.repeater.applySuffixToElementId(elementId, '_border');
        var borderQuery = $jobj(borderId);
        if(!borderQuery.length) {
            borderQuery = $('<div></div>');
            borderQuery.attr('id', borderId);
            query.after(borderQuery);
        }

        borderQuery.attr('style', '');
        // 注释加密 
        query.attr('style', '');

        var borderQueryCss = { 'position': 'absolute' };
        var queryCss = {}

        var borderWidth = Number(style.borderWidth);
        var hasBorderWidth = borderWidth > 0;
        if(hasBorderWidth) {
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
            borderQueryCss['border-style'] = 'solid';
            borderQueryCss['border-width'] = borderWidth + 'px'; // 注释加密 
            borderQueryCss['width'] = style.size.width - borderWidth * 2;
            borderQueryCss['height'] = style.size.height - borderWidth * 2;
        }

        var linePattern = style.linePattern;
        if(hasBorderWidth && linePattern) borderQueryCss['border-style'] = linePattern;

        var borderFill = style.borderFill;
        if(hasBorderWidth && borderFill) {
            var color = borderFill.fillType == 'solid' ? borderFill.color :
                borderFill.fillType == 'linearGradient' ? borderFill.colors[0].color : 0;

            var alpha = Math.floor(color / 256 / 256 / 256);
            color -= alpha * 256 * 256 * 256;
            alpha = alpha / 255;

            var red = Math.floor(color / 256 / 256);
            color -= red * 256 * 256;
            var green = Math.floor(color / 256);
            var blue = color - green * 256;

            borderQueryCss['border-color'] = _rgbaToFunc(red, green, blue, alpha);
        }

        var cornerRadiusTopLeft = style.cornerRadius;
        if(cornerRadiusTopLeft) {
            queryCss['border-radius'] = cornerRadiusTopLeft + 'px';
            borderQueryCss['border-radius'] = cornerRadiusTopLeft + 'px';
        }

        var outerShadow = style.outerShadow;
        if(outerShadow && outerShadow.on) {
            var arg = '';
            arg += outerShadow.offsetX + 'px' + ' ' + outerShadow.offsetY + 'px' + ' ';
            var rgba = outerShadow.color;
            arg += outerShadow.blurRadius + 'px' + ' 0px ' + _rgbaToFunc(rgba.r, rgba.g, rgba.b, rgba.a);
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
            queryCss['-moz-box-shadow'] = arg;
            queryCss['-wibkit-box-shadow'] = arg;
            queryCss['box-shadow'] = arg;
            queryCss['left'] = '0px';
            queryCss['top'] = '0px';
        }

        queryCss['width'] = style.size.width;
        queryCss['height'] = style.size.height;

        borderQuery.css(borderQueryCss);
        query.css(queryCss);

        // 注释加密 
    };

    var _rgbaToFunc = function(red, green, blue, alpha) {
        return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
    };

    var _applyImageAndTextJson = function(id, event) {
        var textId = $ax.GetTextPanelId(id);
        if(textId) _resetTextJson(id, textId);

        // 注释加密 
        // 注释加密 
        var imgQuery = $jobj($ax.GetImageIdFromShape(id));
        var e = imgQuery.data('events');
        if(e && e[event]) imgQuery.trigger(event);

        var imageUrl = $ax.adaptive.getImageForStateAndView(id, event);
        if(imageUrl) _applyImage(id, imageUrl, event);

        var style = _computeAllOverrides(id, undefined, event, $ax.adaptive.currentViewId);
        if(!$.isEmptyObject(style) && textId) _applyTextStyle(textId, style);

        _updateStateClasses(id, event);
        _updateStateClasses($ax.repeater.applySuffixToElementId(id, '_div'), event);
        _updateStateClasses($ax.repeater.applySuffixToElementId(id, '_input'), event);
    };

    var _updateStateClasses = function(id, event) {
        var jobj = $jobj(id);

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
            for (var i = 0; i < ALL_STATES.length; i++) jobj.removeClass(ALL_STATES[i]);
            if (event == 'mouseDown') jobj.addClass('mouseOver');
            if(event != 'normal') jobj.addClass(event);
        // 注释加密 
    }

    /* -------------------

    here's the algorithm in a nutshell:
    [DOWN] -- refers to navigation down the view inheritance heirarchy (default to most specific)
    [UP] -- navigate up the heirarchy

    ComputeAllOverrides (object):
    All view styles [DOWN]
    If hyperlink
    - DO ComputeStateStyle for parent object
    - if (MouseOver || MouseDown) 
    - linkMouseOver Style
    - if (MouseDown) 
    - linkMouseDown style
    - ComputeStateStyleForViewChain (parent, STATE)
    
    if (MouseDown) DO ComputeStateStyleForViewChain for object, mouseOver
    DO ComputeStateStyleForViewChain for object, style


    ComputeStateStyleForViewChain (object, STATE)
    FIRST STATE state style [UP] the chain OR default object STATE style

    ------------------- */

    var FONT_PROPS = {
        'typeface': true,
        'fontName': true,
        'fontWeight': true,
        'fontStyle': true,
        'fontStretch': true,
        'fontSize': true,
        'underline': true,
        'foreGroundFill': true,
        'horizontalAlignment': true,
        'letterCase': true,
        'strikethrough': true
    };

    var _getViewIdChain = $ax.style.getViewIdChain = function(currentViewId, id, diagramObject) {
        var viewIdChain;
        if (diagramObject.owner.type != 'ahmtao:Master') {
            viewIdChain = $ax.adaptive.getAdaptiveIdChain(currentViewId);
        } else {
            // 注释加密 
            var parentRdoId = $ax('#' + id).getParents(true, ['rdo'])[0][0];
            var rdoState = $ax.style.generateState(parentRdoId);
            var rdoStyle = $ax.style.computeFullStyle(parentRdoId, rdoState, currentViewId);
            var viewOverride = rdoStyle.viewOverride;
            viewIdChain = $ax.adaptive.getMasterAdaptiveIdChain(diagramObject.owner.packageId, viewOverride);
        }
        return viewIdChain;
    }

    var _computeAllOverrides = $ax.style.computeAllOverrides = function(id, parentId, state, currentViewId) {
        var computedStyle = {};
        if(parentId) computedStyle = _computeAllOverrides(parentId, null, state, currentViewId);

        var diagramObject = $ax.getObjectFromElementId(id);

        var viewIdChain = _getViewIdChain(currentViewId, id, diagramObject);
        var excludeFont = _shapesWithSetRichText[id];
        for(var i = 0; i < viewIdChain.length; i++) {
            var viewId = viewIdChain[i];
            var style = diagramObject.adaptiveStyles[viewId];
            if(style) {
                // 注释加密 
                // 注释加密 
                if(excludeFont) {
                    style = $ax.deepCopy(style);
                    for(var prop in FONT_PROPS) delete style[prop];
                }

                if(style) {
                    var customStyle = style.baseStyle && $ax.document.stylesheet.stylesById[style.baseStyle];
                    // 注释加密 
                    $.extend(computedStyle, customStyle);
                }
                $.extend(computedStyle, style);
            }
        }

        var currState = NORMAL;
        while(currState) {
            $.extend(computedStyle, _computeStateStyleForViewChain(diagramObject, currState, viewIdChain, true));
            currState = _unprogressState(currState, state);
        }

        return _removeUnsupportedProperties(computedStyle, diagramObject);
    };

    var _computeStateStyleForViewChain = function(diagramObject, state, viewIdChain, excludeNormal) {
        var styleObject = diagramObject;
        while(styleObject.isContained) styleObject = styleObject.parent;

        var adaptiveStyles = styleObject.adaptiveStyles;

        for(var i = viewIdChain.length - 1; i >= 0; i--) {
            var viewId = viewIdChain[i];
            var viewStyle = adaptiveStyles[viewId];
            var stateStyle = viewStyle && _getFullStateStyle(viewStyle, state, excludeNormal);
            if (stateStyle) return $.extend({}, stateStyle);
            else if (viewStyle && viewStyle.stateStyles) return {}; // 注释加密 
        }

        // 注释加密 
        var stateStyleFromDefault = _getFullStateStyle(styleObject.style, state, true);
        return $.extend({}, stateStyleFromDefault);
    };

    // 注释加密 
    var _computeFullStyle = $ax.style.computeFullStyle = function(id, state, currentViewId) {
        var obj = $obj(id);
        var overrides = _computeAllOverrides(id, undefined, state, currentViewId);
        // 注释加密 
        var objStyle = obj.style;
        var customStyle = objStyle.baseStyle && $ax.document.stylesheet.stylesById[objStyle.baseStyle];
        var returnVal = $.extend({}, $ax.document.stylesheet.defaultStyle, customStyle, objStyle, overrides);
        return _removeUnsupportedProperties(returnVal, obj);
    };

    var _removeUnsupportedProperties = function(style, object) {
        // 注释加密 
        if ($ax.public.fn.IsRadioButton(object.type) || $ax.public.fn.IsCheckBox(object.type)) {
            style.paddingTop = 0;
            style.paddingLeft = 0;
            style.paddingRight = 0;
            style.paddingBottom = 0;
        }
        if ($ax.public.fn.IsTextBox(object.type) || $ax.public.fn.IsTextArea(object.type) || $ax.public.fn.IsButton(object.type)
            || $ax.public.fn.IsListBox(object.type) || $ax.public.fn.IsComboBox(object.type)) {
            if (object.images && style.fill) delete style['fill'];
        }

        return style;
    };

    var _getFullStateStyle = function(style, state, excludeNormal) {
        // 注释加密 
        var stateStyle = state == 'normal' && !excludeNormal ? style : style && style.stateStyles && style.stateStyles[state];
        if(stateStyle) {
            var customStyle = stateStyle.baseStyle && $ax.document.stylesheet.stylesById[stateStyle.baseStyle];
            // 注释加密 
            return $.extend({}, customStyle, stateStyle);
        }
        return undefined;
    };

    // 注释加密 
    var _applyOpacityFromStyle = $ax.style.applyOpacityFromStyle = function(id, style) {
        return;
        var opacity = style.opacity || '';
        $jobj(id).children().css('opacity', opacity);
    };

    var _initialize = function() {
        // 注释加密 
    };
    $ax.style.initialize = _initialize;

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

    var ALL_STATES = ['mouseOver', 'mouseDown', 'selected', 'focused', 'selectedFocused', 'disabled'];
    var _applyImage = $ax.style.applyImage = function (id, imgUrl, state) {
            var object = $obj(id);
            if (object.generateCompound) {
                for (var i = 0; i < object.compoundChildren.length; i++) {
                    var componentId = object.compoundChildren[i];
                    var childId = $ax.public.fn.getComponentId(id, componentId);
                    var childImgQuery = $jobj(childId + '_img');
                    var childQuery = $jobj(childId);
                    childImgQuery.attr('src', imgUrl[componentId]);
                    for (var j = 0; j < ALL_STATES.length; j++) {
                        childImgQuery.removeClass(ALL_STATES[j]);
                        childQuery.removeClass(ALL_STATES[j]);
                    }
                    if (state != 'normal') {
                        childImgQuery.addClass(state);
                        childQuery.addClass(state);
                    }
                }
            } else {
                var imgQuery = $jobj($ax.GetImageIdFromShape(id));
                var idQuery = $jobj(id);
                // 注释加密 
                imgQuery.attr('src', imgUrl);
                for (var i = 0; i < ALL_STATES.length; i++) {
                    idQuery.removeClass(ALL_STATES[i]);
                    imgQuery.removeClass(ALL_STATES[i]);
                }
                if (state != 'normal') {
                    idQuery.addClass(state);
                    imgQuery.addClass(state);
                }
                if (imgQuery.parents('a.basiclink').length > 0) imgQuery.css('border', 'none');
            }

    };

    $ax.public.fn.getComponentId = function (id, componentId) {
        var idParts = id.split('-');
        idParts[0] = idParts[0] + componentId;
        return idParts.join('-');
    }

    var _resetTextJson = function(id, textid) {
        // 注释加密 
        $jobj(id).children().css('opacity', '');

        var cacheObject = _originalTextCache[textid];
        if(cacheObject) {
            _transformTextWithVerticalAlignment(textid, function() {
                var styleCache = cacheObject.styleCache;
                var textQuery = $('#' + textid);
                textQuery.find('*').each(function(index, element) {
                    element.style.cssText = styleCache[element.id];
                });
            });
        }
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
    // 注释加密 
    // 注释加密 

    var _transformTextWithVerticalAlignment = $ax.style.transformTextWithVerticalAlignment = function(textId, transformFn) {
        if(!_originalTextCache[textId]) {
            $ax.style.CacheOriginalText(textId);
        }

        var rtfElement = window.document.getElementById(textId);
        if(!rtfElement) return;

        transformFn();

        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
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

    var _getObjVisible = _style.getObjVisible = function (id) {
        var element = document.getElementById(id);
        return element && (element.offsetWidth || element.offsetHeight);
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

    $ax.style.reselectElements = function() {
        for(var id in _selectedWidgets) {
            // 注释加密 
            if(!_selectedWidgets[id] || $jobj(id).hasClass('selected')) continue;

            $jobj(id).addClass('selected');
            _applyImageAndTextJson(id, $ax.style.generateState(id));
        }

        for(id in _disabledWidgets) {
            // 注释加密 
            if (!_disabledWidgets[id] || $jobj(id).hasClass('disabled')) continue;

            $jobj(id).addClass('disabled');
            _applyImageAndTextJson(id, $ax.style.generateState(id));
        }
    }

    $ax.style.clearStateForRepeater = function(repeaterId) {
        var children = $ax.getChildElementIdsForRepeater(repeaterId);
        for(var i = 0; i < children.length; i++) {
            var id = children[i];
            delete _selectedWidgets[id];
            delete _disabledWidgets[id];
        }
    }

    _style.updateStateClass = function (repeaterId) {
        var subElementIds = $ax.getChildElementIdsForRepeater(repeaterId);
        for (var i = 0; i < subElementIds.length; i++) {
            _applyImageAndTextJson(subElementIds[i], $ax.style.generateState(subElementIds[i]));
        }
    }

    $ax.style.clearAdaptiveStyles = function() {
        for(var shapeId in _adaptiveStyledWidgets) {
            var repeaterId = $ax.getParentRepeaterFromScriptId(shapeId);
            if(repeaterId) continue;
            var elementId = $ax.GetButtonShapeId(shapeId);
            if(elementId) _applyImageAndTextJson(elementId, $ax.style.generateState(elementId));
        }

        _adaptiveStyledWidgets = {};
    };

    $ax.style.setAdaptiveStyle = function(shapeId, style) {
        _adaptiveStyledWidgets[$ax.repeater.getScriptIdFromElementId(shapeId)] = style;

        var textId = $ax.GetTextPanelId(shapeId);
        if(textId) _applyTextStyle(textId, style);

        $ax.placeholderManager.refreshPlaceholder(shapeId);

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
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
    var _applyTextStyle = function(id, style) {
        _transformTextWithVerticalAlignment(id, function() {
            var styleProperties = _getCssStyleProperties(style);
            $('#' + id).find('*').each(function(index, element) {
                _applyCssProps(element, styleProperties);
            });
        });
    };

    var _applyCssProps = function(element, styleProperties, applyAllStyle) {
        if(applyAllStyle) {
            var allProps = styleProperties.allProps;
            for(var prop in allProps) element.style[prop] = allProps[prop];
        } else {
            var nodeName = element.nodeName.toLowerCase();
            if(nodeName == 'p') {
                var parProps = styleProperties.parProps;
                for(prop in parProps) element.style[prop] = parProps[prop];
            } else if(nodeName != 'a') {
                var runProps = styleProperties.runProps;
                for(prop in runProps) element.style[prop] = runProps[prop];
            }
        }
    };

    var _getCssShadow = function(shadow) {
        return !shadow.on ? "none"
            : shadow.offsetX + "px " + shadow.offsetY + "px " + shadow.blurRadius + "px " + _getCssColor(shadow.color);
    };

    var _getCssStyleProperties = function(style) {
        var toApply = {};
        toApply.runProps = {};
        toApply.parProps = {};
        toApply.allProps = {};

        if(style.fontName) toApply.allProps.fontFamily = toApply.runProps.fontFamily = style.fontName;
        // 注释加密 
        if(style.fontSize) toApply.allProps.fontSize = toApply.runProps.fontSize = toApply.parProps.fontSize = style.fontSize;
        if(style.fontWeight !== undefined) toApply.allProps.fontWeight = toApply.runProps.fontWeight = style.fontWeight;
        if(style.fontStyle !== undefined) toApply.allProps.fontStyle = toApply.runProps.fontStyle = style.fontStyle;

        var textDecoration = [];
        if(style.underline !== undefined) textDecoration[0] = style.underline ? 'underline ' : 'none';
        if(style.strikethrough !== undefined) {
            var index = textDecoration.length;
            if(style.strikethrough) textDecoration[index] ='line-through';
            else if(index == 0) textDecoration[0] = 'none';
        } 
        if (textDecoration.length > 0) {
            var decorationLineUp = "";
            for (var l = 0; l < textDecoration.length; l++) {
                decorationLineUp = decorationLineUp + textDecoration[l];
            }
            toApply.allProps.textDecoration = toApply.runProps.textDecoration = decorationLineUp;
        }
        if(style.foreGroundFill) {
            toApply.allProps.color = toApply.runProps.color = _getColorFromFill(style.foreGroundFill);
            // 注释加密 
        }
        if(style.horizontalAlignment) toApply.allProps.textAlign = toApply.parProps.textAlign = toApply.runProps.textAlign = style.horizontalAlignment;
        if(style.lineSpacing) toApply.allProps.lineHeight = toApply.parProps.lineHeight = style.lineSpacing;
        if(style.textShadow) toApply.allProps.textShadow = toApply.parProps.textShadow = _getCssShadow(style.textShadow);
        if (style.letterCase) toApply.allProps.textTransform = toApply.parProps.textTransform = style.letterCase;
        if (style.characterSpacing) toApply.allProps.letterSpacing = toApply.runProps.letterSpacing = style.characterSpacing;

        return toApply;
    };

    var _getColorFromFill = function(fill) {
        // 注释加密 
        // 注释加密 
        var val = fill.color;
        var color = {};
        color.b = val % 256;
        val = Math.floor(val / 256);
        color.g = val % 256;
        val = Math.floor(val / 256);
        color.r = val % 256;
        color.a = typeof (fill.opacity) == 'number' ? fill.opacity : 1;
        return _getCssColor(color);
    };

    var _getCssColor = function(rgbaObj) {
        return "rgba(" + rgbaObj.r + ", " + rgbaObj.g + ", " + rgbaObj.b + ", " + rgbaObj.a + ")";
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
    // 注释加密 
    var CACHE_COUNTER = 0;

    $ax.style.CacheOriginalText = function(textId, hasRichTextBeenSet) {
        var rtfQuery = $('#' + textId);
        if(rtfQuery.length > 0) {

            var styleCache = {};
            rtfQuery.find('*').each(function(index, element) {
                var elementId = element.id;
                if(!elementId) element.id = elementId = 'cache' + CACHE_COUNTER++;
                styleCache[elementId] = element.style.cssText;
            });

            _originalTextCache[textId] = {
                styleCache: styleCache
            };
            if(hasRichTextBeenSet) {
                var shapeId = $ax.GetShapeIdFromText(textId);
                _shapesWithSetRichText[shapeId] = true;
            }
        }
    };

    $ax.style.ClearCacheForRepeater = function(repeaterId) {
        for(var elementId in _originalTextCache) {
            var scriptId = $ax.repeater.getScriptIdFromElementId(elementId);
            if($ax.getParentRepeaterFromScriptId(scriptId) == repeaterId) delete _originalTextCache[elementId];
        }
    };



    $ax.style.prefetch = function() {
        var scriptIds = $ax.getAllScriptIds();
        var image = new Image();
        for(var i = 0; i < scriptIds.length; i++) {
            var obj = $obj(scriptIds[i]);
            if (!$ax.public.fn.IsImageBox(obj.type)) continue;
            var images = obj.images;
            for (var key in images) image.src = images[key];

            var imageOverrides = obj.imageOverrides;
            for(var elementId in imageOverrides) {
                var override = imageOverrides[elementId];
                for (var state in override) {
                    _addImageOverride(elementId, state, override[state]);
                    image.src = override[state];
                }
            }
        }
    };
});