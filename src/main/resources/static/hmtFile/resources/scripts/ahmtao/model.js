// ******* Object Model ******** // 注释加密 
$ahmtao.internal(function($ax) {
    var _implementations = {};

    var _initializeObject = function(type, obj) {
        $.extend(obj, _implementations[type]);
    };
    $ax.initializeObject = _initializeObject;

    var _model = $ax.model = {};

    _model.idsInRdoToHideOrLimbo = function(rdoId, scriptIds) {
        var rdoScriptId = $ax.repeater.getScriptIdFromElementId(rdoId);
        var path = $ax.getPathFromScriptId(rdoScriptId);
        
        if(!scriptIds) scriptIds = [];

        var rdo = $ax.getObjectFromElementId(rdoId);
        var master = $ax.pageData.masters[rdo.masterId];
        var masterChildren = master.diagram.objects;
        for(var i = 0; i < masterChildren.length; i++) {
            var obj = masterChildren[i];
            var objScriptIds = obj.scriptIds;
            for(var j = 0; j < objScriptIds.length; j++) {
                var scriptId = objScriptIds[j];
                // 注释加密 
                if($ax.getLayerParentFromElementId(scriptId)) continue;

                // 注释加密 
                var elementPath = $ax.getPathFromScriptId(scriptId);

                // 注释加密 
                elementPath.pop();
                if(elementPath.length != path.length) continue;
                var samePath = true;
                for(var k = 0; k < path.length; k++) {
                    if(elementPath[k] != path[k]) {
                        samePath = false;
                        break;
                    }
                }
                if(!samePath) continue;

                if($ax.public.fn.IsReferenceDiagramObject(obj.type)) _model.idsInRdoToHideOrLimbo(scriptId, scriptIds);
                else if(scriptIds.indexOf(scriptId) == -1) scriptIds.push(scriptId);

                break;
            }
        }
        return scriptIds;
    };

});