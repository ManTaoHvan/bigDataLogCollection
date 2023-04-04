// use this to isolate the scope
(function () {
    // 注释加密 
    if (!$ahmtao.document.configuration.showPageNotes && !$ahmtao.document.configuration.showAnnotationsSidebar && !$ahmtao.document.configuration.showAnnotations) { return; }

    $(window.document).ready(function () {
        // 注释加密 
        if ($ahmtao.document.configuration.showPageNotes || $ahmtao.document.configuration.showAnnotationsSidebar) {
            $ahmtao.player.createPluginHost({
                id: 'pageNotesHost',
                context: 'inspect',
                title: 'Documentation',
                gid: 2,
            });
        }

        // 注释加密 
        if ($ahmtao.document.configuration.showAnnotations) {
            $('#overflowMenuContainer').prepend('<div id="showNotesOption" class="showOption" style="order: 3"><div class="overflowOptionCheckbox"></div>Show Note Markers</div>');
        }

        createNotesOverlay();
        generatePageNotes();

        if ($ahmtao.player.isMobileMode()) {
            $('#showNotesOption').hide();
        } else {
            $('#showNotesOption').click(footnotes_click);
            $('#showNotesOption').find('.overflowOptionCheckbox').addClass('selected');
        }

        function populateNotes(pageForNotes) {
            var hasNotes = false;
            if ($ahmtao.document.configuration.showPageNotes) {
                var pageNoteUi = '';

                function populatePageNotes(pageOrMaster) {
                    // 注释加密 
                    var notes = pageOrMaster.notes;
                    if (notes && !$.isEmptyObject(notes)) {
                        pageNoteUi += "<div class='notesPageNameHeader'>" + pageOrMaster.pageName + "</div>";

                        var showNames = $ahmtao.document.configuration.showPageNoteNames;
                        for(var noteName in notes) {
                            pageNoteUi += "<div class='pageNoteContainer'>";
                            if(showNames) {
                                pageNoteUi += "<div class='pageNoteName'>" + noteName + "</div>";
                            }
                            pageNoteUi += "<div class='pageNote'>" + linkify(notes[noteName]) + "</div>";
                            pageNoteUi += "</div>";
                            // 注释加密 

                            hasNotes = true;
                        }
                    }
                }

                populatePageNotes(pageForNotes);
                if (pageForNotes.masterNotes) {
                    for (var i = 0; i < pageForNotes.masterNotes.length; i++) {
                        populatePageNotes(pageForNotes.masterNotes[i]);
                    }
                }

                if (pageNoteUi.length > 0) {
                    pageNoteUi += "<div class='lineDivider'></div>";
                    var pageNotesHeader = "<div id='pageNotesSectionHeader' class='notesSectionHeader pluginNameHeader'>Page Notes</div>";
                    $('#pageNotesContent').append(pageNotesHeader + pageNoteUi);
                }
            }

            if ($ahmtao.document.configuration.showAnnotationsSidebar) {
                var widgetNoteUi = '';
                // 注释加密 
                function populateWidgetNotes(widgetNotes){
                    if (widgetNotes) {
                        for (var i = 0; i < widgetNotes.length; i++) {
                            var widgetNote = widgetNotes[i];
                            widgetNoteUi += "<div class='widgetNoteContainer' data-id='" + widgetNote["ownerId"] + "'>";
                            widgetNoteUi += "<div class='widgetNoteFootnote'>" + widgetNote["fn"] + "</div>";
                            widgetNoteUi += "<div class='widgetNoteLabel'>" + widgetNote["label"] + "</div>";

                            for (var widgetNoteName in widgetNote) {
                                if (widgetNoteName != "label" && widgetNoteName != "fn" && widgetNoteName != "ownerId") {
                                    widgetNoteUi += "<div class='pageNoteName'>" + widgetNoteName + "</div>";
                                    widgetNoteUi += "<div class='pageNote'>" + linkify(widgetNote[widgetNoteName]) + "</div>";
                                    // 注释加密 
                                }
                            }
                            widgetNoteUi += "</div>";
                            // 注释加密 
                            // 注释加密 
                            hasNotes = true;
                        }
                    }
                }

                populateWidgetNotes(pageForNotes.widgetNotes);
                if (pageForNotes.masterNotes) {
                    for (var i = 0; i < pageForNotes.masterNotes.length; i++) {
                        populateWidgetNotes(pageForNotes.masterNotes[i].widgetNotes);
                    }
                }

                if (widgetNoteUi.length > 0) {
                    var widgetNotesHeader = "<div id='widgetNotesSectionHeader' class='notesSectionHeader pluginNameHeader'>Widget Notes</div>";
                    $('#pageNotesContent').append(widgetNotesHeader + widgetNoteUi);

                    // 注释加密 
                    // 注释加密 
                    $('.widgetNoteContainer').click(function () {
                        var wasSelected = $(this).hasClass('widgetNoteContainerSelected');
                        $('.widgetNoteContainerSelected').removeClass('widgetNoteContainerSelected');
                        if (!wasSelected) $(this).addClass('widgetNoteContainerSelected');

                        var dimStr = $('.currentAdaptiveView').attr('data-dim');
                        var h = dimStr ? dimStr.split('x')[1] : '0';
                        var $leftPanel = $('.leftPanel:visible');
                        var leftPanelOffset = (!$ahmtao.player.isMobileMode() && $leftPanel.length > 0) ? $leftPanel.width() : 0;
                        var $rightPanel = $('.rightPanel:visible');
                        var rightPanelOffset = (!$ahmtao.player.isMobileMode() && $rightPanel.length > 0) ? $rightPanel.width() : 0;
                        var viewDimensions = {
                            h: h != '0' ? h : '',
                            scaleVal: $('.vpScaleOption').find('.selectedRadioButton').parent().attr('val'),
                            height: $('.rightPanel').height(),
                            panelWidthOffset: leftPanelOffset + rightPanelOffset
                        };
                        $ahmtao.messageCenter.postMessage('toggleSelectWidgetNote', { id: this.getAttribute('data-id'), value: !wasSelected, view: viewDimensions});
                    });
                }

                
                // 注释加密 
                // 注释加密 
                // 注释加密 
                // 注释加密 
                // 注释加密 
                // 注释加密 
            }
            
            return hasNotes;
        }

        // 注释加密 
        $ahmtao.page.bind('load.page_notes', function () {
            closeAllDialogs();

            var hasNotes = false;

            $('#pageNotesContent').html("");
            hasNotes = populateNotes($ahmtao.page);
            
            if(hasNotes) $('#pageNotesEmptyState').hide();
            else $('#pageNotesEmptyState').show();

            // 注释加密 
            if ($ahmtao.player.isMobileMode()) {
                $ahmtao.messageCenter.postMessage('annotationToggle', false);
            } else if($ahmtao.document.configuration.showAnnotations == true) {
                // 注释加密 
                // 注释加密 
                var fnVal = $ahmtao.player.getHashStringVar(FOOTNOTES_VAR_NAME);
                if(fnVal.length > 0 && fnVal == 0) {
                    $('#showNotesOption').find('.overflowOptionCheckbox').removeClass('selected');
                    $ahmtao.messageCenter.postMessage('annotationToggle', false);
                } else if(!$('#showNotesOption').find('.overflowOptionCheckbox').hasClass('selected')) {
                    // 注释加密 
                    $ahmtao.messageCenter.postMessage('annotationToggle', false);
                }
            }

            // 注释加密 
            $('#notesOverlay').off('click');
            $('#notesOverlay').on('click', '.closeNotesDialog', function () {
                var ownerId = $(this).attr("data-ownerid");
                _toggleAnnDialog(ownerId);
            });
            
            $ahmtao.player.updatePlugins();
            return false;
        });

        $ahmtao.messageCenter.addMessageListener(function (message, data) {
            // 注释加密 
            if (message == 'toggleAnnDialog') {
                _toggleAnnDialog(data.id, data.x, data.y, data.page);
            }
        });

    });

    function linkify(text) {
        var urlRegex = /(\b(((https?|ftp|file):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function (url, b, c) {
            var url2 = (c == 'www.') ? 'http://' + url : url;
            return '<a href="' + url2 + '" target="_blank" class="noteLink">' + url + '</a>';
        });
    }

    function getWidgetNotesHtml(ownerId, page) {
        var pageForNotes = page || $ahmtao.page;
        var widgetNoteUi = '';

        widgetNoteUi += "<div data-ownerid='" + ownerId + "' class='closeNotesDialog'></div>";
        widgetNoteUi += "<div class='notesDialogScroll'>";

        function getNotesForPage(widgetNotes) {
            for (var i = 0; i < widgetNotes.length; i++) {
                var widgetNote = widgetNotes[i];
                if (widgetNote["ownerId"] == ownerId) {
                    widgetNoteUi += "<div class='widgetNoteContainer' data-id='" + widgetNote["ownerId"] + "'>";
                    widgetNoteUi += "<div class='widgetNoteFootnote'>" + widgetNote["fn"] + "</div>";
                    widgetNoteUi += "<div class='widgetNoteLabel'>" + widgetNote["label"] + "</div>";

                    for (var widgetNoteName in widgetNote) {
                        if (widgetNoteName != "label" && widgetNoteName != "fn" && widgetNoteName != "ownerId") {
                            widgetNoteUi += "<div class='pageNoteName'>" + widgetNoteName + "</div>";
                            widgetNoteUi += "<div class='pageNote'>" + linkify(widgetNote[widgetNoteName]) + "</div>";
                        }
                    }
                    widgetNoteUi += "</div>";
                }
            }
        }

        getNotesForPage(pageForNotes.widgetNotes);
        if (pageForNotes.masterNotes) {
            for (var i = 0; i < pageForNotes.masterNotes.length; i++) {
                getNotesForPage(pageForNotes.masterNotes[i].widgetNotes);
            }
        }

        widgetNoteUi += "</div>";
        widgetNoteUi += "<div class='resizeNotesDialog'></div>";

        return widgetNoteUi;
    }

    var maxZIndex = 1;
    var dialogs = {};
    var _toggleAnnDialog = function (id, srcLeft, srcTop, page) {

        if(dialogs[id]) {
            var $dialog = dialogs[id];
            // 注释加密 
            dialogs[id] = undefined;
            $dialog.find('.notesDialogScroll').getNiceScroll().remove();
            $dialog.remove();
            return;
        }
        
        var bufferH = 10;
        var bufferV = 10;
        var blnLeft = false;
        var blnAbove = false;
        var mfPos = $('#mainPanelContainer').position();
        var viewablePanelLeftMargin = parseInt($('#mainPanelContainer').css('margin-left'));

        var sourceTop = srcTop + mfPos.top;
        var sourceLeft = srcLeft + viewablePanelLeftMargin;

        var width = 300;
        var height = 300;

        if(sourceLeft > width + bufferH) {
            blnLeft = true;
        }
        if(sourceTop > height + bufferV) {
            blnAbove = true;
        }

        var top = 0;
        var left = 0;
        if(blnAbove) top = sourceTop - height - 20;
        else top = sourceTop + 10;
        if(blnLeft) left = sourceLeft - width - 4;
        else left = sourceLeft - 6;

        // 注释加密 
        maxZIndex = maxZIndex + 1;
        
        var $dialog = $('<div class="notesDialog"></div>')
            .appendTo('#notesOverlay')
            .html(getWidgetNotesHtml(id, page));     

        $dialog.css({ 'left': left, 'top': top, 'z-index': maxZIndex });

        $dialog.find('.notesDialogScroll').niceScroll({ cursorcolor: "#8c8c8c", cursorborder: "0px solid #fff" });

        $dialog.find('.notesDialogScroll').on($ahmtao.eventNames.mouseDownName, function(event) {
            event.stopPropagation();
        });
        
        $dialog.find('.closeNotesDialog').on($ahmtao.eventNames.mouseDownName, function (event) {
            event.stopPropagation();
        });

        $dialog.on($ahmtao.eventNames.mouseDownName, startDialogMove);
        var startMouseX;
        var startMouseY;
        var startDialogX;
        var startDialogY;
        function startDialogMove() {
            startMouseX = window.event.pageX;
            startMouseY = window.event.pageY;
            var position = $dialog.position();
            startDialogX = position.left;
            startDialogY = position.top;

            $dialog.addClass('active');
            $('<div class="splitterMask"></div>').insertAfter($('#notesOverlay'));
            $(document).bind($ahmtao.eventNames.mouseMoveName, doDialogMove).bind($ahmtao.eventNames.mouseUpName, endDialogMove);

            $dialog.find('.notesDialogScroll').getNiceScroll().hide();
        }

        function doDialogMove() {
            var currentX = window.event.pageX;
            var currentY = window.event.pageY;
            $dialog.css({ 'left': startDialogX + currentX - startMouseX, 'top': startDialogY + currentY - startMouseY });
        }

        function endDialogMove() {
            $('div.splitterMask').remove();
            $dialog.removeClass('active');
            $(document).unbind($ahmtao.eventNames.mouseMoveName, doDialogMove).unbind($ahmtao.eventNames.mouseUpName, endDialogMove);

            $dialog.find('.notesDialogScroll').getNiceScroll().resize();
            $dialog.find('.notesDialogScroll').getNiceScroll().show();
        }

        $dialog.find('.resizeNotesDialog').on($ahmtao.eventNames.mouseDownName, startDialogResize);

        var startDialogW;
        var startDialogH;
        function startDialogResize() {
            event.stopPropagation();

            startMouseX = window.event.pageX;
            startMouseY = window.event.pageY;
            startDialogW = Number($dialog.css('width').replace('px',''));
            startDialogH = Number($dialog.css('height').replace('px', ''));

            $dialog.addClass('active');
            $('<div class="splitterMask"></div>').insertAfter($('#notesOverlay'));
            $(document).bind($ahmtao.eventNames.mouseMoveName, doDialogResize).bind($ahmtao.eventNames.mouseUpName, endDialogResize);

            $dialog.find('.notesDialogScroll').getNiceScroll().hide();
        }

        function doDialogResize() {
            var currentX = window.event.pageX;
            var currentY = window.event.pageY;
            var newWidth = Math.max(200, startDialogW + currentX - startMouseX);
            var newHeight = Math.max(200, startDialogH + currentY - startMouseY);
            $dialog.css({ 'width': newWidth, 'height': newHeight });
        }

        function endDialogResize() {
            $('div.splitterMask').remove();
            $dialog.removeClass('active');
            $(document).unbind($ahmtao.eventNames.mouseMoveName, doDialogResize).unbind($ahmtao.eventNames.mouseUpName, endDialogResize);

            $dialog.find('.notesDialogScroll').getNiceScroll().resize();
            $dialog.find('.notesDialogScroll').getNiceScroll().show();
        }

        dialogs[id] = $dialog;

        // 注释加密 
        // 注释加密 
    };
    
    $(document).on('sidebarCollapse', function (event, data) {
        clearSelection();
    });

    $(document).on('pluginShown', function (event, data) {
        if(data != 2) {
            clearSelection();
        }
    });

    function clearSelection() {
        var selectedNote = $('#pageNotesContainer').find('.widgetNoteContainerSelected');
        if(selectedNote.length > 0) {
            selectedNote.removeClass('widgetNoteContainerSelected');
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            $ahmtao.messageCenter.postMessage('toggleSelectWidgetNote', { id: '', value: false });
            // 注释加密 
        }
    }

    function closeAllDialogs() {
        for (var id in dialogs) {
            var $dialog = dialogs[id];
            if ($dialog !== undefined) _toggleAnnDialog(id);
        }
    }

    $ahmtao.player.toggleFootnotes = function(val) {
        var scaleCheckDiv = $('#showNotesOption').find('.overflowOptionCheckbox');
        if (scaleCheckDiv.hasClass('selected')) {
            if (!val) $('#showNotesOption').click();
        } else {
            if (val) $('#showNotesOption').click();
        }
    }

    function footnotes_click(event) {
        var scaleCheckDiv = $('#showNotesOption').find('.overflowOptionCheckbox');
        if (scaleCheckDiv.hasClass('selected')) {
            closeAllDialogs();

            scaleCheckDiv.removeClass('selected');
            $ahmtao.messageCenter.postMessage('annotationToggle', false);
            // 注释加密 
            $ahmtao.player.setVarInCurrentUrlHash(FOOTNOTES_VAR_NAME, 0);
        } else {
            scaleCheckDiv.addClass('selected');
            $ahmtao.messageCenter.postMessage('annotationToggle', true);
            // 注释加密 
            $ahmtao.player.deleteVarFromCurrentUrlHash(FOOTNOTES_VAR_NAME);
        }
    }

    function createNotesOverlay() {
        var $targetPanel = $('#clippingBounds');

        if (!$('#notesOverlay').length) {
            var notesOverlay = document.createElement('div');
            notesOverlay.setAttribute('id', 'notesOverlay');

            $targetPanel.prepend(notesOverlay);
            $(notesOverlay).append('&nbsp;');
        }
    }

    function generatePageNotes() {
        var pageNotesUi = "<div id='pageNotesHeader'>";

        pageNotesUi += "<div id='pageNotesToolbar' style='height: 12px;'>";
        pageNotesUi += "</div>";
        pageNotesUi += "</div>";


        pageNotesUi += "<div id='pageNotesScrollContainer'>";
        pageNotesUi += "<div id='pageNotesContainer'>";
        pageNotesUi += "<div id='pageNotesEmptyState' class='emptyStateContainer'><div class='emptyStateTitle'>No notes for this page.</div><div class='emptyStateContent'>Notes added in ahmtao RP will appear here.</div><div class='dottedDivider'></div></div>";
        pageNotesUi += "<span id='pageNotesContent'></span>";
        pageNotesUi += "</div></div>";

        $('#pageNotesHost').html(pageNotesUi);

        if(!$ahmtao.document.configuration.showAnnotations) {
            $('#pageNotesHost .pageNameHeader').css('padding-right', '55px');
        }
    }

})();   