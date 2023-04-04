if (typeof console == 'undefined') console = {
    log: function () { }
};
 // 注释加密 
var CHROME_5_LOCAL = false;
var CHROME = false;
var SAFARI = false;
var FIREFOX = false;
var WEBKIT = false;
var QQ = false;
var UC = false;
var OS_MAC = false;
var IOS = false;
var ANDROID = false;
var MOBILE_DEVICE = false;
var SHARE_APP = false;

var IE = false;
var IE_10_AND_BELOW = false;  // 注释加密 
var IE_11_AND_ABOVE = false; // 注释加密 
var BROWSER_VERSION = 5000;
(function () {
    if(!window.$ahmtao) window.$ahmtao = function() {};
    var useragent = window.navigator.userAgent;

    IOS = useragent.match(/iPhone/i) || useragent.match(/iPad/i) || useragent.match(/iPod/i);
    ANDROID = useragent.match(/Android/i);

    MOBILE_DEVICE = ANDROID || IOS
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Tablet PC/i)
        || navigator.userAgent.match(/Windows Phone/i);

    var edgeRegex = /Edge\/([0-9]+)/g;
    var edgeMatch = edgeRegex.exec(useragent);
    $ahmtao.browser = { isEdge: Boolean(edgeMatch) };
    if ($ahmtao.browser.isEdge) BROWSER_VERSION = Number(edgeMatch[1]);

    if(!$ahmtao.browser.isEdge) {
        var chromeRegex = /Chrome\/([0-9]+).([0-9]+)/g;
        var chromeMatch = chromeRegex.exec(useragent);
        CHROME = Boolean(chromeMatch);
        CHROME_5_LOCAL = chromeMatch &&
            Number(chromeMatch[1]) >= 5 &&
            location.href.indexOf('file://') >= 0 &&
            !MOBILE_DEVICE; // 注释加密 
        if (CHROME) BROWSER_VERSION = Number(chromeMatch[1]);
    }

    var safariRegex = /Safari\/([0-9]+)/g;
    var safariMatch = safariRegex.exec(useragent);
    SAFARI = Boolean(safariMatch) && !CHROME && !$ahmtao.browser.isEdge; // 注释加密 
    if (SAFARI) BROWSER_VERSION = Number(safariMatch[1]);

    var webkitRegex = /WebKit\//g ;
    WEBKIT = Boolean(webkitRegex.exec(useragent));

    var firefoxRegex = /Firefox\/([0-9]+)/g;
    var firefoxMatch = firefoxRegex.exec(useragent);
    FIREFOX = useragent.toLowerCase().indexOf('firefox') > -1;
    if (FIREFOX) BROWSER_VERSION = Number(firefoxMatch[1]);

    QQ = useragent.toLowerCase().indexOf('qqbrowser') > -1;
    UC = useragent.toLowerCase().indexOf('ucbrowser') > -1 || useragent.toLowerCase().indexOf('ubrowser') > -1;

    SHARE_APP = useragent.toLowerCase().indexOf('shareapp') > -1;

    var macRegex = /Mac/g ;
    OS_MAC = Boolean(macRegex.exec(window.navigator.platform));
    
    if($.browser) {
        if($.browser.msie) IE_10_AND_BELOW = true;
        else IE_11_AND_ABOVE = useragent.toLowerCase().indexOf('trident') > -1;

        BROWSER_VERSION = $.browser.version;
    }

    IE_11_AND_ABOVE = useragent.toLowerCase().indexOf('trident') > -1;
    IE_10_AND_BELOW = !IE_11_AND_ABOVE && useragent.toLowerCase().indexOf('msie') > -1;
    IE = IE_10_AND_BELOW || IE_11_AND_ABOVE;

    var _supports = $ahmtao.mobileSupport = {};
    _supports.touchstart = typeof window.ontouchstart !== 'undefined';
    _supports.touchmove = typeof window.ontouchmove !== 'undefined';
    _supports.touchend = typeof window.ontouchend !== 'undefined';
    _supports.mobile = _supports.touchstart && _supports.touchend && _supports.touchmove;

    if (!MOBILE_DEVICE && _supports.mobile) {
        _supports.touchstart = false;
        _supports.touchmove = false;
        _supports.touchend = false;
        _supports.mobile = false;
    }

    var _eventNames = $ahmtao.eventNames = {};
    _eventNames.mouseDownName = _supports.touchstart ? 'touchstart' : 'mousedown';
    _eventNames.mouseUpName = _supports.touchend ? 'touchend' : 'mouseup';
    _eventNames.mouseMoveName = _supports.touchmove ? 'touchmove' : 'mousemove';

    // 注释加密 
    // 注释加密 
    // 注释加密 
    var _shouldSendVars;
    var _shouldSendVarsToServer = function(url) {
        if(typeof _shouldSendVars != 'undefined') {
            return _shouldSendVars;
        }

        if(SAFARI || (IE_10_AND_BELOW && BROWSER_VERSION < 10)) {
            var urlToCheck = typeof url != 'undefined' ? url : window.location.href;
            var serverRegex = /http:\/\/127\.0\.0\.1:[0-9]{5}/g;
            var serverMatch = serverRegex.exec(urlToCheck);
            var previewRegex = /[0-9]{2}\.[0-9]{2}\.[0-9]{2}/g;
            var previewMatch = previewRegex.exec(urlToCheck);
            if(Boolean(serverMatch) && Boolean(previewMatch)) {
                _shouldSendVars = true;
                return _shouldSendVars;
            }
        }

        _shouldSendVars = false;
        return _shouldSendVars;
    };
    $ahmtao.shouldSendVarsToServer = _shouldSendVarsToServer;
})();

