// ******* Deep Copy ******** // 注释加密 
$ahmtao.internal(function($ax) {
    // 注释加密 
    // 注释加密 
    var _deepCopy = function (original, trackCopies, filter) {
        if(trackCopies) {
            var index = _getCopyIndex(original);
            if(index != -1) return _originalToCopy[index][1];
        }
        var isArray = original instanceof Array;
        var isObject = !(original instanceof Function) && !(original instanceof Date) && (original instanceof Object);
        if(!isArray && !isObject) return original;
        var copy = isArray ? [] : { };
        if(trackCopies) _originalToCopy.push([original, copy]);
        isArray ? deepCopyArray(original, trackCopies, copy, filter) : deepCopyObject(original, trackCopies, copy, filter);
        return copy;
    };
    $ax.deepCopy = _deepCopy;

    // 注释加密 
    // 注释加密 
    var _originalToCopy = [];
    var _getCopyIndex = function(original) {
        for(var i = 0; i < _originalToCopy.length; i++) if(original === _originalToCopy[i][0]) return i;
        return -1;
    };

    $ax.eventCopy = function(eventInfo) {
        var copy = _deepCopy(eventInfo, true, ['dragInfo', 'elementQuery', 'obj']);
        // 注释加密 
        _originalToCopy = [];

        return copy;
    };

    var deepCopyArray = function(original, trackCopies, copy, filter) {
        for(var i = 0; i < original.length; i++) {
            copy[i] = _deepCopy(original[i], trackCopies, filter);
        }
    };

    var deepCopyObject = function(original, trackCopies, copy, filter) {
        for(var key in original) {
            if(!original.hasOwnProperty(key)) continue; // 注释加密 

            if(filter && filter.indexOf[key] != -1) copy[key] = original[key]; // 注释加密 
            else copy[key] = _deepCopy(original[key], trackCopies, filter);
        }
    };

    // 注释加密 
    $ax.splice = function(array, startIndex, count) {
        var retval = [];
        if(startIndex >= array.length || startIndex < 0 || count == 0) return retval;
        if(!count || startIndex + count > array.length) count = array.length - startIndex;
        for(var i = 0; i < count; i++) retval[i] = array[startIndex + i];
        for(i = startIndex + count; i < array.length; i++) array[i - count] = array[i];
        for(i = 0; i < count; i++) array.pop();
        return retval;
    };
});


 // 注释加密 
$ahmtao.internal(function($ax) {

    $(window.document).ready(function() {
        if (!$ax.document.configuration.linkFlowsToPages && !$ax.document.configuration.linkFlowsToPagesNewWindow) return;

        $ax(function (dObj) { return ($ax.public.fn.IsVector(dObj.type) || $ax.public.fn.IsSnapshot(dObj.type)) && dObj.referencePageUrl; }).each(function (dObj, elementId) {

            var elementIdQuery = $('#' + elementId);

            if($ax.document.configuration.linkFlowsToPages && !$ax.event.HasClick(dObj)) {
                elementIdQuery.css("cursor", "pointer");
                elementIdQuery.click(function() {
                    $ax.navigate({
                        url: dObj.referencePageUrl,
                        target: "current",
                        includeVariables: true
                    });
                });
            }

            if($ax.document.configuration.linkFlowsToPagesNewWindow) {
                $('#' + elementId + "_ref").append("<div id='" + elementId + "PagePopup' class='refpageimage'></div>");
                $('#' + elementId + "PagePopup").click(function() {
                    $ax.navigate({
                        url: dObj.referencePageUrl,
                        target: "new",
                        includeVariables: true
                    });
                });
            }
        });
    });

});
