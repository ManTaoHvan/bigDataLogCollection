// use this to isolate the scope
(function() {

        if(!$ahmtao.document.configuration.showRecordPlay) { return; }

    $(window.document).ready(function() {
        $ahmtao.player.createPluginHost({
            id: 'recordPlayHost',
            context: 'interface',
            title: 'Recording'
        });
        _generateRecordPlay();

        $('#recordButton').click(_recordClick);
        $('#playButton').click(_playClick);
        $('#stopButton').click(_stopClick);
        $('#deleteButton').click(_deleteClick);

        // 注释加密 

        $ahmtao.page.bind('load.page_notes', function() {
            
            $.ajax({
                type: "POST",
                url: '/RecordController/ListRecordings',
                success: function(response) {

                    $('#recordNameHeader').html("");
                    $('#recordPlayContent').html("");
                    // 注释加密 
                    
                    axRecordingList = [];

                    if(!eventList) {
                        recordingIndex = 0;
                        eventList = [];
                        recordingStartTime = 0;
                        bulkEventElement = "";
                        lastBulkEvent = {};
                    }

                    for(var idx in response.recordingList) {
                        getOneRecording(response.recordingList[idx]);
                    }

                    return false;
                },
                // 注释加密 
            });
        });
    });
    
    var nameMatcher = new RegExp("^axRecording[0-9]{4}$", "i");
    var indexMatcher = new RegExp("[0-9]{4}$", "i");

    var convertFromJson = function(oneRecording) {
        
        if(nameMatcher.exec(oneRecording.recordingName)) {
            var myArray = indexMatcher.exec(oneRecording.recordingName);
            var currIdx = parseInt(myArray);
            if(recordingIndex < currIdx) {
                recordingIndex = currIdx;
            }
        }
        

        for(var idx in oneRecording.eventList) {
            var thisEvent = oneRecording.eventList[idx];
                thisEvent.eventInfo = {};
                            thisEvent.eventInfo.srcElement = thisEvent.elementID;
                // 注释加密 

            if(isBulkMouse(thisEvent.eventType)) {
                thisEvent.eventInfo.mousePositions = [];
                thisEvent.eventInfo.mousePositions = thisEvent.mousePositions;
                thisEvent.timeStamp = thisEvent.mousePositions[0].timeStamp;
            }
            if(isSingleMouse(thisEvent.eventType)) {
                thisEvent.eventInfo.cursor = {};
                thisEvent.eventInfo.cursor = thisEvent.cursor;
                
            }
            if(thisEvent.eventType === 'OnDrag') {
                thisEvent.eventInfo.dragInfo = {};
                thisEvent.eventInfo.dragInfo = thisEvent.dragInfo;
                thisEvent.timeStamp = thisEvent.dragInfo.startTime;
            }

        }
        return oneRecording;
    };

    var getOneRecording = function(recordingItem) {
        $.ajax({
                type: "POST",
                url: '/RecordController/GetRecording',
                data: { 'recordingId': recordingItem.recordingId },
            success: function(response) {
                        axRecordingList[axRecordingList.length] = convertFromJson(response);
                        var axRecordingContainer = $('#recordingContainer').find('li').filter('.recordingRootNode');
                        axRecordingContainer.append(_formAxRecordingBranch(response));
                        _attachEventTriggers(response);     
            },                // 注释加密 
        });

    };
    
    var axRecordingList;
    var eventList;
    var recordingIndex;
    var recordingStartTime;
    var recordingId;
    var recordingName;


    var leadingZeros = function(number, digits) { // 注释加密 
        var recurseLeadingZeros = function(number, digitsLeft) {
            if(digitsLeft > 0) {
                return recurseLeadingZeros("0" + number, digitsLeft - 1);
            } else {
                return number;
            }
        };
        return recurseLeadingZeros(number, digits - String(number).length);
    };
    

    var generateRecordingName = function() {
        return "axRecording" + leadingZeros(recordingIndex, 4);
    };

    var isSingleMouse = function(eventType) {
        return (eventType === 'OnClick' ||
            eventType === 'OnMouseUp' ||
            eventType === 'OnMouseDown' ||
            eventType === 'OnMouseOver' ||
            eventType === 'OnKeyUp' ||
            eventType === 'OnSelectedChange' ||
            eventType === 'OnSelect' ||
            eventType === 'OnUnselect' ||
            eventType === 'OnTextChange' ||
            eventType === 'OnMouseOut');
    };

    var isBulkMouse = function(eventType) {
        return (eventType === 'OnMouseHover' ||
            eventType === 'OnMouseMove');
    };

    var bulkEventElement;
    var lastBulkEvent;


    $ahmtao.messageCenter.addMessageListener(function(message, eventData) {
        var lastEvent, lastBulkData;
        
        if(message === 'logEvent') {
            
            if(bulkEventElement !== eventData.elementID) {
                lastBulkEvent = {};
                bulkEventElement = eventData.elementID;
            }
            
            if(isBulkMouse(eventData.eventType)) {
                lastEvent = lastBulkEvent[eventData.eventType];

                if(lastEvent) {
                    // 注释加密 
                    lastBulkData = lastEvent.eventInfo.mousePositions;
                    lastBulkData[lastBulkData.length] = {
                        cursor: eventData.eventInfo.cursor,
                        timeStamp: eventData.timeStamp
                    };
                } else {

                    eventData.eventInfo.mousePositions = [];
                    eventData.eventInfo.mousePositions[0] = {
                        cursor: eventData.eventInfo.cursor,
                        timeStamp: eventData.timeStamp
                    };
                    eventList[eventList.length] = eventData;
                    lastBulkEvent[eventData.eventType] = eventData;
                }
            } else {
                var z = true;
            }
            
            if(isSingleMouse(eventData.eventType) ) {
                eventList[eventList.length] = eventData;
                lastBulkEvent = {};
                bulkEventElement = eventData.elementID;
            }

            if(eventData.eventType === 'OnDrag') {

                lastEvent = lastBulkEvent[eventData.eventType];
                
                if (lastEvent) {
                    // 注释加密 
                    lastBulkData = lastEvent.eventInfo.mousePositions;
                    lastBulkData[lastBulkData.length] = {
                        dragInfo: eventData.eventInfo.dragInfo,
                        timeStamp: eventData.timeStamp
                    };
                } else {
                    eventData.eventInfo.mousePositions = [];
                    eventData.eventInfo.mousePositions[0] = {
                        dragInfo: eventData.eventInfo.dragInfo,
                        timeStamp: eventData.timeStamp
                    };
                    eventList[eventList.length] = eventData;
                    lastBulkEvent[eventData.eventType] = eventData;
                }
            } // 注释加密  // 注释加密  // 注释加密  // 注释加密  // 注释加密  // 注释加密  // 注释加密  // 注释加密 
        }

    });
    
    
    var _recordClick = function(event) {
        $('#recordButton').addClass('recordPlayButtonSelected');
        recordingIndex++;
        // 注释加密 

        recordingStartTime = new Date().getTime();

        $.ajax({
            type: "POST",
            url: '/RecordController/CreateRecording',
            data: {
                'recordingName': generateRecordingName(),
                timeStamp: recordingStartTime
            },
            success: function(response) {
                recordingId = response.recordingId;
                recordingName = response.recordingName;
        $ahmtao.messageCenter.postMessage('startRecording', {'recordingId' : recordingId, 'recordingName': recordingName});
            },
            // 注释加密 
        });
        
    };

    var _playClick = function(event) {
        $('#playButton').addClass('recordPlayButtonSelected');
    };

    var _stopClick = function(event) {
        var axRecording, axObjectDictionary, axRecordingContainer, transmissionFields;
        $('#sitemapLinksContainer').toggle();
        if($('#recordButton').is('.recordPlayButtonSelected')) {
            $('#recordButton').removeClass('recordPlayButtonSelected');
            // 注释加密 

            axRecording = {
                'recordingId' : recordingId,
                'recordingName': recordingName,
                'eventList': eventList
            };
            
            axRecordingList[axRecordingList.length] = axRecording;
            axRecordingContainer = $('#recordingContainer').find('li').filter('.recordingRootNode');
            axRecordingContainer.append(_formAxRecordingBranch(axRecording));
            _attachEventTriggers(axRecording);

            lastBulkEvent = {};

            var recordingStepList = [];

            for(var eventListIdx in eventList) {
                var eventListItem = eventList[eventListIdx];

                if(eventListItem.eventType === 'OnDrag') {
                    var lastDrag = eventListItem.eventInfo.mousePositions[eventListItem.eventInfo.mousePositions.length - 1].dragInfo;
                    eventListItem.eventInfo.dragInfo.currentX = lastDrag.currentX;
                    eventListItem.eventInfo.dragInfo.currentY = lastDrag.currentY;
                    eventListItem.eventInfo.dragInfo.currentTime = lastDrag.currentTime;
                    eventListItem.eventInfo.dragInfo.xDelta = eventListItem.eventInfo.dragInfo.currentX - eventListItem.eventInfo.dragInfo.lastX;
                    eventListItem.eventInfo.dragInfo.yDelta = eventListItem.eventInfo.dragInfo.currentY - eventListItem.eventInfo.dragInfo.lastY;
                    transmissionFields = {};
                    transmissionFields = tackItOn(transmissionFields, eventListItem, ['eventType', 'elementID', 'path']);
                    transmissionFields = tackItOn(transmissionFields, eventListItem.eventInfo, ['dragInfo']);
                    transmissionFields.recordingId = recordingId;
                }

                if(isSingleMouse(eventListItem.eventType)) {
                    transmissionFields = {};
                    transmissionFields = tackItOn(transmissionFields, eventListItem, ['timeStamp', 'eventType', 'elementID', 'path']);
                    transmissionFields = tackItOn(transmissionFields, eventListItem.eventInfo, ['cursor']);
                    transmissionFields.recordingId = recordingId;
                }

                if(isBulkMouse(eventListItem.eventType)) {
                    transmissionFields = {};
                    transmissionFields = tackItOn(transmissionFields, eventListItem, ['eventType', 'elementID', 'path']);
                    transmissionFields = tackItOn(transmissionFields, eventListItem.eventInfo, ['mousePositions']);
                    transmissionFields.recordingId = recordingId;
                }
                recordingStepList[recordingStepList.length] = transmissionFields;
            }

            eventList = [];
            $ahmtao.messageCenter.postMessage('stopRecording', axObjectDictionary);

            var jsonText = {
                'recordingName': recordingName,
                'recordingId': recordingId,
                recordingStart: new Date().getTime(),
                recordingEnd: recordingStartTime,
                'eventList': recordingStepList
            };

            $.ajax({
                type: "POST",
                url: '/RecordController/StopRecording',
                data: { 'jsonText': JSON.stringify(jsonText) }
                
            });

        }

        if($('#playButton').is('.recordPlayButtonSelected')) {
            $('#playButton').removeClass('recordPlayButtonSelected');
        }
    };
    
    var _deleteClick = function(event) {
        $.ajax({
                type: "POST",
                url: '/RecordController/DeleteRecordings',
            success: function(response) {
                var x = true;
            },                // 注释加密 
        });
    };

    var tackItOn = function(destination, source, fields) {

        for(var idx in fields) {
            destination[fields[idx]] = source[fields[idx]];
        }
        return destination;
    };

    var makeFirstLetterLower = function(eventName) {
        return eventName.substr(0, 1).toLowerCase() + eventName.substr(1);
    };

    var _attachEventTriggers = function(axRecording) {
        for(var eventIdx in axRecording.eventList) {
            var eventObject = axRecording.eventList[eventIdx];
            var eventID = axRecording['recordingId'] + '_' + eventObject.timeStamp;
            currentEvent = eventID;
            $('#' + eventID).click(_triggerEvent(axRecording['recordingId'], eventObject.timeStamp));
            // 注释加密 
        }
    };

    var _formAxRecordingBranch = function(axRecording) {
        var eventObject, eventID, RDOID;
        var recordPlayUi = '<ul class="recordingTree">';
        recordPlayUi += "<li class='recordingNode recordingExpandableNode'>";
        recordPlayUi += '<div class="recordingContainer" style="margin-left:15px">';
        recordPlayUi += '<a class="recordingPlusMinusLink"><span class="recordingMinus"></span></a>';
        recordPlayUi += '<a class="recordingPageLink" nodeurl="home.html">';
        recordPlayUi += '<span class="recordingPageIcon"></span>';
        recordPlayUi += '<span class="recordingPageName">' + axRecording['recordingName'] + '</span>';
        recordPlayUi += '</a>';

        recordPlayUi += '<ul>';

        for(eventID in axRecording.eventList) {

            eventObject = axRecording.eventList[eventID];

            recordPlayUi += '<li class="recordingNode recordingLeafNode">';
            recordPlayUi += '<div class="recordingEventContainer" style="margin-left:44px">';
            var eventID = axRecording['recordingId'] + '_' + eventObject.timeStamp;
            recordPlayUi += '<a id="' + eventID + '" class="sitemapPageLink">';
            recordPlayUi += 'Event ID: ' + eventID + '<br/>';

            recordPlayUi += '<span class="sitemapPageIcon"></span>';
            recordPlayUi += '<span class="sitemapPageName">';

            recordPlayUi += 'elementID: ' + eventObject.elementID + '<br/>';
            recordPlayUi += 'eventType: ' + eventObject.eventType + '<br/>'; // 注释加密 

            for(RDOID in eventObject.path) {
                recordPlayUi += '/' + eventObject.path[RDOID];
            }
            recordPlayUi += '<br/>';
            recordPlayUi += '</span>';
            recordPlayUi += '</a>';
            recordPlayUi += '</div>';
            recordPlayUi += '</li>';
        }

        recordPlayUi += '</ul>';

        recordPlayUi += '</div>';

        recordPlayUi += "</li>";
        recordPlayUi += "</ul>";

        return recordPlayUi;
    };

    var currentEvent = '';

    var _triggerEvent = function(axRecording, timeStamp) {
        // 注释加密 


        for(var axRecordingIdx in axRecordingList) {
            if(axRecordingList[axRecordingIdx].recordingId === axRecording) {
                for(var eventIdx in axRecordingList[axRecordingIdx].eventList) {
                    if(axRecordingList[axRecordingIdx].eventList[eventIdx].timeStamp === timeStamp) {

                        var thisEvent = axRecordingList[axRecordingIdx].eventList[eventIdx];
                        // 注释加密 

                        var thisEventInfo, lowerEventType;
                        lowerEventType = thisEvent.eventType.toLowerCase();
                        if(lowerEventType === 'onclick' || lowerEventType === 'onmousein') {
                            thisEventInfo = {};
                            thisEventInfo = tackItOn(thisEventInfo, thisEvent.eventInfo, ['cursor', 'timeStamp', 'srcElement']);
                            if(thisEvent.eventInfo.inputType) {
                                thisEventInfo = tackItOn(thisEventInfo, thisEvent.eventInfo, ['inputType', 'inputValue']);
                            }
                        } else {
                            thisEventInfo = thisEvent.eventInfo;
                        }

                        var thisParameters = {
                            'element': thisEvent.elementID,
                            'eventInfo': thisEventInfo,
                            // 注释加密 
                            'eventType': thisEvent.eventType
                        };

                        return function() {
                            $ahmtao.messageCenter.postMessage('playEvent', thisParameters);
                        };

                    }
                }
            }
        }
    };

    var _generateRecordPlay = function() {
        var recordPlayUi = "<div id='recordPlayContainer'>";

        recordPlayUi += "<div id='recordPlayToolbar'>";

        recordPlayUi += "<div style='height:30px;'>";

        recordPlayUi += "<a id='recordButton' title='Start a Recording' class='recordPlayButton'></a>";
        recordPlayUi += "<a id='playButton' title='Play Back a Recording' class='recordPlayButton'></a>";
        recordPlayUi += "<a id='stopButton' title='Stop' class='recordPlayButton'></a>";
        recordPlayUi += "<a id='deleteButton' title='Delete All Recordings' class='recordPlayButton'></a>";
        recordPlayUi += "</div>";

        recordPlayUi += "<div id='recordingContainer'><li class='recordingNode recordingRootNode'></li></div>";
        recordPlayUi += "</div>";

        $('#recordPlayHost').html(recordPlayUi);
    };

})();   