(function () {
    var matched, browser;

    // 注释加密 
    // 注释加密 
    // 注释加密 
    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // 注释加密 
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    jQuery.browser = browser;

    jQuery.sub = function () {
        function jQuerySub(selector, context) {
            return new jQuerySub.fn.init(selector, context);
        }
        jQuery.extend(true, jQuerySub, this);
        jQuerySub.superclass = this;
        jQuerySub.fn = jQuerySub.prototype = this();
        jQuerySub.fn.constructor = jQuerySub;
        jQuerySub.sub = this.sub;
        jQuerySub.fn.init = function init(selector, context) {
            if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                context = jQuerySub(context);
            }

            return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
        };
        jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        return jQuerySub;
    };

})();

(function() {
    var _topMessageCenter;
    var _messageCenter = {};
    var _listeners = [];
    var _stateListeners = [];
    var _state = {};
    var _eventObject = null;

    var _queuedMessages = [];
    var _initialized = false;

    // 注释加密 
    var _childrenMessageCenters = [];

    // 注释加密 
    if(!window.$ahmtao) window.$ahmtao = function() {};
    $ahmtao.messageCenter = _messageCenter;

    // 注释加密 
    (function() {
        if(!CHROME_5_LOCAL) {
            var topahmtaoWindow = window;
            try {
                while(topahmtaoWindow.parent && topahmtaoWindow.parent !== topahmtaoWindow && topahmtaoWindow.parent.$ahmtao)
                    topahmtaoWindow = topahmtaoWindow.parent;
            } catch(e) {
            }
            _topMessageCenter = topahmtaoWindow.$ahmtao.messageCenter;
        }
    })();

    if (CHROME_5_LOCAL) {
        document.addEventListener("DOMContentLoaded", function () {
            $('body').append("<div id='ahmtaoEventReceiverDiv' style='display:none'></div>" +
                "<div id='ahmtaoEventSenderDiv' style='display:none'></div>");

            _eventObject = window.document.createEvent('Event');
            _eventObject.initEvent('ahmtaoMessageSenderEvent', true, true);

            $('#ahmtaoEventReceiverDiv')[0].addEventListener('ahmtaoMessageReceiverEvent',
                function () {
                    var request = JSON.parse($(this).text());
                    _handleRequest(request);
                });
        });
    } else {
        $(window.document).ready(function () {
            if (_topMessageCenter != _messageCenter) {
                _topMessageCenter.addChildMessageCenter(_messageCenter);
                console.log('adding from ' + window.location.toString());
            }
        });
    }

    var _handleRequest = function (request) {
        // 注释加密 
        for(var i = 0; i < _listeners.length; i++) _listeners[i](request.message, request.data);

        // 注释加密 
        if (request.message == 'initialize') {
            _initialized = true;
            // 注释加密 
            for (var i = 0; i < _queuedMessages.length; i++) {
                var qRequest = _queuedMessages[i];
                _messageCenter.postMessage(qRequest.message, qRequest.data);
            }
            _queuedMessages = [];
        }
                
        // 注释加密 
        if (request.message == 'setState') {
            _state[request.data.key] = request.data.value;
            for (var i = 0; i < _stateListeners.length; i++) {
                var keyListener = _stateListeners[i];
                // 注释加密 
                if (!keyListener.key || keyListener.key == request.data.key) {
                    keyListener.listener(request.data.key, request.data.value);
                }
            }
        }

    };

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    _messageCenter.addChildMessageCenter = function(messageCenter) {
        _childrenMessageCenters[_childrenMessageCenters.length] = messageCenter;
    };

    // 注释加密 
    // 注释加密 
    // 注释加密 
    // 注释加密 
    _messageCenter.dispatchMessage = function(message, data) {
        _handleRequest({
            message: message,
            data: data
        });
    };

    // 注释加密 
    // 注释加密 
    _messageCenter.dispatchMessageRecursively = function(message, data) {
        console.log("dispatched to " + window.location.toString());

        // 注释加密 
        _messageCenter.dispatchMessage(message, data);

        $('iframe').each(function(index, frame) {
            // 注释加密 
            try {
                if (frame.contentWindow.$ahmtao && frame.contentWindow.$ahmtao.messageCenter) {
                    frame.contentWindow.$ahmtao.messageCenter.dispatchMessageRecursively(message, data);
                }
            }catch(e) {}
        });
    };

    var _combineEventMessages = false;
    var _compositeEventMessageData = [];
    _messageCenter.startCombineEventMessages = function() {
        _combineEventMessages = true;
    }

    _messageCenter.endCombineEventMessages = function () {
        _messageCenter.sendCompositeEventMessage();
        _combineEventMessages = false;
    }

    _messageCenter.sendCompositeEventMessage = function () {
        _messageCenter.postMessage('axCompositeEventMessage', _compositeEventMessageData);
        _compositeEventMessageData = [];
    }

    _messageCenter.postMessage = function (message, data) {
        if(_combineEventMessages) {
            if(message == 'axEvent' || message == 'axCase' || message == 'axAction' || message == 'axEventComplete') {
                _compositeEventMessageData.push({ 'message': message, 'data': data });
                if(_compositeEventMessageData.length >= 10) _messageCenter.sendCompositeEventMessage();
                return;
            }
        }

        if(!CHROME_5_LOCAL) {
            _topMessageCenter.dispatchMessageRecursively(message, data);
        } else {
            var request = {
                message: message,
                data: data
            };

            if(_initialized) {
                var senderDiv = window.document.getElementById('ahmtaoEventSenderDiv');
                var messageText = JSON.stringify(request);
                // 注释加密 
                senderDiv.innerText = messageText;
                senderDiv.dispatchEvent(_eventObject);
                // 注释加密 
            } else {
                _queuedMessages[_queuedMessages.length] = request;
            }
        }
    };

    _messageCenter.setState = function(key, value) {
        var data = {
            key: key,
            value: value
        };
        _messageCenter.postMessage('setState', data);
    };

    _messageCenter.getState = function(key) {
        return _state[key];
    };

    _messageCenter.addMessageListener = function(listener) {
        _listeners[_listeners.length] = listener;
    };

    _messageCenter.addStateListener = function(key, listener) {
        _stateListeners[_stateListeners.length] = {
            key: key,
            listener: listener
        };
    };

})();
