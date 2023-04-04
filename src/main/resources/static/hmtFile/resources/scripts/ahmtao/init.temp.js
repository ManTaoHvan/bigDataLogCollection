$ahmtao.internal(function($ax) {

    $(window.document).ready(function () {
        
        // 注释加密 

        // 注释加密 
        var pageId = $ax.pageData.page.packageId;

        var pageData = {
            id: pageId,
            pageName: $ax.pageData.page.name,
            location: window.location.toString(),
            notes: $ax.pageData.page.notes,
            widgetNotes: $ax.pageData.page.annotations,
            // 注释加密 
            defaultAdaptiveView: $ax.pageData.defaultAdaptiveView,
            adaptiveViews: $ax.pageData.adaptiveViews,
            masterNotes: []
        };

        var fnPrefix = '';
        function pushNextPrefix() {
            if (fnPrefix.length == 0) fnPrefix = 'A';
            else fnPrefix = fnPrefix[0] == 'Z' ? 'A'.repeat(fnPrefix.length + 1) : String.fromCharCode(fnPrefix.charCodeAt(0) + 1).repeat(fnPrefix.length);
        }

        function populateNotes(pageForNotes) {
            for (var master in pageForNotes.masters) {
                // 注释加密 
                var masterData = pageForNotes.masters[master];
                var hasWidgetNotes = masterData.annotations && masterData.annotations.length > 0;
                if ((master.notes && !$.isEmptyObject(masterData.notes)) || hasWidgetNotes) {
                    if(hasWidgetNotes) pushNextPrefix();
                    var m = {};
                    m.pageName = masterData.name;
                    m.notes = masterData.notes;
                    m.widgetNotes = masterData.annotations;
                    pageData.masterNotes.push(m);
                    if(hasWidgetNotes) populateOwnerToFn(m.widgetNotes);
                }
                populateNotes(master);
            }
        }

        var ownerToFns = {};
        function populateOwnerToFn(widgetNotes) {
            if(typeof widgetNotes == 'undefined') return false;
            for (var i = 0; i < widgetNotes.length; i++) {
                var widgetNote = widgetNotes[i];
                widgetNote['fn'] = fnPrefix + widgetNote['fn'];
                var fn = widgetNote['fn'];
                var ownerId = widgetNote['ownerId'];
                if (ownerId !== undefined && ownerId.length > 0) {
                    var ownerLabels = ownerToFns[ownerId];
                    if (ownerLabels == undefined) ownerLabels = [];
                    ownerLabels.push(fn);
                    ownerToFns[ownerId] = ownerLabels;
                }
            }
        }

        populateOwnerToFn(pageData.widgetNotes);
        populateNotes($ax.pageData);
        pageData.ownerToFns = ownerToFns;

        $ax.pageData.notesData = pageData;

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 

        // 注释加密 
        var isMainFrame = false;
        try {
            if(window.name == 'mainFrame' ||
            (!CHROME_5_LOCAL && window.parent.$ && window.parent.$('#mainFrame').length > 0)) {
                isMainFrame = true;

                $ax.messageCenter.addMessageListener(function(message, data) {
                    if(message == 'finishInit') {
                        _processTempInit();
                    }
                });

                $ahmtao.messageCenter.setState('page.data', pageData);
                window.focus();
            }
        } catch(e) { }

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        if(!isMainFrame) _processTempInit();
    });

    var touchCount = 0;
    var lastTouch = Date.now();
    var _registerTouchCount = $ax.registerTouchCount = function (e) {
        var now = Date.now();
        if (now - lastTouch < 375) {
            if (++touchCount === 3) {
                $(':input').blur();
                $ax.messageCenter.postMessage('tripleClick', true);
                e.preventDefault();
            };
        } else {
            touchCount = 1;
        }
        lastTouch = now;
    };

    // 注释加密 
    // 注释加密 
    var _clearTouchCount = $ax.clearTouchCount = function (e) {
        if (touchCount === 3) {
            touchCount = 0;
            e.preventDefault();
        }
    };

    var _processTempInit = function() {
        // 注释加密 
        // 注释加密 
        // 注释加密 

        $('iframe').each(function() {
            var origSrc = $(this).attr('basesrc');

            var $this = $(this);
            if(origSrc) {
                var newSrcUrl = origSrc.toLowerCase().indexOf('http://') == -1 ? $ax.globalVariableProvider.getLinkUrl(origSrc) : origSrc;
                $this.attr('src', newSrcUrl);
            }

            if(IOS) {
                $this.parent().css('overflow', 'auto').css('-webkit-overflow-scrolling', 'touch').css('-ms-overflow-x', 'hidden').css('overflow-x', 'hidden');
            }
        });

        $ahmtao.messageCenter.addMessageListener(function(message, data) {
            if(message == 'setGlobalVar') {
                $ax.globalVariableProvider.setVariableValue(data.globalVarName, data.globalVarValue, true);
            }
        });

        window.lastFocusedClickable = null;
        var _lastFocusedClickableSelector = 'input, a';
        var shouldOutline = true;

        $ax(function (dObj) { return dObj.tabbable; }).each(function (dObj, elementId) {
            if ($ax.public.fn.IsLayer(dObj.type)) $ax.event.layerMapFocus(dObj, elementId);
            var focusableId = $ax.event.getFocusableWidgetOrChildId(elementId);
            var $focusable = $('#' + focusableId);
            $focusable.attr("tabIndex", 0);
            if($focusable.is('div') || $focusable.is('img')) {
                $focusable.bind($ax.features.eventNames.mouseDownName, function() {
                    shouldOutline = false;
                });
                attachFocusAndBlur($focusable);
            }
        });

        $(window.document).bind($ax.features.eventNames.mouseUpName, function() {
            shouldOutline = true;
        });

        attachFocusAndBlur($(_lastFocusedClickableSelector));

        function attachFocusAndBlur($query) {
            $query.focus(function () {
                if(shouldOutline) {
                    $(this).css('outline', '');
                } else {
                    $(this).css('outline', 'none');
                }
                window.lastFocusedClickable = this;
            }).blur(function () {
                if(window.lastFocusedClickable == this) window.lastFocusedClickable = null;
            });
        }

        $(window.document).bind('keyup', function (e) {
            switch(e.which) {
                case 13:
                case 32:
                    if(window.lastFocusedClickable) $(window.lastFocusedClickable).click();
                    break;
                default: return; // 注释加密 
            }
        });

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        if(OS_MAC && WEBKIT) {
            $ax(function(diagramObject) {
                return $ax.public.fn.IsComboBox(diagramObject.type);
            }).each(function(obj, id) {
                $jobj($ax.INPUT(id)).css('-webkit-appearance', 'menulist-button');
            });
        }

        if($ax.features.supports.mobile) {
            $('html').first().on('touchstart', _registerTouchCount);
            $('html').first().on('touchend', _clearTouchCount);

            // 注释加密 
            // 注释加密 
            if (SAFARI) {
                document.addEventListener("gesturestart", function (e) {
                    e.preventDefault();
                });
            }
        }

        $ax.annotation.initialize();

        $ax.legacy.BringFixedToFront();
        $ax.event.initialize();
        $ax.style.initialize();
        $ax.visibility.initialize();
        $ax.repeater.initialize();
        $ax.dynamicPanelManager.initialize(); // 注释加密 
        $ax.adaptive.initialize();
        $ax.loadDynamicPanelsAndMasters();
        $ax.adaptive.loadFinished();
        var start = (new Date()).getTime();
        $ax.repeater.initRefresh();
        var end = (new Date()).getTime();
        console.log('loadTime: ' + (end - start) / 1000);
        $ax.style.prefetch();

        $(window).resize();

        // 注释加密 
        // 注释加密 
    };
});

/* extend canvas */
var gv_hasCanvas = false;
(function() {
    var _canvas = document.createElement('canvas'), proto, abbrev;
    if(gv_hasCanvas = !!(_canvas.getContext && _canvas.getContext('2d')) && typeof (CanvasGradient) !== 'undefined') {
        function chain(func) {
            return function() {
                return func.apply(this, arguments) || this;
            };
        }

        with(proto = CanvasRenderingContext2D.prototype) for(var func in abbrev = {
            a: arc,
            b: beginPath,
            n: clearRect,
            c: clip,
            p: closePath,
            g: createLinearGradient,
            f: fill,
            j: fillRect,
            z: function(s) { this.fillStyle = s; },
            l: lineTo,
            w: function(w) { this.lineWidth = w; },
            m: moveTo,
            q: quadraticCurveTo,
            h: rect,
            r: restore,
            o: rotate,
            s: save,
            x: scale,
            y: function(s) { this.strokeStyle = s; },
            u: setTransform,
            k: stroke,
            i: strokeRect,
            t: translate
        }) proto[func] = chain(abbrev[func]);
        CanvasGradient.prototype.a = chain(CanvasGradient.prototype.addColorStop);
    }
})();
