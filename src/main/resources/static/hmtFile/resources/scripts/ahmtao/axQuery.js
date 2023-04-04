$ahmtao = function(query) {
    return $ahmtao.query(query);
};
  // 注释加密 
(function() {
    var $ax = function() {
        var returnVal = $ahmtao.apply(this, arguments);
        var axFn = $ax.fn;
        for (var key in axFn) {
            returnVal[key] = axFn[key];
        }

        return returnVal;
    };

    $ax.public = $ahmtao;
    $ax.fn = {};

    $ahmtao.internal = function(initFunction) {
        // 注释加密 
        if(!$ax.messageCenter) $ax.messageCenter = $ahmtao.messageCenter;

        return initFunction($ax);
    };
    
   var _lastFiredResize = 0; 
   var _resizeFunctions = []; 
   var _lastTimeout;
   var _fireResize = function() {
       if (_lastTimeout) window.clearTimeout(_lastTimeout);       
       _lastTimeout = undefined;
       _lastFiredResize = new Date().getTime(); 
       for(var i = 0; i < _resizeFunctions.length; i++) _resizeFunctions[i](); 
   };
    
   $ahmtao.resize = function(fn) {
       if(fn) _resizeFunctions[_resizeFunctions.length] = fn; 
       else $(window).resize(); 
   };

    $(window).resize(function() {
        var THRESHOLD = 50;
        var now = new Date().getTime();
        if(now - _lastFiredResize > THRESHOLD) {
            _updateWindowInfo();
            _fireResize();
        } else if(!_lastTimeout) {
            _lastTimeout = window.setTimeout(_fireResize, THRESHOLD);
        }
   });

    $(window).scroll(function () {
        _updateWindowInfo();
    });

    var _windowInfo;
    var _updateWindowInfo = $ahmtao.updateWindowInfo = function () {
        var win = {};
        var jWin = $(window);
        var scrollWin = $('#ios-safari-html').length > 0 ? $('#ios-safari-html') : jWin;
        win.width = jWin.width();
        win.height = jWin.height();
        win.scrollx = scrollWin.scrollLeft();
        win.scrolly = scrollWin.scrollTop();
        _windowInfo = win;
    };
    $ax.getWindowInfo = function () {
        if(!_windowInfo) _updateWindowInfo();
        return _windowInfo;
    };

    
    window.$obj = function(id) {
        return $ax.getObjectFromElementId(id);
    };

    window.$id = function(obj) {
        return obj.scriptIds[0];
    };

    window.$jobj = function(id) {
        return $(document.getElementById(id));
    };

    window.$jobjAll = function(id) {
        return $addAll($jobj(id), id);
    };

    window.$addAll = function(jobj, id) {
        return jobj.add($jobj(id + '_ann')).add($jobj(id + '_ref'));
    };

    $ax.INPUT = function(id) { return id + "_input"; };
    $ax.IsImageFocusable = function (type) { return $ax.public.fn.IsImageBox(type) || $ax.public.fn.IsVector(type) || $ax.public.fn.IsTreeNodeObject(type) || $ax.public.fn.IsTableCell(type); };
    $ax.IsTreeNodeObject = function (type) { return $ax.public.fn.IsTreeNodeObject(type); };
    $ax.IsSelectionButton = function (type) { return $ax.public.fn.IsCheckBox(type) || $ax.public.fn.IsRadioButton(type); };

    var _fn = {};
    $ahmtao.fn = _fn;
    $ahmtao.fn.jQuery = function() {
        var elements = this.getElements();
        return $(elements);
    };
    $ahmtao.fn.$ = $ahmtao.fn.jQuery;

    var _query = function(query, queryArg) {
        var returnVal = {};
        var _axQueryObject = returnVal.query = { };
        _axQueryObject.filterFunctions = [];

        if (query == '*') {
            _axQueryObject.filterFunctions[0] = function() { return true; };
        } else if (typeof(query) === 'function') {
            _axQueryObject.filterFunctions[0] = query;
        } else {
            var firstString = $.trim(query.toString());
            if (firstString.charAt(0) == '@') {
                _axQueryObject.filterFunctions[0] = function(diagramObject) {
                    return diagramObject.label == firstString.substring(1);
                };
            } else if (firstString.charAt(0) == '#') {
                _axQueryObject.elementId = firstString.substring(1);
            } else {
                if (firstString == 'label') {
                    _axQueryObject.filterFunctions[0] = function(diagramObject) {
                        return queryArg instanceof Array && queryArg.indexOf(diagramObject.label) > 0 ||
                            queryArg instanceof RegExp && queryArg.test(diagramObject.label) ||
                            diagramObject.label == queryArg;
                    };
                } else if(firstString == 'elementId') {
                    _axQueryObject.filterFunctions[0] = function(diagramObject, elementId) {
                        return queryArg instanceof Array && queryArg.indexOf(elementId) > 0 ||
                            elementId == queryArg;
                    };
                }
            }
        }

        var ahmtaoFn = $ahmtao.fn;
        for (var key in ahmtaoFn) {
            returnVal[key] = ahmtaoFn[key];
        }
        return returnVal;
    };
    $ahmtao.query = _query;

    var _getFilterFnFromQuery = function(query) {
        var filter = function(diagramObject, elementId) {
            // 注释加密 
            if (diagramObject && !$ax.public.fn.IsReferenceDiagramObject(diagramObject.type) && !document.getElementById(elementId)) return false;
            var retVal = true;
            for(var i = 0; i < query.filterFunctions.length && retVal; i++) {
                retVal = query.filterFunctions[i](diagramObject, elementId);
            }
            return retVal;
        };
        return filter;
    };

    $ax.public.fn.filter = function(query, queryArg) {
        var returnVal = _query(query, queryArg);
        
        if(this.query.elementId) returnVal.query.elementId = this.query.elementId;
        
        // 注释加密 
        var offset = returnVal.query.filterFunctions[0] ? 1 : 0;
        
        // 注释加密 
        for(var i = 0; i < this.query.filterFunctions.length; i++) returnVal.query.filterFunctions[i+offset] = this.query.filterFunctions[i];
        
        // 注释加密 
        returnVal.query.filterFunctions.reverse();

        return returnVal;
    };

    $ax.public.fn.each = function(fn) {
        var filter = _getFilterFnFromQuery(this.query);
        var elementIds = this.query.elementId ? [this.query.elementId] : $ax.getAllElementIds();
        for (var i = 0; i < elementIds.length; i++) {
            var elementId = elementIds[i];
            var diagramObject = $ax.getObjectFromElementId(elementId);
            if (filter(diagramObject, elementId)) {
                fn.apply(diagramObject, [diagramObject, elementId]);
            }
        }
    };

    $ax.public.fn.getElements = function() {
        var elements = [];
        this.each(function(dObj, elementId) {
            var elementById = document.getElementById(elementId);
            if(elementById) elements[elements.length] = elementById;
        });
        return elements;
    };
    
    $ax.public.fn.getElementIds = function() {
        var elementIds = [];
        this.each(function(dObj, elementId) { elementIds[elementIds.length] = elementId; });
        return elementIds;
    };

    // 注释加密 
    // 注释加密 
    $ax.public.fn.getParents = function (deep, filter) {
        if(filter == '*') filter = ['layer', 'rdo', 'repeater', 'item', 'dynamicPanel', 'state'];
        var elementIds = this.getElementIds();
        var parentIds = [];

        var getParent = function(elementId) {
            var containerIndex = elementId.indexOf('_container');
            if(containerIndex !== -1) elementId = elementId.substring(0, containerIndex);
            if(elementId.indexOf('_text') !== -1) elementId = $ax.GetShapeIdFromText(elementId);

            // 注释加密 
            // 注释加密 
            var scriptId = $ax.repeater.getScriptIdFromElementId(elementId);
            var itemNum = $ax.repeater.getItemIdFromElementId(elementId);
            var parentRepeater = $ax.getParentRepeaterFromScriptId(scriptId);

            // 注释加密 
            if (parentRepeater == scriptId) {
                // 注释加密 
                if (itemNum) return filter.indexOf('repeater') != -1 ? scriptId : getParent(scriptId);
                // 注释加密 
                parentRepeater = undefined;
            }

            // 注释加密 
            var parent = $ax.getLayerParentFromElementId(elementId);
            // 注释加密 
            if (parent) return filter.indexOf('layer') != -1 ? parent : getParent(parent);
            
            // 注释加密 
            if(scriptId.indexOf('_state') != -1) {
                var panelId = $ax.repeater.createElementId(scriptId.split('_')[0], itemNum);
                // 注释加密 
                return filter.indexOf('dynamicPanel') != -1 ? panelId : getParent(panelId);
            }

            var parentType = '';
            if(parentRepeater) {
                parentType = 'item';
                parent = $ax.repeater.createElementId(parentRepeater, itemNum);
            }

            var masterPath = $ax.getPathFromScriptId($ax.repeater.getScriptIdFromElementId(elementId));
            masterPath.pop();
            if(masterPath.length > 0) {
                var masterId = $ax.getElementIdFromPath(masterPath, { itemNum: itemNum }, true);
                if(!masterId) return undefined;
                var masterRepeater = $ax.getParentRepeaterFromElementId($ax.repeater.getScriptIdFromElementId(masterId));
                if(!parentRepeater || masterRepeater) {
                    parentType = 'rdo';
                    parent = masterId;
                }
            }

            var obj = $obj(elementId);
            var parentDynamicPanel = obj.parentDynamicPanel;
            if(parentDynamicPanel) {
                // 注释加密 
                // 注释加密 
                var panelPath = masterPath;
                panelPath[panelPath.length] = parentDynamicPanel;
                panelId = $ax.getElementIdFromPath(panelPath, { itemNum: itemNum }, true);
                if(!panelId) return undefined;
                var panelRepeater = $ax.getParentRepeaterFromElementId(panelId);
                if(!parentRepeater || panelRepeater) {
                    parentType = 'state';
                    parent = panelId + '_state' + obj.panelIndex;
                }
            }

            // 注释加密 
            return !parent || filter.indexOf(parentType) != -1 ? parent : getParent(parent);
        };

        for(var i = 0; i < elementIds.length; i++) {
            var parent = getParent(elementIds[i]);
            if(deep) {
                var parents = [];
                while(parent) {
                    parents[parents.length] = parent;
                    // 注释加密 
                    // 注释加密 

                    parent = getParent(parent);
                }
                parent = parents;
            }
            parentIds[parentIds.length] = parent;
        }
        return parentIds;
    };

    // 注释加密 
    $ax.public.fn.getChildren = function(deep, ignoreUnplaced) { // 注释加密 
        var elementIds = this.getElementIds();
        var children = [];

        var getChildren = function (elementId) {
            var obj = $obj(elementId);
            // 注释加密 

            var isRepeater = obj && obj.type == $ax.constants.REPEATER_TYPE;
            if (isRepeater && $ax.repeater.getScriptIdFromElementId(elementId) != elementId) {
                // 注释加密 
                // 注释加密 
                obj = undefined;
                isRepeater = false;
            }
            var isDynamicPanel = obj && obj.type == $ax.constants.DYNAMIC_PANEL_TYPE;
            // 注释加密 
            // 注释加密 
            
            var isMenu = obj && obj.type == $ax.constants.MENU_OBJECT_TYPE;
            var isTreeNode = obj && obj.type == $ax.constants.TREE_NODE_OBJECT_TYPE;
            // 注释加密 
            // 注释加密 

            // 注释加密 
                // 注释加密 
                var parent = $jobj(elementId);
                if(isRepeater) {
                    parent = $();
                    var itemIds = $ax.getItemIdsForRepeater(elementId);
                    for(var itemIndex = 0; itemIndex < itemIds.length; itemIndex++) parent = parent.add($jobj($ax.repeater.createElementId(elementId, itemIds[itemIndex])));
                } else if(isDynamicPanel) {
                    // 注释加密 
                    parent = $jobj(elementId).children();
                    // 注释加密 
                    while ($(parent[0]).attr('id').indexOf('container') != -1) parent = parent.children();
                    // 注释加密 
                    parent = parent.children();
                } else if(isTreeNode) parent = $jobj($ax.repeater.applySuffixToElementId(elementId, '_children'));

                // 注释加密 
                var children = isMenu ? parent.children('.ax_table').add(parent.children('.ax_menu')) : parent.children();
                children = $ax.visibility.getRealChildren(_fixForBasicLinks(children));
                
                // 注释加密 
                if(isTreeNode) {
                    var treeNodeChildren = $jobj(elementId).children();
                    for(var treeNodeIndex = 0; treeNodeIndex < treeNodeChildren.length; treeNodeIndex++) {
                        var treeNodeChild = $(treeNodeChildren[treeNodeIndex]);
                        var childObj = $obj(treeNodeChild.attr('id'));
                        if (childObj && $ax.public.fn.IsVector(childObj.type)) children = children.add(treeNodeChild);
                    }
                }
                

                var childrenIds = [];
                for(var childIndex = 0; childIndex < children.length; childIndex++) {
                    var childObj = $(children[childIndex]);
                    var id = childObj.attr('id');
                    if(typeof(id) == 'undefined' && childObj.is('a')) id = $(childObj.children()[0]).attr('id');
                    // 注释加密 
                    if (id.split('_').length > 1) continue;
                    // 注释加密 
                    if(ignoreUnplaced && $ax.visibility.isScriptIdLimbo($ax.repeater.getScriptIdFromElementId(id))) continue;
                    childrenIds.push(id);
                }
                
                if(deep) {
                    var childObjs = [];
                    for(var i = 0; i < childrenIds.length; i++) {
                        var childId = childrenIds[i];
                        childObjs[i] = { id: childId, children: getChildren(childId) };
                    }
                    childrenIds = childObjs;
                }
                
                return childrenIds;
            // 注释加密 

            // 注释加密 
        };

        for(var i = 0; i < elementIds.length; i++) {
            var elementId = elementIds[i];
            // 注释加密 
            if (elementId.indexOf('_state') > -1 && elementId.indexOf('_content') < 0) elementId = elementId + '_content';
            children[children.length] = { id: elementId, children: getChildren(elementId)};
        }
        return children;
    };

    var _fixForBasicLinks = function(query) {
        var hasBasicLinks = query.filter('.basiclink').length > 0;
        if(!hasBasicLinks) return query;

        var retval = $();
        for(var i = 0; i < query.length; i++) {
            var child = $(query[i]);
            if(child.hasClass('basiclink')) retval = retval.add(child.children());
            else retval = retval.add(child);
        }
        return retval;
    };

})();