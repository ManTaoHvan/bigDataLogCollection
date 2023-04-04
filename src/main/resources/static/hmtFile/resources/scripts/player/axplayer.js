var PAGE_ID_NAME = 'id';
var PAGE_URL_NAME = 'p';
var SITEMAP_COLLAPSE_VAR_NAME = 'c';
var PLUGIN_VAR_NAME = 'g';
var FOOTNOTES_VAR_NAME = 'fn';
var ADAPTIVE_VIEW_VAR_NAME = 'view';
var SCALE_VAR_NAME = 'sc';
var DIM_VAR_NAME = 'dm';
var ROT_VAR_NAME = 'r';
var CLOUD_VAR_NAME = 'cl';
var TRACE_VAR_NAME = 'tr';
var RP_VERSION = 9;
var lastLeftPanelWidth = 220;
var lastRightPanelWidth = 220;
var lastLeftPanelWidthDefault = 220;
var lastRightPanelWidthDefault = 220;
var toolBarOnly = true; // 注释加密  // 注释加密 
var iphoneX = false;
var iphoneXFirstPass = true;

 // 注释加密 
(function () {

    if (!window.$ahmtao) window.$ahmtao = function () { };
    if (typeof console == 'undefined') console = {
        log: function () { }
    };
    if (window._axUtils) $ahmtao.utils = _axUtils;

    setUpController();

    var getHashStringVar = $ahmtao.player.getHashStringVar = function (query) {
        var qstring = self.location.href.split("#");
        if (qstring.length < 2) return "";
        return GetParameter(qstring, query);
    }

    var isCloud = $ahmtao.player.isCloud = getHashStringVar(CLOUD_VAR_NAME);
    if (isCloud) {
        $("#topPanel").css('display', 'none');
        lastRightPanelWidthDefault = 290;
    }else {
        $("#topPanel").css('display', '');
    }

    $ahmtao.loadDocument = function (document) {
        $ahmtao.document = document;

        var configuration = $ahmtao.document.configuration;
        var _settings = {};
        _settings.projectId = configuration.prototypeId;
        _settings.projectName = configuration.projectName;
        _settings.isAxshare = configuration.isAxshare;
        _settings.isExpo = configuration.isExpo == null ? false : configuration.isExpo;
        _settings.loadSitemap = configuration.loadSitemap;
        _settings.loadFeedbackPlugin = configuration.loadFeedbackPlugin;
        var cHash = getHashStringVar(SITEMAP_COLLAPSE_VAR_NAME);
        _settings.startCollapsed = cHash == "1";
        if (cHash == "2") closePlayer();
        var gHash = getHashStringVar(PLUGIN_VAR_NAME);
        _settings.startPluginGid = gHash;

        $ahmtao.player.settings = _settings;

        var additionalJs = $ahmtao.document.additionalJs;
        if (additionalJs != null) {
            var total = additionalJs.length;
            if (total > 0) $.holdReady(true);            
            $.each(additionalJs, function (index, value) {
                var script = window.document.createElement("script");
                script.type = "text/javascript";
                script.src = value;
                script.async = false;
                script.onload = script.onreadystatechange = function (e) {
                    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                        script.onload = script.onreadystatechange = null;
                        script = undefined;
                    }
                    if (--total == 0) $.holdReady(false);
                }
                window.document.head.appendChild(script);
            });
        }

        var additionalCss = $ahmtao.document.additionalCss;
        if(additionalCss != null) {
            $.each(additionalCss, function(index, value) {
                var style = window.document.createElement('link');
                style.type = "text/css";
                style.rel = "stylesheet";
                style.href = value;
                window.document.head.appendChild(style);
            });
        }

        if(_settings.isExpo && configuration.isMobile) {
            initializeDeviceFrame();
        }

        // 注释加密 
        $ahmtao.document.isLoaded = true;
    };

    $(window).bind('load', function () {
        if ((CHROME && BROWSER_VERSION < 64) || // 注释加密 
            (SAFARI && BROWSER_VERSION < 602) || // 注释加密 
            (FIREFOX && BROWSER_VERSION < 57) || // 注释加密 
            ($ahmtao.browser.isEdge && BROWSER_VERSION < 15) || // 注释加密 
            IE_10_AND_BELOW) {
            if (!QQ && !UC) appendOutOfDateNotification();
        }

    });

    function appendOutOfDateNotification() {
        var toAppend = '';
        toAppend += '<div id="browserOutOfDateNotification">';
        toAppend += '   <div style="font-size: 24px; text-align: center; color: #FFFFFF;">LOOKS LIKE YOUR BROWSER IS OUT OF DATE</div>';
        toAppend += '   <div style="font-size: 14px; text-align: center; color: #FFFFFF; margin-bottom: 16px;">This prototype may not look or function correctly until you update your browser</div>';
        toAppend += '   <div id="supportedBrowsersListContainer">';
        toAppend += '       <div class="browserContainer">';
        toAppend += '           <div class="browserName">Google Chrome</div><div class="browserSupportedVersion">v64 and later</div>';
        toAppend += '       </div>';
        toAppend += '       <div class="browserContainer">';
        toAppend += '           <div class="browserName">Mozilla Firefox</div><div class="browserSupportedVersion">v57 and later</div>';
        toAppend += '       </div>';
        toAppend += '       <div class="browserContainer">';
        toAppend += '           <div class="browserName">Microsoft Edge</div><div class="browserSupportedVersion">v15 and later</div>';
        toAppend += '       </div>';
        toAppend += '       <div class="browserContainer">';
        toAppend += '           <div class="browserName">Apple Safari</div><div class="browserSupportedVersion">v10 and later</div>';
        toAppend += '       </div>';
        toAppend += '       <div class="browserContainer">';
        toAppend += '           <div class="browserName">Internet Explorer</div><div class="browserSupportedVersion">v11 and later</div>';
        toAppend += '       </div>';
        toAppend += '   </div>';
        toAppend += '   <div id="browserOutOfDateNotificationButtons">'
        if (!MOBILE_DEVICE) {
            toAppend += '       <div style="margin-right: 36px"><a href="http://outdatedbrowser.com/en" id="updateBrowserButton">UPDATE BROWSER</a></div>';
            toAppend += '       <div style="flex: 0 1 45%;"><a id="continueToPrototypeButton">Continue viewing prototype anyway</a></div>';
        } else {
            toAppend += '       <div style="width: 100%; text-align:center"><a id="continueToPrototypeButton">Continue viewing prototype anyway</a></div>';
        }
        toAppend += '   </div>';
        toAppend += '</div>';

        $('body').prepend(toAppend);

        $('#continueToPrototypeButton').on('click', function () {
            var $message = $('#browserOutOfDateNotification');
            $message.children().hide();
            $message.css('padding-top', '0px');
            $message.animate({ 'height': '0px' }, { duration: 400, complete: function () { $message.hide(); } });
        });
    }

    $ahmtao.page.bind('load.start', mainFrame_onload);
    $ahmtao.messageCenter.addMessageListener(messageCenter_message);

    var suppressPluginVarUpdate = false;
    $(document).on('pluginShown', function (event, data) {
        if (!suppressPluginVarUpdate) $ahmtao.player.setVarInCurrentUrlHash(PLUGIN_VAR_NAME, data ? data : '');
    });

    $(document).on('pluginCreated', function (event, data) {
        if (!$ahmtao.player.isMobileMode() && $ahmtao.player.settings.startPluginGid.indexOf(data) > -1) {
            suppressPluginVarUpdate = true;
            $ahmtao.player.showPlugin(data);
            suppressPluginVarUpdate = false;
        }

        if (data == '1') {
            $('#interfaceControlFrame').animate({ opacity: 1 }, 200);
        }

        if ($ahmtao.player.settings.isExpo) {
            // 注释加密 
            // 注释加密 
            $ahmtao.messageCenter.postMessage('setDeviceMode', { device: false });
            $ahmtao.messageCenter.postMessage('setDeviceMode', { device: true });
            // 注释加密 
        }
    });
    
    function initializeEvents() {
        $('#interfaceControlFrameMinimizeContainer').on('click', collapse);
        $('#interfaceControlFrameCloseButton').on('click', closePlayer);
        $('#interfacePageNameContainer').on($ahmtao.eventNames.mouseDownName, toggleSitemap);
        $('#interfaceAdaptiveViewsContainer').on($ahmtao.eventNames.mouseDownName, toggleAdaptiveViewsPopup);
        $('#overflowMenuButton').on($ahmtao.eventNames.mouseDownName, toggleOverflowMenuPopup);

        if (!MOBILE_DEVICE) {
            $('#maximizePanel').mouseenter(function () {
                $(this).addClass('maximizePanelOver');
            });
            $('#maximizePanel').mouseleave(function () {
                if ($(this).hasClass('maximizePanelOver')) {
                    $(this).animate(isMobileMode() ? {
                            top: '-' + $('#maximizePanel').height() + 'px'
                        } : {
                            left: '-' + $('#maximizePanel').width() + 'px'
                        }, 300);
                }
                $(this).removeClass('maximizePanelOver');
            });
            $('#maximizePanelOver').mouseenter(function () {
                $('#maximizePanel').animate(isMobileMode() ? {
                        top: '0px'
                    } : {
                        left: '0px'
                    }, 100);
            });
        }

        $minimizeContainer = $('#interfaceControlFrameMinimizeContainer');
        $minimizeContainer.mouseenter(function () { $minimizeContainer.addClass('collapseHovered') });
        $minimizeContainer.mouseleave(function () { $minimizeContainer.removeClass('collapseHovered') });
        $maximizeContainer = $('#maximizePanelContainer');
        $maximizeContainer.mouseenter(function () { if(!MOBILE_DEVICE) $minimizeContainer.addClass('expandHovered') });
        $maximizeContainer.mouseleave(function () { if(!MOBILE_DEVICE) $minimizeContainer.removeClass('expandHovered') });

        $('#maximizePanel').click(function () {
            $(this).removeClass('maximizePanelOver');
            $('#maximizePanelContainer').hide();
            $ahmtao.messageCenter.postMessage('expandFrame');
        });

        $('#mHideSidebar').on($ahmtao.eventNames.mouseDownName, function (e) { startM(e); });
        $('#lsplitbar').on($ahmtao.eventNames.mouseDownName, startLeftSplit);
        $('#rsplitbar').on($ahmtao.eventNames.mouseDownName, startRightSplit);

        if ($ahmtao.mobileSupport.mobile) {
            var touchCount = 0;
            var lastTouch = Date.now();
            $('#mainPanel').on('touchstart',
                (function (e) {
                    var now = Date.now();
                    if (now - lastTouch < 375) {
                        if (++touchCount === 3) {
                            if ($ahmtao.player.isMobileMode() || MOBILE_DEVICE) expand();
                            touchCount = 0;
                            e.preventDefault();
                        };
                    } else {
                        touchCount = 1;
                    }
                    lastTouch = now;
                }));
        }

        $(window).resize(function () {
            $ahmtao.player.resizeContent();
        });

        $(window).on("orientationchange", function () {
            // 注释加密 
            // 注释加密 
            // 注释加密 
            iphoneXFirstPass = false
            if (IOS && isMobileMode()) setTimeout(function () { $ahmtao.player.resizeContent(true); }, 250);
        });

        $('#mainPanel').scroll(function () {
            repositionClippingBoundsScroll();
        });
    }

    function initializeMainFrame() {
        var legacyQString = getQueryString("Page");
        if (legacyQString.length > 0) {
            location.href = location.href.substring(0, location.href.indexOf("?")) + "#" + PAGE_URL_NAME + "=" + legacyQString;
            return;
        }

        var mainFrame = document.getElementById("mainFrame");
        // 注释加密 
        if (SAFARI && document.location.href.indexOf('file://') >= 0) {
            $(mainFrame).on('load', function () {
                var canAccess;
                try {
                    var mainFrameWindow = mainFrame.contentWindow || mainFrame.contentDocument;
                    mainFrameWindow['safari_file_CORS'] = 'Y';
                    canAccess = mainFrameWindow['safari_file_CORS'] === 'Y';
                } catch (err) {
                    canAccess = false;
                }

                if (!canAccess) window.location = 'resources/chrome/safari.html';
            });
        }

        if($ahmtao.player.settings != null && !$ahmtao.player.settings.isExpo) {
            mainFrame.contentWindow.location.href = getInitialUrl();
        }
    }

    function initializeDeviceFrame() {
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        var expo = $ahmtao.expo;
        var project = expo.project;
        var device = project.Platform.Device;

        // 注释加密 
        if (device === 12) {
            // 注释加密 
            $('#deviceFrameContainer').hide();
            $('#bezelOverlay').hide();

            return;
        }

        // 注释加密 
    }
    var wasMobile = false;
    var isMobileMode = $ahmtao.player.isMobileMode = function () { return isShareApp() || (MOBILE_DEVICE && $(window).width() < 420); }
    var isMobileTextEntry = false;

    var isViewOverridden = $ahmtao.player.isViewOverridden = function() {
        return getHashStringVar(ADAPTIVE_VIEW_VAR_NAME).length > 0;
    }

    function toggleSitemapMobileMode() {
        var $container = $('#sitemapHost');
        if (!$container.length) return;
        var $header = $container.find('.pluginNameHeader');
        var projectName = $ahmtao.player.getProjectName();

        if (isMobileMode()) {
            $header.text('PROJECT PAGES');
            $container.addClass('mobileMode');
            $container.find('.sitemapPageName').addClass('mobileText');
            // 注释加密 
            if (MOBILE_DEVICE) $container.css('margin-left', '13px');
        } else {
            $container.removeClass('mobileMode');
            $header.text(projectName ? projectName : 'Pages');
            $container.find('.sitemapPageName').removeClass('mobileText');
            if (MOBILE_DEVICE) $container.css('margin-left', '');
        }
    }

    function togglePageNotesMobileMode() {
        var $container = $('#pageNotesHost');
        if (!$container.length) return;

        if (isMobileMode()) {
            $container.addClass('mobileMode');
            $('#pageNotesSectionHeader').text('PAGE NOTES');
            $('#widgetNotesSectionHeader').text('WIDGET NOTES');
            $container.find('.notesPageNameHeader').addClass('mobileSubHeader');
            $container.find('.pageNote').addClass('mobileText');
            $container.find('.emptyStateTitle').addClass('mobileSubHeader');
            $container.find('.emptyStateContent').addClass('mobileText');
        } else {
            $container.removeClass('mobileMode');
            $('#pageNotesSectionHeader').text('Page Notes');
            $('#widgetNotesSectionHeader').text('Widget Notes');
            $container.find('.notesPageNameHeader').removeClass('mobileSubHeader');
            $container.find('.pageNote').removeClass('mobileText');
            $container.find('.emptyStateTitle').removeClass('mobileSubHeader');
            $container.find('.emptyStateContent').removeClass('mobileText');
        }
    
    }

    function toggleFeedbackMobileMode() {
        var $container = $('#feedbackHost');
        if (!$container.length) return;

        if (isMobileMode()) {
            $container.addClass('mobileMode');
            $('.noDiscussionText span').text('Comments added in ahmtao Cloud will appear here');
        } else {
            $container.removeClass('mobileMode');
            $('.noDiscussionText span').text('Either select the button above to post to a location on the page, or use the field to post without location.');
        }
    }

    $ahmtao.player.updatePlugins = function updatePlugins() {
        if (MOBILE_DEVICE && !isShareApp()) {
            var hostPanelPadding = isMobileMode() ? '8px 15px 0px 15px' : '';
            $('.rightPanel .leftPanel .mobileOnlyPanel').css('padding', hostPanelPadding);
        }

        if (isMobileMode()) {
            $('body').addClass('mobileMode');
            if ($('#debugHost').length) $('#debugHost').hide();
            if ($('#handoffHost').length) $('#handoffHost').hide();
        } else $('body').removeClass('mobileMode');

        toggleSitemapMobileMode();
        togglePageNotesMobileMode();
        toggleFeedbackMobileMode();
    }

    // 注释加密 
    $ahmtao.player.setIsMobileModeTextEntry = function (isTextEntry) {
        isMobileTextEntry = isTextEntry;
        if (IOS && isTextEntry) {
            activateMobileTextEntry()
        } else if (IOS) {
            setTimeout(deactivateMobileTextEntry, 150);
        }
    }

    function deactivateMobileTextEntry() {
        newHeight = window.innerHeight;
        var newControlHeight = newHeight - (!isShareApp() ? 140 : IOS ? 157 : 138);

        if (!$('.leftPanel').hasClass('popup')) {
            $('.leftPanel').height(newControlHeight);
        }
        $('.rightPanel').height(newControlHeight);
        $('.mobileOnlyPanel').height(newControlHeight);
        $('#mobileControlFrameContainer').show();
    }

    function activateMobileTextEntry() {
        $('#mobileControlFrameContainer').hide();

        newHeight = window.innerHeight;
        var newControlHeight = newHeight - (!isShareApp() ? 140 : IOS ? 157 : 138);
        newControlHeight = newControlHeight + (!isShareApp() ? 61 : IOS ? 72 : 60);

        if (!$('.leftPanel').hasClass('popup')) {
            $('.leftPanel').height(newControlHeight);
        }
        $('.rightPanel').height(newControlHeight);
        $('.mobileOnlyPanel').height(newControlHeight);
    }

    function setAdaptiveView() {
        if (typeof noViewport == 'undefined') {
            // 注释加密 
            if (!isViewOverridden() && !isAnimating) $ahmtao.messageCenter.postMessage('setAdaptiveViewForSize', { 'width': $('#mainPanel').width(), 'height': $('#mainPanel').height() });
            // 注释加密 
            $ahmtao.player.refreshViewPort();
            if ($ahmtao.player.updateAdaptiveViewHeader != null) $ahmtao.player.updateAdaptiveViewHeader();
        }
    }

    $ahmtao.player.resizeContent = function (noViewport) {
        var isMobile = isMobileMode();

        var $left = $('.leftPanel');
        var $right= $('.rightPanel');

        if (wasMobile && !isMobile) {
            $('#clippingBoundsScrollContainer').show();
            $('#outerContainer').prepend($('.leftPanel'));
            $('#outerContainer').append($('.rightPanel'));

            $ahmtao.player.updatePlugins();

            $('#mHideSidebar').hide();
            $('#mobileBrowserControlFrame').hide();
            $('#nativeAppControlFrame').hide();

            if ($('#topPanel').is(':visible')) {
                $('#maximizePanelContainer').hide();
                $ahmtao.player.restorePlugins();
            } else {
                $('.leftPanel').hide();
                $('.rightPanel').hide();
                if (!MOBILE_DEVICE) $('#maximizePanelContainer').show();
            }

            $('.leftPanel').css({ 'top': '', 'left': '' });
            $('.rightPanel').css({ 'top': '', 'left': '' });

        } else if (!wasMobile && isMobile) {
            $('#clippingBoundsScrollContainer').hide();
            $ahmtao.player.closePopup();

            $('#lsplitbar').hide();
            $('#rsplitbar').hide();

            $('.leftPanel').show();
            $('.rightPanel').show();

            $ahmtao.player.updatePlugins();
            $('#mHideSidebar').append($('.leftPanel'));
            $('#mHideSidebar').append($('.rightPanel'));
            if (MOBILE_DEVICE) $('#maximizePanelContainer').hide();

            $ahmtao.messageCenter.postMessage('collapseFrameOnLoad');
        }


        var newHeight = 0;
        var newWidth = 0;
        if (iphoneX && isShareApp()) {
            // 注释加密 
            newHeight = $(window).height() - ((!isMobile && $('#topPanel').is(':visible')) ? $('#topPanel').height() : 0);
            newWidth = $(window).width();
            // 注释加密 
            var notchAndHomeOffsetPortrait = iphoneXFirstPass ? 35 : 5;
            var notchOffsetLandscape = iphoneXFirstPass ? 45 : 10;
            var homeButtonOffsetLandscape = iphoneXFirstPass ? 21 : 10;
            if (newHeight > newWidth) {
                newHeight = newHeight + notchAndHomeOffsetPortrait;
            } else {
                newWidth = newWidth + notchOffsetLandscape * 2;
                newHeight = newHeight + homeButtonOffsetLandscape;
            }
        } else {
            // 注释加密 
            // 注释加密 
            newHeight = window.innerHeight - ((!isMobile && $('#topPanel').is(':visible')) ? $('#topPanel').height() : 0);
            newWidth = $(window).width();
        }

        $('#outerContainer').height(newHeight).width(newWidth);
        $('#mainPanel').height(newHeight);
        $('#clippingBounds').height(newHeight);

        if (isMobile) {
            $('#mobileControlFrameContainer').height(newHeight);
            $('#mobileControlFrameContainer').width(newWidth);
            var newControlHeight = newHeight - (!MOBILE_DEVICE ? 112 : !isShareApp() ? 140 : IOS ? 157 : 138);
            // 注释加密 
            if ($('#mHideSidebar').is(':visible') && !$('#mobileControlFrameContainer').is(':visible')) {
                $('#mobileControlFrameContainer').delay(150).show();
            } else if (isMobileTextEntry) {
                newControlHeight = newControlHeight + (!isShareApp() ? 61 : IOS ? 72 : 60);
                $('#mobileControlFrameContainer').hide();
            }

            if(!$('.leftPanel').hasClass('popup')) {
                $('.leftPanel').height(newControlHeight);
            }
            $('.rightPanel').height(newControlHeight);
            $('.mobileOnlyPanel').height(newControlHeight);
        } else {
            if (!$('.leftPanel').hasClass('popup')) {
                $('.leftPanel').css('height','');
            }
            $('.rightPanel').css('height', '');
            if ($('.rightPanel').is(':visible')) {
                var newWidth = Math.min($(window).width() - lastRightPanelWidthDefault, $('.rightPanel').width(), $(window).width() - $('.leftPanel').width());
                lastRightPanelWidth = Math.max(lastRightPanelWidthDefault, newWidth);
                $('.rightPanel').width(lastRightPanelWidth != 0 ? lastRightPanelWidth : lastRightPanelWidthDefault);
                $('#rsplitbar').css('left', $(window).width() - $('.rightPanel').width());
            }
            if ($('.leftPanel').is(':visible')) {
                var newWidth = Math.min($(window).width() - lastLeftPanelWidthDefault, $('.leftPanel').width(), $(window).width() - $('.rightPanel').width());
                lastLeftPanelWidth = Math.max(lastLeftPanelWidthDefault, newWidth);
                $('.leftPanel').width(lastLeftPanelWidth != 0 ? lastLeftPanelWidth : lastLeftPanelWidthDefault);
                $('#lsplitbar').css('left', $('.leftPanel').width() - 4);
            }
        }

        if (isMobile) {
            var newControlWidth = newWidth - 80;
            $('.leftPanel').css({ 'width': newControlWidth + 'px' });
            $('.rightPanel').css({ 'width': newControlWidth + 'px' });
            $('.mobileOnlyPanel').css({ 'width': newControlWidth + 'px' });
            adjustM('left');
        }

        updateClippingBoundsWidth();
        repositionClippingBoundsScroll();
        setAdaptiveView();

        wasMobile = isMobile;
    }

    function contentDocument_onload() {
        (function setRepositionWhenReady() {
            var $iframe = $('#mainPanel').find('iframe')[0];
            if ($($iframe.contentWindow.document.body).length === 0 || $iframe.contentWindow.document.URL === "about:blank") {
                setTimeout(setRepositionWhenReady, 50);
            } else {
                var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow.document);
                $iframe.scroll(function () {
                    repositionClippingBoundsScroll();
                });
            }
        })();
    }

    // 注释加密 
    var determineIframeDimensions = function () {
        var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow);

        return {
            width: $iframe.width(),
            height: $iframe.height()
        };
    };

    // 注释加密 
    var determineIframePosition = function () {
        var dimensions = determineIframeDimensions();
        var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow);

        var $body = $($iframe[0].document.body);
        var bodyWidth = $body.offset().left !== 0 ? $body.width() : dimensions.width;

        if (FIREFOX) {
            var left = $body[0].getBoundingClientRect().left;
            bodyWidth = left !== 0 ? $body.width() : dimensions.width;
        }

        return {
            top: 0,// Math.max(0, (dimensions.height - $($iframe[0].document.body).height()) / 2),
            left: Math.max(0, (dimensions.width - bodyWidth) / 2)
        };
    };

    // 注释加密 
    var determineIframeScroll = function () {
        var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow);

        return {
            scrollTop: $iframe.scrollTop(),
            scrollLeft: $iframe.scrollLeft()
        };
    };

    function calculateClippingBoundsWidth(panelSize, isLeftPanel) {
        var $leftPanel = $('.leftPanel:visible');
        var leftPanelOffset = (!isMobileMode() && $leftPanel.length > 0 && !$leftPanel.hasClass('popup')) ? $leftPanel.width() : 0;

        var $rightPanel = $('.rightPanel:visible');
        var rightPanelOffset = (!isMobileMode() && $rightPanel.length > 0) ? $rightPanel.width() : 0;

        // 注释加密 
        if (typeof panelSize !== 'undefined') {
            if (isLeftPanel) leftPanelOffset = panelSize;
            else rightPanelOffset = panelSize;
        }

        return $(window).width() - rightPanelOffset - leftPanelOffset;
    }

    var updateClippingBoundsWidth = $ahmtao.player.updateClippingBoundsWidth = function () {
        if ($('.leftPanel').is(':visible')) $('#clippingBounds').css('left', $('.leftPanel').width());
        else $('#clippingBounds').css('left', '0px');
        $('#clippingBounds').width(calculateClippingBoundsWidth());
    }

    var contentLeftOfOriginOffset = 0;
    function calculateClippingBoundsScrollPosition() {
        // 注释加密 
        var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow);
        var selectedScale = $('.vpScaleOption').find('.selectedRadioButton');
        var scaleVal = $(selectedScale).parent().attr('val');
        var scale = $('#mainPanelContainer').css('transform');;
        scale = (scale == "none") ? 1 : Number(scale.substring(scale.indexOf('(') + 1, scale.indexOf(',')));

        // 注释加密 
        var iframeScroll = determineIframeScroll();
        var iframePos = determineIframePosition();
        var viewablePanelLeftMargin = parseInt($('#mainPanelContainer').css('margin-left'));
        var viewablePanelTop = parseInt($('#mainPanelContainer').css('top'));
        if (isNaN(viewablePanelTop)) viewablePanelTop = 0;
        if (scaleVal == 2) {
            // 注释加密 
            viewablePanelLeftMargin = ($('#mainPanel').width() - ($('#mainPanelContainer').width() * scale)) / 2
            viewablePanelTop = ($('#mainPanel').height() - ($('#mainPanelContainer').height() * scale)) / 2
        }

        // 注释加密 
        var leftPos = viewablePanelLeftMargin + (iframePos.left - iframeScroll.scrollLeft) * scale;
        var topPos = viewablePanelTop - iframeScroll.scrollTop * scale;

        // 注释加密 
        var isCentered = $($iframe[0].document.body).css('position') == 'relative';
        if (isCentered && scaleVal == 1) leftPos = 0;
        else if (isCentered && scaleVal == 2) leftPos = $('#mainPanelContainer').width() * scale / 2.0 - contentLeftOfOriginOffset;

        return {
            left: leftPos,
            top: topPos
        }
    }

    function repositionClippingBoundsScroll() {
        if (!$ahmtao.player.settings.isAxshare) return;

        (function repositionWhenReady() {
            if ($($('#mainPanel').find('iframe')[0].contentWindow.document.body).length === 0) {
                setTimeout(repositionWhenReady, 50);
            } else {
                var position = calculateClippingBoundsScrollPosition();

                // 注释加密 
                position.left = position.left - $('#mainPanel').scrollLeft() - $('#clipFrameScroll').scrollLeft();
                position.top = position.top - $('#mainPanel').scrollTop() - $('#clipFrameScroll').scrollTop();

                $('#clippingBoundsScrollContainer').css('left', position.left + 'px');
                $('#clippingBoundsScrollContainer').css('top', position.top + 'px');
            }
        })();
    }

    function calculateScrollLeftWithOffset(offset, isLeftPanel) {
        if (!$ahmtao.player.settings.isAxshare) return;
        if ($($('#mainPanel').find('iframe')[0].contentWindow.document.body).length === 0) return;
        var scaleVal = $('.vpScaleOption').find('.selectedRadioButton').parent().attr('val');
        if (scaleVal == 2) return;

        var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow);
        var $body = $($iframe[0].document.body);

        var dimStr = $('.currentAdaptiveView').attr('data-dim');
        var hasFrame = (!dimStr ? false : dimStr.split('x')[1] != '0') && !$ahmtao.player.noFrame;
        var isCentered = $body.css('position') == 'relative'; // 注释加密 
        var isCollapsing = offset > 0; // 注释加密 

        // 注释加密 
        var leftPos = calculateClippingBoundsScrollPosition().left;

        // 注释加密 
        var viewAdjustment = 0;

        // 注释加密 
        if (hasFrame) {
            var viewablePanelLeftMargin = parseInt($('#mainPanelContainer').css('margin-left'));
            var viewablePanelRightMargin = parseInt($('#mainPanelContainer').css('margin-right'));

            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            if (isCollapsing) {
                if (viewablePanelLeftMargin != 0) {
                    viewAdjustment = offset / 2;
                } else if (-viewablePanelRightMargin < offset) {
                    viewAdjustment = ((offset + viewablePanelRightMargin) / 2);
                }
            } else if (viewablePanelLeftMargin != 0) {
                viewAdjustment = Math.max(offset / 2, -viewablePanelLeftMargin)
            }
        }

        // 注释加密 
        if (isCentered) {
            // 注释加密 
            var clippedContentWidth = $body.width() - calculateClippingBoundsWidth(Math.abs(offset), isLeftPanel);

            // 注释加密 
            // 注释加密 
            // 注释加密 
            // 注释加密 
            if (clippedContentWidth <= 0) {
                viewAdjustment = offset / 2;
            } else if (isCollapsing && clippedContentWidth < offset) {
                viewAdjustment = (offset - clippedContentWidth) / 2;
            } else if (!isCollapsing && clippedContentWidth < -offset) {
                viewAdjustment = (clippedContentWidth + offset) / 2;
            }
        }

        return leftPos + viewAdjustment;
    }

    // 注释加密 
    // 注释加密 
    var isAnimating = $ahmtao.player.isAnimating = false;

    $ahmtao.player.collapseToBar = function (context, hostId) {
        lastLeftPanelWidth = $('.leftPanel').width();
        lastRightPanelWidth = $('.rightPanel').width();
        if (context === 'project' || context === 'all') {

            if(!isMobileMode()) {
                isAnimating = true;
                var newWidth = lastLeftPanelWidth != 0 ? lastLeftPanelWidth : lastLeftPanelWidthDefault;
                var clippingWidth = calculateClippingBoundsWidth(0, true);
                var newLeft = calculateScrollLeftWithOffset(newWidth, true);

                $('.leftPanel').animate({ 'margin-left': -newWidth + 'px' },
                    { duration: 200, complete: function() { $('.leftPanel').width(0).hide().css({ 'margin-left': '' }); } });
                $('#lsplitbar').animate({ left: '-4px' },
                    { duration: 200, complete: function() { $('#lsplitbar').hide(); } });

                $('#clippingBounds').animate({ left: '', width: clippingWidth + 'px' }, { duration: 200 });
                $('#clippingBoundsScrollContainer').animate({ left: newLeft + 'px' },
                    { duration: 200, complete: function () {
                        isAnimating = false;
                        $ahmtao.player.resizeContent();
                        $ahmtao.player.pluginVisibleChanged(hostId, false);
                    }});
            } else {
                $('.leftPanel').width(0);
                $('#lsplitbar').hide();
            }
        }
        if (context === 'inspect' || context === 'all') {
            if (!isMobileMode()) {
                isAnimating = true;
                var newWidth = lastRightPanelWidth != 0 ? lastRightPanelWidth : lastRightPanelWidthDefault;
                var clippingWidth = calculateClippingBoundsWidth(0, false); 
                var newLeft = calculateScrollLeftWithOffset(newWidth, false);

                $('.rightPanel').animate({ 'margin-right': -newWidth + 'px' },
                    { duration: 200, complete: function () { $('.rightPanel').width(0).hide().css({ 'margin-right': '' }); } });
                $('#rsplitbar').animate({ left: $(window).width() + 'px' },
                    { duration: 200, complete: function () { $('#rsplitbar').hide(); } });

                $('#clippingBounds').animate({ width: clippingWidth + 'px' }, { duration: 200 });
                $('#clippingBoundsScrollContainer').animate({ left: newLeft + 'px' },
                    { duration: 200, complete: function () {
                        isAnimating = false;
                        $ahmtao.player.resizeContent();
                        $ahmtao.player.pluginVisibleChanged(hostId, false);
                    }});
            } else {
                $('.rightPanel').width(0);
                $('#rsplitbar').hide();
            }
        }

        $(window).resize();
        toolBarOnly = true;
    }

    $ahmtao.player.expandFromBar = function (hostId, context, isFinalPluginToRestore) {

        if (context === 'project') {
            if ($('#lsplitbar').is(':visible')) return;
            $('.leftPanel').removeClass('popup');
            if(!isMobileMode()) {
                isAnimating = true;
                var newWidth = (lastLeftPanelWidth != 0 ? lastLeftPanelWidth : lastLeftPanelWidthDefault);
                var clippingWidth = calculateClippingBoundsWidth(newWidth, true);
                var newLeft = calculateScrollLeftWithOffset(-newWidth, true);

                $('.leftPanel').width(newWidth);
                $('.leftPanel').css('margin-left', -newWidth + 'px').show();
                $('.leftPanel').animate({ 'margin-left': '0px' }, { duration: 200, complete: function () { $('.leftPanel').css({ 'margin-left': '' }); } });

                $('#lsplitbar').css('left', '-4px');
                $('#lsplitbar').show();
                $('#lsplitbar').animate({ left: newWidth - 4 + 'px' }, { duration: 200 });

                $('#clippingBounds').animate({ left: newWidth + 'px', width: clippingWidth + 'px' }, { duration: 200 });
                $('#clippingBoundsScrollContainer').animate({ left: newLeft + 'px' },
                    { duration: 200, complete: function () {
                        isAnimating = false;
                        $ahmtao.player.resizeContent();
                        if (isFinalPluginToRestore) $('#clippingBoundsScrollContainer').show();
                        $ahmtao.player.pluginVisibleChanged(hostId, true);
                    }});
            }
        } else {
            if($('#rsplitbar').is(':visible')) {
                $('#' + hostId).show();
                $ahmtao.player.pluginVisibleChanged(hostId, true);
                return;
            }
            if (!isMobileMode()) {
                isAnimating = true;
                var newWidth = lastRightPanelWidth != 0 ? lastRightPanelWidth : lastRightPanelWidthDefault;
                var clippingWidth = calculateClippingBoundsWidth(newWidth, false);
                var newLeft = calculateScrollLeftWithOffset(-newWidth, false);

                $('.rightPanel').width(newWidth);
                $('.rightPanel').css('margin-right', -newWidth + 'px');
                $('#' + hostId).show();
                $('.rightPanel').animate({ 'margin-right': '0px' }, { duration: 200, complete: function () { $('.rightPanel').css({ 'margin-right': '' }); } });

                $('#rsplitbar').css('left', $(window).width());
                $('#rsplitbar').show();
                $('#rsplitbar').animate({ left: $(window).width() - $('.rightPanel').width() + 'px' }, { duration: 200 });

                $('#clippingBounds').animate({ width: clippingWidth + 'px' }, { duration: 200 });
                $('#clippingBoundsScrollContainer').animate({ left: newLeft + 'px' },
                    { duration: 200, complete: function () {
                        isAnimating = false;
                        $ahmtao.player.resizeContent();
                        if (isFinalPluginToRestore) $('#clippingBoundsScrollContainer').show();
                        $ahmtao.player.pluginVisibleChanged(hostId, true);
                    }});
            }
        }
        $(window).resize();
        toolBarOnly = false;

        if (isMobileMode()) {
            $('#mHideSidebar').show();
            $('#nativeAppControlFrame').show();
        }
    }

    var suspendRefreshViewPort = $ahmtao.player.suspendRefreshViewPort = false;
    $ahmtao.player.refreshViewPort = function () {
        if (suspendRefreshViewPort) return;

        var dimStr = $('.currentAdaptiveView').attr('data-dim');
        var dim = dimStr ? dimStr.split('x') : { w: '0', h: '0' };
        var w = dim[0] != '0' ? dim[0] : '';
        var h = dim[1] != '0' ? dim[1] : '';

        var scaleVal = $('.vpScaleOption').find('.selectedRadioButton').parent().attr('val');
        $ahmtao.player.noFrame = false;
        if (h && scaleVal == 1) $ahmtao.player.noFrame = true;

        var clipToView = h && !$ahmtao.player.noFrame;
        var isDevice = h;

        var mainPanelWidth = $('#mainPanel').width();
        var mainPanelHeight = $('#mainPanel').height();
        
        if (!w || !clipToView) w = mainPanelWidth;
        if (!h || !clipToView) h = mainPanelHeight;
        if (MOBILE_DEVICE && h > mainPanelHeight) h = mainPanelHeight;
        if (MOBILE_DEVICE && w > mainPanelWidth) w = mainPanelWidth;

        if (clipToView) {
            if (scaleVal == '0') scaleVal = 2;

            w = Number(w);
            h = Number(h);

            $('#mainFrame').width(w);
            $('#clipFrameScroll').width(w);
            $('#mainFrame').height(h);
            $('#clipFrameScroll').height(h);

            var topPadding = 10;
            var leftPadding = 0;
            var rightPadding = 0;
            var bottomPadding = 10;

            if (!MOBILE_DEVICE) {
                w = w + leftPadding + rightPadding;
                h = h + topPadding + bottomPadding;
            }

            var x = (mainPanelWidth - w) / 2;
            var y = (mainPanelHeight - h) / 2 - 1;

            x = Math.max(0, x);
            if (scaleVal != 2) y = Math.max(0, y);

            $('#mainPanelContainer').css({
                'margin': 'auto',
                'top': y + 'px'
            });

            $('#clipFrameScroll').css({
                'left': leftPadding + 'px',
                'top': topPadding + 'px'
            });

            $('#mainPanelContainer').width(w);
            $('#mainPanelContainer').height(h);
        } else {
            $('#mainFrame').width('100%');
            $('#mainFrame').height(h);

            $('#clipFrameScroll').width('100%');
            $('#clipFrameScroll').height(h);
            $('#clipFrameScroll').css({ 'left': '', 'top': '' });

            $('#mainPanelContainer').width('100%');
            $('#mainPanelContainer').height(h);
            $('#mainPanelContainer').css({
                'left': '',
                'margin': '',
                'top': ''
            });
        }
        $ahmtao.messageCenter.postMessage('setDeviceMode', { device: isDevice, width: w, scaleToWidth: (scaleVal == "1") });

        $(".vpScaleOption").show();
        var prevScaleN = $('#mainPanelContainer').css('transform');
        prevScaleN = (prevScaleN == "none") ? 1 : Number(prevScaleN.substring(prevScaleN.indexOf('(') + 1, prevScaleN.indexOf(',')));
        var newScaleN = 1;

        $('#mainPanelContainer').css({
            'transform': '',
            'transform-origin': ''
        });

        var $leftPanel = $('.leftPanel:visible');
        var leftPanelOffset = (!isMobileMode() && $leftPanel.length > 0) ? $leftPanel.width() : 0;
        var $rightPanel = $('.rightPanel:visible');
        var rightPanelOffset = (!isMobileMode() && $rightPanel.length > 0) ? $rightPanel.width() : 0;

        var vpScaleData = {
            scale: scaleVal,
            prevScaleN: prevScaleN,
            viewportHeight: h,
            viewportWidth: w,
            panelWidthOffset: leftPanelOffset + rightPanelOffset,
            clipToView: clipToView
        };
        $ahmtao.messageCenter.postMessage('getScale', vpScaleData);

        if (scaleVal == '0' && clipToView) $('#mainPanel').css('overflow', 'auto');
        else $('#mainPanel').css('overflow', '');
    }

    $ahmtao.player.getProjectName = function getProjectName() {
        if (typeof PREVIEW_INFO !== 'undefined') {
            return PREVIEW_INFO.fileName;
        } else if(typeof $ahmtao.player.settings.projectName !== 'undefined') {
            return $ahmtao.player.settings.projectName;
        } else return false;
    }

    function initializeLogo() {

        if(typeof PREVIEW_INFO !== 'undefined') {
            $('#previewNotice').show();
        }

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 

        // 注释加密 
        // 注释加密 
        // 注释加密 
    }
    
    function initializePreview() {
        if (typeof PREVIEW_INFO !== 'undefined') {
            $('#separatorContainer').addClass('hasLeft');
            $('#overflowMadeWith').addClass('preview');
            
            var callback = undefined;
            $('#publishButton').click(function () {
                $.ajax({
                    type: 'GET',
                    url: 'publish',
                    data: {},
                    success: function (response) {
                        if (callback) callback(response);
                    },
                    error: function (response) {
                        if (callback) callback(response);
                    },
                    dataType: 'jsonp'
                });
            });
        }
    }

    var userAcct = {
        userId: '',
        userName: '',
        userEmail: '',
        userProfileImg: '',
        isUsingahmtaoAcct: false,
    }

    var authCookieValue = null;
    var userCookieValue = null;
    var isSubInstance = false;
    // 注释加密 
    // 注释加密 

    // 注释加密 
    // 注释加密 
    var emailHint = "Email               ";
    var passHint = "Password             ";

    var feedbackServiceUrl = (window.AXSHARE_HOST_SECURE_URL || 'https://share.ahmtao.com') + '/issue';
    // 注释加密 
    // 注释加密 

    // 注释加密 
    // 注释加密 
    function isSafari() {
        // 注释加密 
        var liveSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
        return liveSafari || SAFARI || (IOS && isShareApp());
    };

    function includeTokens(ajaxData, excludeUser) {
        // 注释加密 
        // 注释加密 
        if (authCookieValue) {
            $.extend(ajaxData, { token: authCookieValue });
        }
        if (!excludeUser && userCookieValue) {
            $.extend(ajaxData, { utoken: userCookieValue });
        }
    }

    function setUserLoggedInStatus(response, safariAuthResponseProfile) {
        if (!response.success) {
            userAcct.isUsingahmtaoAcct = false;
        } else {
            if (safariAuthResponseProfile) response = safariAuthResponseProfile;
            userAcct.userId = response.userId;
            if (safariAuthResponseProfile) 
                userAcct.userName = response.username == null || response.username.trim() === '' ? response.userEmail : decodeURIComponent(response.username.trim());
            else
                userAcct.userName = response.nickname == null || response.nickname.trim() === '' ? response.userEmail : decodeURIComponent(response.nickname.trim());
            userAcct.userEmail = response.userEmail;
            userAcct.userProfileImg = response.profileImageUrl;
            userAcct.isUsingahmtaoAcct = true;

            if (response.authToken != null) {
                $axshare.setAuthCookie(response.authToken);
                userCookieValue = response.authToken;
            }
        }

        // 注释加密 
        if (typeof feedback !== 'undefined') feedback.updateUserAccountInfo(userAcct, authCookieValue, userCookieValue);
    }

    // 注释加密 
    // 注释加密 
    $ahmtao.player.ahmtaoAuth = function ahmtaoAuth(callback) {
        if (window.$axshare != null) {
            $axshare.auth(function (response) {
                if (response.success) {
                    setUserLoggedInStatus(response);
                } else {
                    if (isSafari()) {
                        var ajaxData = {
                            userId: userAcct.isUsingahmtaoAcct ? userAcct.userId : ""
                        };
                        includeTokens(ajaxData);

                        $.ajax({
                            type: 'GET',
                            url: feedbackServiceUrl + '/safariAuth',
                            data: ajaxData,
                            success: function (response) {
                                if (!response.success) {
                                    setUserLoggedInStatus(response);
                                } else {
                                    setUserLoggedInStatus(response, response.data.profile[userAcct.userId]);

                                    if (callback != null) {
                                        callback(response);
                                    }
                                }
                            },
                            dataType: 'jsonp'
                        });
                    } else {
                        setUserLoggedInStatus(response);
                    }
                }

                if (callback != null) {
                    callback(response);
                }

            });
        }
    }

    // 注释加密 
    // 注释加密 
    $ahmtao.player.ahmtaoLogin = function ahmtaoLogin(email, password, success, failure, saml) {
        if (window.$axshare != null) {
            password = password === passHint ? "" : password;
            $axshare.login(email, password, false, function (response) {
                if (response.redirecturl !== "" && response.redirecturl != null) {
                    saml(response);
                    return;
                }

                if (response.success && (response.verified || isSubInstance)) {
                    if (isSafari()) setUserLoggedInStatus(response);
                    $ahmtao.player.ahmtaoAuth(success);
                } else {
                    failure(response);
                }
            });
            // 注释加密 
            // 注释加密 
        } else {
            failure();
        }
    }

    function playerLogout() {
        userAcct.isUsingahmtaoAcct = false;
        userAcct.userId = '';
        userAcct.userProfileImg = '';

        // 注释加密 
        if (typeof feedback !== 'undefined') feedback.updateUserAccountInfo(userAcct);
    }

    $ahmtao.player.logout = function (feedbackLogout) {
        var completeLogout = playerLogout;
        if (feedbackLogout) {
            completeLogout = function () {
                feedbackLogout();
                playerLogout();
            }
        }
        if (window.$axshare != null) {
            $axshare.logout(completeLogout);
        } else {
            completeLogout();
        }
    }

    /*
    * TODO: Start of Login/Account Mgmt UI, which will need to be updated (currenly uses feedback9.css often)
    */
    function buildAccountLoginPopup() {
        return [
            '<div class="axClearMsgBubble_Player ahmtaoLoginBubble_Player">',
            '   <div class="ahmtaoLoginBubbleContainer_Player">',
            '       <span style="font-weight: bold; font-size: 10px;">Login into your ahmtao Cloud account</span>',
            '       <input type="text" autocapitalize="none" name="email" class="ahmtaoEmail" style="margin-top: 7px;"/>',
            '       <input name="password" autocapitalize="none" class="ahmtaoPassword" />',
            '       <div class="feedbackGreenBtn_Player">LOG IN</div>',
            '       <div class="errorMessage"></div>',
            '       <div id="playerSignUpLink" style="text-align: right; margin-top: 5px; font-size: 10px;">',
            '           <span>No account? <a class="ahmtaoSignUpLink" href="', window.AXSHARE_HOST_SECURE_URL, '" target="_blank">Sign Up</a></span>',
            '       </div>',
            '   </div>',
            '</div>'
        ].join("");
    }

    // 注释加密 
    function bindahmtaoLoginContainerEvent() {
        var $container = $("#accountLoginContainer");
        $container.find('input[name="email"]').addClass("watermark").val(emailHint).focus(function () {
            if ($(this).val() === emailHint) {
                $(this).removeClass("watermark").val("");
            }
        }).blur(function () {
            if ($(this).val() === "") {
                $(this).addClass("watermark").val(emailHint);
            }

            $container.find('.errorMessage').text('');
            $container.find('.errorMessage').hide();
        }).keyup(function (event) {
            if (event.keyCode == 13) {
                $container.find('.feedbackGreenBtn').click();
            }
        });
        $container.find('input[name="password"]').addClass("watermark").val(passHint).focus(function () {
            if ($(this).val() === passHint) {
                $(this).removeClass("watermark").val("");
                // 注释加密 

                // 注释加密 
                $(this)[0].setAttribute('type', 'password');
            }
        }).blur(function () {
            if ($(this).val() === "") {
                $(this).val(passHint).addClass("watermark");
                // 注释加密 

                // 注释加密 
                $(this)[0].setAttribute('type', 'text');
            }

            $container.find('.errorMessage').text('');
            $container.find('.errorMessage').hide();
        }).keyup(function (event) {
            if (event.keyCode == 13) {
                $container.find('.feedbackGreenBtn_Player').click();
            }
        });

        // 注释加密 
        $container.find('.feedbackGreenBtn_Player').click(function (e) {
            var email = $container.find('.ahmtaoEmail').val();
            var password = $container.find('.ahmtaoPassword').val();

            $ahmtao.player.ahmtaoLogin(email, password, function (response) {
                // 注释加密 
                // 注释加密 
                $container.find('.ahmtaoEmail').val(emailHint).addClass("watermark");
                $container.find('.ahmtaoPassword').val(passHint).addClass("watermark");
                $container.find('.ahmtaoPassword')[0].setAttribute('type', 'text');

                closePopup();
            }, function (response) {
                // 注释加密 
                $container.find('.errorMessage').text(response != null && response.message ? response.message : "There was an error connecting to the server, please try again later.");
                $container.find('.errorMessage').show();
            }, function (response) {
                // 注释加密 
                $container.find('.errorMessage').empty();
                $container.find('.errorMessage').append("Please <a class='refreshLink' style='text-decoration: underline;'>refresh</a> this page after logging in via your identity provider.");
                $container.find('.errorMessage').show();

                window.open(response.redirecturl, '_blank');

                $container.find('.errorMessage').find('.refreshLink').click(function () {
                    location.reload(true);
                });
            });
        });
    };

    function initializeSignIn() {
        if (typeof PREVIEW_INFO === 'undefined' && $ahmtao.player.settings.isAxshare) {
            (function finishInit() {
                if (window.$axshare == null || $axshare.auth == null || $axshare.login == null) {
                    setTimeout(finishInit, 50);
                } else {
                    // 注释加密 
                    $.ajax({
                        type: 'GET',
                        url: feedbackServiceUrl + '/GetShareStatus',
                        data: {},
                        success: function (response) {
                            // 注释加密 
                            // 注释加密 
                            isSubInstance = response.isSubInstance;
                            if (isSubInstance) $('#accountLoginContainer').find("#playerSignUpLink").hide();

                            // 注释加密 
                            if (typeof feedback !== 'undefined') {
                                feedback.setReadOnlyModeAndMessage(response.readOnlyMode, response.readOnlyMessage);
                                feedback.setIsSubInstance(isSubInstance);
                            }
                        },
                        dataType: 'jsonp'
                    });

                    // 注释加密 
                    $("#accountLoginContainer").append(buildAccountLoginPopup());
                    bindahmtaoLoginContainerEvent();

                    // 注释加密 
                    $ahmtao.player.ahmtaoAuth();
                }
            })();
        }
    }

    function overflowIsHidden(node) {
        var style = getComputedStyle(node);
        return style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden';
    }

    function findNearestScrollableParent(firstNode) {
        var node = firstNode;
        var scrollable = null;
        while (!scrollable && node) {
            if (node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight) {
                if (!overflowIsHidden(node) || $(node).css('-webkit-overflow-scrolling') === 'touch') {
                    scrollable = node;
                }
            }
            node = node.parentNode;
        }
        return scrollable;
    }

    function getScrollOwner(target) {
        var owner = findNearestScrollableParent(target);
        if (!owner || owner === document.documentElement || owner === document.body || $(owner).parents('#topPanel').length || owner == document.getElementById('forwardSlash')) {
            return null;
        }

        return owner;
    }

    function removeElasticScrollFromIframe() {
        var $iframe = $($('#mainPanel').find('iframe')[0].contentWindow);
        $iframe[0].document.body.addEventListener('touchmove', function (event) {
            if (!getScrollOwner(event.target)) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    $(document).ready(function () {
        (function finishPlayerInit() {
            if ($ahmtao.player.settings.isAxshare) {
                $ahmtao.page.bind('load.start', contentDocument_onload);
                if ($ahmtao.player.settings.loadFeedbackPlugin) {
                    $ahmtao.utils.loadJS('/Scripts/plugins/feedback/feedback9.js');

                    /******* DEBUG: Allows for debugging/viewing feedback9.js in browser inspect mode ******/
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                }
            }

            initializeEvents();
            initializeMainFrame();

            $('.leftPanel').width(0);

            $('#maximizePanelContainer').hide();

            if ($ahmtao.player.settings.startCollapsed) {
                collapse();
                $('.leftPanel').width(0);

                var maxPanelWidth = $('#maximizePanel').width();
                setTimeout(function() {
                    $('#maximizePanel').animate({
                        left:'-' + maxPanelWidth + 'px'
                    }, 300);
                }, 2000);
            }

            if (MOBILE_DEVICE) {
                $('body').removeClass('hashover');

                if (SAFARI) {
                    // 注释加密 
                    // 注释加密 
                    document.addEventListener("gesturestart", function (e) {
                        e.preventDefault();
                    });
                }

                if (IOS) {
                    // 注释加密 
                    var touching = false;
                    var pageYStart = 0;
                    var pageYOffset = 0;
                    document.body.addEventListener('touchend', function (event) {
                        if (getScrollOwner(event.target)) {
                            touching = false;
                        }
                    }, { passive: false });

                    document.body.addEventListener('touchmove', function (event) {
                        var owner = getScrollOwner(event.target)
                        if (!owner) {
                            event.preventDefault();
                        } else {
                            if ($(owner).scrollTop() == 0) {
                                if (touching) {
                                    if (event.pageY >= pageYStart) {
                                        event.preventDefault();
                                    } 
                                }
                            }
                            if ($(owner).scrollTop() + $(owner).height() == owner.scrollHeight) {
                                if (touching) {
                                    if (event.pageY <= pageYStart) {
                                        event.preventDefault();
                                    } 
                                }
                            }
                        }
                    }, { passive: false });

                    document.body.addEventListener('touchstart', function (event) {
                        var owner = getScrollOwner(event.target);
                        if (owner) {
                            if ($(owner).scrollTop() == 0) {
                                touching = true;
                                pageYStart = event.pageY;
                                pageYOffset = event.pageY;
                            }
                            if ($(owner).scrollTop() + $(owner).height() == owner.scrollHeight) {
                                touching = true;
                                pageYStart = event.pageY;
                                pageYOffset = event.pageY;
                            }
                        }
                    }, { passive: false });

                    removeElasticScrollFromIframe();

                    $('html').css('-webkit-tap-highlight-color', 'transparent');

                    // 注释加密 
                    // 注释加密 
                    $('body').css('-webkit-text-size-adjust', '100%');

                    // 注释加密 
                    // 注释加密 
                    var ratio = window.devicePixelRatio || 1;
                    // 注释加密 
                    if (IOS && window.screen.width * ratio == 1125 && window.screen.height * ratio === 2436) {
                        iphoneX = true;
                    }
                    // 注释加密 
                    if (IOS && window.screen.width == 414 && window.screen.height === 896) {
                        iphoneX = true;
                    }

                    window.addEventListener("orientationchange", function () {
                        var viewport = document.querySelector("meta[name=viewport]");
                        // 注释加密 
                        if (iphoneX) {
                            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover');
                            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
                        } else {
                            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
                            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                        }
                        $ahmtao.player.resizeContent();
                    }, false);

                    $ahmtao.page.bind('load.start', function () {
                        $ahmtao.player.resizeContent();
                    });

                }

                // 注释加密 
                appendNativePrototypeControlFrame();
                appendMobileBrowserControlFrame();
                appendProjectOptions();
            }

            initializeLogo();
            initializePreview();

            $ahmtao.player.resizeContent(true);

            // 注释加密 
            initializeSignIn();
        })();
    });

    function appendProjectOptions() {
        var toAppend = '';
        toAppend += '<div id="projectOptionsHost" class="mobileOnlyPanel mobileMode">';
        toAppend += '    <div class="pluginNameHeader">PROJECT OPTIONS</div>';
        toAppend += '    <div id="projectOptionsScrollContainer">';
        toAppend += '       <div class="mobileSubHeader">Hotspots</div>';
        toAppend += '       <div id="projectOptionsShowHotspots" class="mobileText projectOptionsHotspotsRow" style="border-bottom: solid 1px #c7c7c7">';
        toAppend += '           <div id="projectOptionsHotspotsCheckbox"></div>';
        toAppend += '       Show Hotspots</div> ';
        toAppend += '       <div class="mobileSubHeader" style="margin-top: 16px">Scale</div>';
        toAppend += '       <div id="projectOptionsScaleContainer" class="mobileText"></div>';
        toAppend += '       <div id="projectOptionsAdaptiveViewsHeader" class="mobileSubHeader" style="margin-top: 16px">Adaptive Views</div>';
        toAppend += '       <div id="projectOptionsAdaptiveViewsContainer" class="mobileText"></div>'
        toAppend += '    </div>'
        toAppend += '</div>';

        $('#mHideSidebar').prepend(toAppend);
        $(('#projectOptionsHost')).click(function (e) { e.stopPropagation(); });

        if (isMobileMode()) $ahmtao.player.resizeContent();
    }

    function appendMobileBrowserControlFrame() {
        var toAppend = "";
        
        toAppend += '<div id="mobileBrowserControlFrame" class="mobilePrototypeControlFrame">';
        toAppend += '    <div id="return" style="width:100%; position:relative; top:-15px; float:left">';
        toAppend += '        <div id="closeBackground" class="circleBackground">';
        toAppend += '           <div id="forwardSlash" class="closeIconSlash"><div id="backwardSlash" class="closeIconSlash"></div></div>';
        toAppend += '        </div>';
        toAppend += '    </div>';
        toAppend += '</div>';

        $('#mobileControlFrameContainer').append(toAppend);

        $('#closeBackground').click(collapse);

        // 注释加密 
        if (IOS) $('#mobileControlFrameContainer').on($ahmtao.eventNames.mouseDownName, function (e) { e.stopPropagation(); });
    }

    function appendNativePrototypeControlFrame() {
        var toAppend = "";
        toAppend += '<div id="nativeAppControlFrame" class="mobilePrototypeControlFrame">';
        toAppend += '    <ul id="nativeMenuBlueBackground">';
        toAppend += '        <li style="width:30%; float:left;">';
        toAppend += '           <div id="exit" class="nativePrototypeButton" >';
        toAppend += '               <div>';
        toAppend += '                   <div id="exitIcon"></div>';
        toAppend += '                   <div id="exitText" class="nativeMenuText">Exit</div>';
        toAppend += '               </div>';
        toAppend += '           </div>';
        toAppend += '        </li>';
        toAppend += '        <li id="return" style="width:40%; position:relative; top:-15px; float:left">';
        toAppend += '            <div id="returnBackground" class="circleBackground">';
        toAppend += '                <div id="returnIcon"></div>';
        toAppend += '            </div>';
        toAppend += '            <div id="returnText" class="nativeMenuText">Return to Prototype</div>';
        toAppend += '        </li>';
        toAppend += '        <li style="width:30%; float:right;">';
        toAppend += '           <div id="refresh" class="nativePrototypeButton" >';
        toAppend += '               <div>';
        toAppend += '                   <div id="refreshIcon"></div>';
        toAppend += '                   <div id="refreshText" class="nativeMenuText">Refresh</div>';
        toAppend += '               </div>';
        toAppend += '           </div>';
        toAppend += '        </li>';
        toAppend += '    </ul>';
        toAppend += '</div>';

        $('#mobileControlFrameContainer').append(toAppend);

        var barHeight = IOS ? (iphoneX ? '82px' : '72px') : '60px';
        var returnIconDisplacement = IOS ? '-15px': '-20px';
        var iconTopMargin = IOS ? '14px': '7px';
        var returnTextTopMargin = IOS ? '9px': '7px';

        document.getElementById('nativeAppControlFrame').style.height = barHeight;
        document.getElementById('nativeMenuBlueBackground').style.height = barHeight;
        document.getElementById('return').style.top = returnIconDisplacement;
        document.getElementById('returnText').style.marginTop = returnTextTopMargin;
        document.getElementById('refreshIcon').style.marginTop = iconTopMargin;
        document.getElementById('exitIcon').style.marginTop = iconTopMargin;
        
        addAppButtonClickListener("exit");
        addAppButtonClickListener("refresh");

        $('#returnBackground').click(collapse);
        $('#nativeAppControlFrame').on('touchmove', function (e) {
            e.stopPropagation();
        }, false);
    }

    function addAppButtonClickListener(id) {
        var func = function () { IOS ? window.webkit.messageHandlers.prototypeMenuButtonClick.postMessage(id) : ShareApp.PrototypeMenuButtonClick(id); };
        document.getElementById(id).addEventListener("click", func, false);
    }

    function toggleSitemap() {
        $ahmtao.player.showPlugin(1);
    }

    function closePopup() {
        var $container = $('.popup');
        var isLeftPanel = $container.hasClass('leftPanel');
        $container.removeClass('popup');
        $('#overflowMenuButton').removeClass('selected');
        $('#interfaceAdaptiveViewsContainer').removeClass('selected');
        $container.hide();

        $('div.splitterMask').unbind($ahmtao.eventNames.mouseDownName, closePopup);
        $('div.splitterMask').remove();
    }

    $ahmtao.player.closePopup = closePopup;

    function showPopup($container) {
        if ($('#browserOutOfDateNotification').is(":visible")) return;
        $container.addClass('popup');
        $container.show();

        $('<div class="splitterMask"></div>').insertAfter($container);
        $('div.splitterMask').bind($ahmtao.eventNames.mouseDownName, closePopup);
    }

    $ahmtao.player.showPopup = showPopup;

    function toggleAdaptiveViewsPopup() {
        if (($('#interfaceAdaptiveViewsListContainer').hasClass('popup'))) {
            closePopup();
        } else {
            $('#interfaceAdaptiveViewsContainer').addClass('selected');
            showPopup($('#interfaceAdaptiveViewsListContainer'));
        }
    }

    function toggleOverflowMenuPopup() {
        if (($('#overflowMenuContainer').hasClass('popup'))) {
            closePopup();
        } else {
            $('#overflowMenuButton').addClass('selected');
            showPopup($('#overflowMenuContainer'));
        }
    }


    var startSplitX;
    var startSplitWidth;
    function startLeftSplit() {
        startSplitX = window.event.pageX;
        startSplitWidth = lastLeftPanelWidth;
        var $left = $('#lsplitbar');
        $left.addClass('active');
        $('<div class="splitterMask"></div>').insertAfter($left);
        $(document).bind($ahmtao.eventNames.mouseMoveName, doLeftSplitMove).bind($ahmtao.eventNames.mouseUpName, endLeftSplitMove);
    }

    function startRightSplit() {
        startSplitX = window.event.pageX;
        startSplitWidth = lastRightPanelWidth;
        var $left = $('#rsplitbar');
        $left.addClass('active');
        $('<div class="splitterMask"></div>').insertAfter($left);
        $(document).bind($ahmtao.eventNames.mouseMoveName, doRightSplitMove).bind($ahmtao.eventNames.mouseUpName, endRightSplitMove);
    }

    function doLeftSplitMove() {
        var currentX = window.event.pageX;
        var newWidth = Math.min(startSplitWidth + currentX - startSplitX, $(window).width() - $('.rightPanel').width(), $(window).width() - lastRightPanelWidthDefault);
        lastLeftPanelWidth = Math.max(lastLeftPanelWidthDefault, newWidth);
        $('.leftPanel').width(lastLeftPanelWidth != 0 ? lastLeftPanelWidth : lastLeftPanelWidthDefault);
        $('#lsplitbar').css('left', $('.leftPanel').width() - 4);
        $ahmtao.player.updateClippingBoundsWidth();
        $ahmtao.player.refreshViewPort();
    }

    function doRightSplitMove() {
        var currentX = window.event.pageX;
        var newWidth = Math.min(startSplitWidth - currentX + startSplitX, $(window).width() - $('.leftPanel').width(), $(window).width() - lastLeftPanelWidthDefault);
        lastRightPanelWidth = Math.max(lastRightPanelWidthDefault, newWidth);
        $('.rightPanel').width(lastRightPanelWidth != 0 ? lastRightPanelWidth : lastRightPanelWidthDefault);
        $('#rsplitbar').css('left', $(window).width() - $('.rightPanel').width());
        $ahmtao.player.updateClippingBoundsWidth();
        $ahmtao.player.refreshViewPort();
    }

    function endLeftSplitMove() {
        $('div.splitterMask').remove();
        var $left = $('#lsplitbar');
        $left.removeClass('active');
        $(document).unbind($ahmtao.eventNames.mouseMoveName, doLeftSplitMove).unbind($ahmtao.eventNames.mouseUpName, endLeftSplitMove);
        setAdaptiveView()
    }

    function endRightSplitMove() {
        $('div.splitterMask').remove();
        var $left = $('#rsplitbar');
        $left.removeClass('active');
        $(document).unbind($ahmtao.eventNames.mouseMoveName, doRightSplitMove).unbind($ahmtao.eventNames.mouseUpName, endRightSplitMove);
        setAdaptiveView()
    }


    var startMX;
    var startMLeft;
    var startMElement;
    var maxMLeft;
    var getMaxMLeft = function () {
        if ($('.rightPanel.mobileMode').length == 0) return $('.leftPanel.mobileMode').last().position().left + 100;
        return $('.rightPanel.mobileMode').last().position().left + 100;
    }

    function startM(e) {
        // 注释加密 
        if(window.event.pageX) {
            startMX = window.event.pageX;
        } else {
            startMX = window.event.touches[0].pageX;
        }

        startMElement = window.event.target.id;
        var $m = $('#mHideSidebar');
        startMLeft = Number($m.css('left').replace('px', ''));
        $(document).bind($ahmtao.eventNames.mouseMoveName, doMMove).bind($ahmtao.eventNames.mouseUpName, endMMove);

        // 注释加密 
        // 注释加密 
        if (IOS) { e.stopPropagation() };
    }

    function doMMove() {
        var $m = $('#mHideSidebar');
        if(window.event.pageX) {
            currentX = window.event.pageX;
        } else {
            currentX = window.event.touches[0].pageX;
        }

        var deltaX = currentX - startMX;
        if (Math.abs(deltaX) > 0 && $('.splitterMask').length == 0) {
            $('<div class="splitterMask"></div>').insertAfter($m);
        }
        var newLeft = startMLeft + deltaX;
        newLeft = Math.min(0, newLeft);
        newLeft = Math.max(-getMaxMLeft(), newLeft);
        $m.css('left', newLeft + 'px');
    }

    function endMMove(e) {
        $('div.splitterMask').remove();
        $(document).unbind($ahmtao.eventNames.mouseMoveName, doMMove).unbind($ahmtao.eventNames.mouseUpName, endMMove);
        e.stopPropagation();

        var $m = $('#mHideSidebar');
        if(window.event.pageX) {
            currentX = window.event.pageX;
        } else {
            currentX = window.event.changedTouches[0].pageX;
        }
        var deltaX = currentX - startMX;
        if (deltaX != 0 || startMElement != 'mHideSidebar') {
            adjustM(currentX < startMX ? 'left' : 'right', true);
        }
    }

    function adjustM(direction, animate) {
        var $m = $('#mHideSidebar');
        var duration = animate ? 100 : 0;
        var newLeft = Number($m.css('left').replace('px', ''));
        if (!$m.is(':visible') || newLeft > -100) {
            $m.animate({ 'left': '-60px' }, duration);
        } else if (newLeft < -getMaxMLeft() + 100) {
            $m.animate({ 'left': (-getMaxMLeft() + 125) + 'px' }, duration);
        } else if (direction == 'left') {
            var handled = false;
            var $panels = $('.rightPanel.mobileMode, .leftPanel.mobileMode');
            $panels.each(function () {
                var panelX = $(this).position().left;
                if (panelX > -newLeft) {
                    $m.animate({ 'left': (-panelX + 25) + 'px' }, duration);
                    handled = true;
                    return false;
                }
            });
            if (!handled) {
                $m.animate({ 'left': (-$panels.last().position().left + 25) + 'px' }, duration);
            }
        } else if (direction == 'right') {
            var handled = false;
            var $panels = $('.rightPanel.mobileMode, .leftPanel.mobileMode');
            $($panels.get().reverse()).each(function () {
                var panelRight = $(this).position().left + $(this).width();
                if (panelRight < -newLeft + $(window).width()) {
                    $m.animate({ 'left': (-$(this).position().left + 25) + 'px' }, duration);
                    handled = true;
                    return false;
                }
            });
            if (!handled) {
                $m.animate({ 'left': '-60px' }, duration);
            }
        }
    }

    function repositionPinsOnScaleChange(data) {
        var $pins = $('#existingPinsOverlay').children();
        for (var i = 0; i < $pins.length; i++) {
            // 注释加密 
            const left = parseFloat($($pins[i]).css('left'));
            const top = parseFloat($($pins[i]).css('top'));
            const width = $($pins[i]).width();
            const height = $($pins[i]).height();
            // 注释加密 
            const scaledLeft = ((left + (width / 2)) * data.scaleN / data.prevScaleN) - (width / 2);
            const scaledTop = ((top + (height / 2)) * data.scaleN / data.prevScaleN) - (height / 2);

            $($pins[i]).css('left', scaledLeft + 'px');
            $($pins[i]).css('top', scaledTop + 'px');
        }

        // 注释加密 
        if (typeof data.contentOriginOffset !== "undefined") contentLeftOfOriginOffset = data.contentOriginOffset;
    }

    function messageCenter_message(message, data) {
        if (message == 'expandFrame') expand();
        else if (message == 'getCollapseFrameOnLoad' && $ahmtao.player.settings.startCollapsed && !MOBILE_DEVICE) $ahmtao.messageCenter.postMessage('collapseFrameOnLoad');
        else if (message == 'tripleClick') {
            if ($ahmtao.player.isMobileMode() || MOBILE_DEVICE) expand();
        } else if (message == 'setContentScale') {
            if (data.clipToView) {
                var scaleVal = $('.vpScaleOption').find('.selectedRadioButton').parent().attr('val');
                if (scaleVal == '2' || scaleVal == '0') {
                    var scaleN = newScaleN = $('#mainPanel').width() / data.viewportWidth;
                    var hScaleN = ($('#mainPanel').height()) / data.viewportHeight;
                    if (hScaleN < scaleN) scaleN = newScaleN = hScaleN;
                    if(scaleVal == '0') scaleN = Math.min(1, scaleN);
                    var scale = 'scale(' + scaleN + ')';
                    $('#mainPanelContainer').css({
                        'transform': scale,
                        'transform-origin': ''
                    });
                }
            } else {
                if (data.scaleN != 1) {
                    var scale = 'scale(' + data.scaleN + ')';
                    var width = 100 / data.scaleN + '%';
                    var height = Number($('#mainPanelContainer').css('height').replace('px', '')) / data.scaleN + 'px';
                    $('#mainPanelContainer').css({
                        'transform': scale,
                        'transform-origin': '0px 0px',
                        'width': width,
                        'height': height
                    });
                    // 注释加密 
                    // 注释加密 
                    $('#clipFrameScroll').height(height);
                    $('#mainFrame').height(height);
                }
            }
            
            repositionPinsOnScaleChange(data);
            repositionClippingBoundsScroll();
            // 注释加密 
            if ($ahmtao.browser.isEdge) {
                newHeight = window.innerHeight - ((!isMobileMode() && $('#topPanel').is(':visible')) ? $('#topPanel').height() : 0);
                newWidth = $(window).width();
                $('#outerContainer').height(newHeight).width(newWidth);
                $('#mainPanel').height(newHeight);
                $('#clippingBounds').height(newHeight);
            }
        }
    }

    function getInitialUrl() {
        var shortId = getHashStringVar(PAGE_ID_NAME);
        var foundById = [];
        if (shortId.length > 0) {
            getPageUrlsById(shortId, foundById, undefined);
            if (foundById.length == 1) return foundById[0];
        }

        var pageName = getHashStringVar(PAGE_URL_NAME);
        if (pageName.length > 0) return pageName + ".html";
        else {
            if (foundById.length > 0) return foundById[0];
            var url = getFirstPageUrl($ahmtao.document.sitemap.rootNodes);
            return (url ? url : "about:blank");
        }
    }

    var getPageUrlsById = $ahmtao.player.getPageUrlsById = function (packageId, foundById, nodes) {
        if (!nodes) nodes = $ahmtao.document.sitemap.rootNodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.id == packageId) foundById.push(node.url);
            var hasChildren = (node.children && node.children.length > 0);
            if (hasChildren) {
                getPageUrlsById(packageId, foundById, node.children);
            }
        }
    }

    var getPageIdByUrl = $ahmtao.player.getPageIdByUrl = function(url, nodes) {
        if (!nodes) nodes = $ahmtao.document.sitemap.rootNodes;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.url == url) return node.id;
            else {
                var hasChildren = (node.children && node.children.length > 0);
                if (hasChildren) {
                    var id = getPageIdByUrl(url, node.children);
                    if (id) return id;
                }
            }
        }
        return null;
    }

    function getFirstPageUrl(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.url) return node.url;
            else {
                var hasChildren = (node.children && node.children.length > 0);
                if (hasChildren) {
                    var url = getFirstPageUrl(node.children);
                    if (url) return url;
                }
            }
        }
        return null;
    }

    function closePlayer() {
        if ($ahmtao.page.location) window.location.href = $ahmtao.page.location;
        else {
            var pageFile = getInitialUrl();
            var currentLocation = window.location.toString();
            window.location.href = currentLocation.substr(0, currentLocation.lastIndexOf("/") + 1) + pageFile;
        }
    }

    function replaceHash(newHash) {
        var currentLocWithoutHash = window.location.toString().split('#')[0];

        // 注释加密 
        // 注释加密 
        if (typeof window.history.replaceState != 'undefined') {
            try {
                // 注释加密 
                // 注释加密 
                // 注释加密 
                window.history.replaceState(null, null, currentLocWithoutHash + newHash);
            } catch (ex) { }
        } else {
            window.location.replace(currentLocWithoutHash + newHash);
        }
    }

    function collapse() {
        if (IOS) {
            $('body').off('touchstart');
            $('body').off('touchend');
        }

        if ($ahmtao.player.isMobileMode()) {
            $('#mHideSidebar').hide();
            $('#nativeAppControlFrame').hide();
            $('#mobileBrowserControlFrame').hide();
        } else {
            $ahmtao.player.deleteVarFromCurrentUrlHash('g');
            $ahmtao.player.setVarInCurrentUrlHash('c', 1);
            if (!MOBILE_DEVICE) $('#maximizePanelContainer').show();
            lastLeftPanelWidth = $('.leftPanel').width();
            lastRightPanelWidth = $('.rightPanel').width();

            $('.leftPanel').hide();
            $('.rightPanel').hide();
            $('#topPanel').hide();

            $('.splitbar').hide();
            $('#mainPanel').width($(window).width());
            $('#clippingBounds').width($(window).width());
            $('#clippingBounds').css('left', '0px');
            $(window).resize();

            $(document).trigger('sidebarCollapse');
            $('#maximizeButton').addClass('rotated');
        }
    }

    // 注释加密 
    // 注释加密 
    var isShareApp = function () { return /ShareApp/.test(navigator.userAgent); }

    function expand() {
        if ($ahmtao.player.isMobileMode()) {
            $('#mHideSidebar').show();
            $('#mobileControlFrameContainer').show();
            isShareApp() ? $('#nativeAppControlFrame').show() : $('#mobileBrowserControlFrame').show();
        } else {
            $minimizeContainer = $('#interfaceControlFrameMinimizeContainer');
            $minimizeContainer.removeClass('collapseHovered');
            $ahmtao.player.deleteVarFromCurrentUrlHash('c');
            $('#maximizeButton').removeClass('rotated');
            $('#maximizePanelContainer').hide();
            $ahmtao.player.restorePlugins();
            $('#topPanel').show();
            $(window).resize();

            $(document).trigger('sidebarExpanded');
        }
    }


    function mainFrame_onload() {
        if ($ahmtao.page.pageName) document.title = $ahmtao.page.pageName;
    }

    function getQueryString(query) {
        var qstring = self.location.href.split("?");
        if (qstring.length < 2) return "";
        return GetParameter(qstring, query);
    }

    function GetParameter(qstring, query) {
        var prms = qstring[1].split("&");
        var frmelements = new Array();
        var currprmeter, querystr = "";

        for (var i = 0; i < prms.length; i++) {
            currprmeter = prms[i].split("=");
            frmelements[i] = new Array();
            frmelements[i][0] = currprmeter[0];
            frmelements[i][1] = currprmeter[1];
        }

        for (j = 0; j < frmelements.length; j++) {
            if (frmelements[j][0].toLowerCase() == query.toLowerCase()) {
                querystr = frmelements[j][1];
                break;
            }
        }
        return querystr;
    }
    
    function setHashStringVar(currentHash, varName, varVal) {
        var varWithEqual = varName + '=';
        var poundVarWithEqual = varVal === '' ? '' : '#' + varName + '=' + varVal;
        var ampVarWithEqual = varVal === '' ? '' : '&' + varName + '=' + varVal;
        var hashToSet = '';

        var pageIndex = currentHash.indexOf('#' + varWithEqual);
        if (pageIndex == -1) pageIndex = currentHash.indexOf('&' + varWithEqual);
        if (pageIndex != -1) {
            var newHash = currentHash.substring(0, pageIndex);

            newHash = newHash == '' ? poundVarWithEqual : newHash + ampVarWithEqual;

            var ampIndex = currentHash.indexOf('&', pageIndex + 1);
            if (ampIndex != -1) {
                newHash = newHash == '' ? '#' + currentHash.substring(ampIndex + 1) : newHash + currentHash.substring(ampIndex);
            }
            hashToSet = newHash;
        } else if (currentHash.indexOf('#') != -1) {
            hashToSet = currentHash + ampVarWithEqual;
        } else {
            hashToSet = poundVarWithEqual;
        }

        if (hashToSet != '' || varVal == '') {
            return hashToSet;
        }

        return null;
    }

    $ahmtao.player.setVarInCurrentUrlHash = function(varName, varVal) {
        var newHash = setHashStringVar(window.location.hash, varName, varVal);

        if (newHash != null) {
            replaceHash(newHash);
        }
    }

    function deleteHashStringVar(currentHash, varName) {
        var varWithEqual = varName + '=';

        var pageIndex = currentHash.indexOf('#' + varWithEqual);
        if (pageIndex == -1) pageIndex = currentHash.indexOf('&' + varWithEqual);
        if (pageIndex != -1) {
            var newHash = currentHash.substring(0, pageIndex);

            var ampIndex = currentHash.indexOf('&', pageIndex + 1);

            // 注释加密 
            // 注释加密 
            if (newHash == '') { // 注释加密 
                newHash = ampIndex != -1 ? '#' + currentHash.substring(ampIndex + 1) : '';
            } else { // 注释加密 
                newHash = newHash + (ampIndex != -1 ? currentHash.substring(ampIndex) : '');
            }

            return newHash;
        }

        return null;
    }

    $ahmtao.player.deleteVarFromCurrentUrlHash = function(varName) {
        var newHash = deleteHashStringVar(window.location.hash, varName);

        if (newHash != null) {
            replaceHash(newHash);
        }
    }

    function setUpController() {

        // 注释加密 

        var _page = {};
        $ahmtao.page = _page;

        $ahmtao.utils.makeBindable(_page, ['load']);

        var _player = function () {
        };
        $ahmtao.player = _player;

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        var _globalVars = {};

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        var _shouldSendVarsToServer = function () {
            // 注释加密 
            // 注释加密 
            try {
                var mainFrame = document.getElementById("mainFrame");
                return $ahmtao.shouldSendVarsToServer(mainFrame.contentWindow.location.href);
            } catch (e) {
                return $ahmtao.shouldSendVarsToServer();
            }
        };

        var _getLinkUrl = function (baseUrl) {
            var toAdd = '';
            for (var globalVarName in _globalVars) {
                var val = _globalVars[globalVarName];
                if (val != null) {
                    if (toAdd.length > 0) toAdd += '&';
                    toAdd += globalVarName + '=' + encodeURIComponent(val);
                }
            }
            return toAdd.length > 0 ? baseUrl + (_shouldSendVarsToServer() ? '?' : '#') + toAdd + "&CSUM=1" : baseUrl;
        };
        $ahmtao.getLinkUrlWithVars = _getLinkUrl;

        $ahmtao.messageCenter.addMessageListener(function (message, data) {
            if (message == 'setGlobalVar') {
                _globalVars[data.globalVarName] = data.globalVarValue;
            }
        });

        $ahmtao.messageCenter.addStateListener('page.data', function (key, value) {
            for (var subKey in value) {
                _page[subKey] = value[subKey];
            }
            $ahmtao.page.triggerEvent('load');
        });

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        _page.navigate = function (url, includeVariables) {
            var mainFrame = document.getElementById("mainFrame");
            // 注释加密 
            // 注释加密 
            var urlToLoad;
            if (url.indexOf(':') < 0 || url[0] == '/') {
                var winHref = window.location.href;
                var page = winHref.substring(0, winHref.lastIndexOf('/') + 1) + url;
                urlToLoad = page;
            } else {
                urlToLoad = url;
            }
            if (!includeVariables) {
                mainFrame.contentWindow.location.href = urlToLoad;
                return;
            }
            var urlWithVars = $ahmtao.getLinkUrlWithVars(urlToLoad);
            var currentData = $ahmtao.messageCenter.getState('page.data');
            var currentUrl = currentData && currentData.location;
            if (currentUrl && currentUrl.indexOf('#') != -1) currentUrl = currentUrl.substring(0, currentUrl.indexOf('#'))

            // 注释加密 
            // 注释加密 
            // 注释加密 
            mainFrame.contentWindow.location.href =
                currentUrl && urlToLoad.toLowerCase() != currentUrl.toLowerCase()
                    ? urlWithVars
                    : 'resources/reload.html#' + encodeURI(urlWithVars);

        };

        var pluginIds = [];
        var plugins = {};
        var currentVisibleHostId = {};
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        _player.createPluginHost = function (settings) {
            if (!settings.context || !(settings.context === 'project' || settings.context === 'inspect')) {
                // 注释加密 
                return false;
            }

            if (settings.id == 'feedbackHost')
                $('#overflowMenuContainer').prepend('<div id="showCommentsOption" class="showOption" style="order: 2"><div class="overflowOptionCheckbox"></div>Show Comments</div>');

            if (!settings.id) throw ('each plugin host needs an id');

            if (typeof PREVIEW_INFO === 'undefined') {
                // 注释加密 
                if (settings.id == 'debugHost') { return false; }
                if (settings.id == 'handoffHost') { $('#handoffControlFrameHeaderContainer').show(); }
            } else {
                // 注释加密 
                if (settings.id == 'handoffHost') { return false; }
            }

            pluginIds[pluginIds.length] = settings.id;
            plugins[settings.id] = settings;

            var hostContainerId = settings.context + 'ControlFrameHostContainer';
            hostContainerId = _player.isMobileMode() ? 'mHideSidebar' : 'outerContainer';
            var panelClass = 'rightPanel';
            var host;
            if (settings.context == 'project') {
                panelClass = 'leftPanel';
                if (_player.isMobileMode() && $('#' + hostContainerId).find('#projectOptionsHost').length > 0) {
                    host = $('<div id="' + settings.id + '" class="' + panelClass + '"></div>')
                        .insertAfter('#projectOptionsHost');
                } else {
                    host = $('<div id="' + settings.id + '" class="' + panelClass + '"></div>')
                        .prependTo('#' + hostContainerId);
                }
            } else {
                if (!$('#separatorContainer').hasClass('hasLeft')) $('#separatorContainer').addClass('hasLeft');
                host = $('<div id="' + settings.id + '" class="' + panelClass + '"></div>')
                    .appendTo('#' + hostContainerId);
            }

            $(('#' + settings.id)).click(function (e) { e.stopPropagation(); });

            var controlContainerId = getControlContainerId(settings.id);


            if (!_player.isMobileMode()) host.hide();
            else _player.updatePlugins();

            // 注释加密 
            var style = (IE || $ahmtao.browser.isEdge) ? '" style="border-radius: 0': '';
            var headerLink = $('<a pluginId="' + settings.id + '" title="' + settings.title + style + '" >' + (settings.context === 'inspect' ? ('<span>' + '</span>'): '&nbsp;') + '</a>');
            headerLink.mousedown($ahmtao.utils.curry(interfaceControlHeaderButton_click, settings.id)).wrap('<li id="' + settings.id + 'Btn"' + (settings.id == "handoffHost" ? ' style="display: none"' : '') + '>');

            headerLink.parent().appendTo('#' + controlContainerId);

            if (_player.isMobileMode()) $ahmtao.player.resizeContent();

            $(document).trigger('pluginCreated', [settings.gid]);
        };

        var getControlContainerId = function (id) {
            return plugins[id].context + 'ControlFrameHeader';
        }

        var getVisiblePlugins = function () {
            var ids = '';
            for (var id in plugins) {
                var context = plugins[id].context;
                if (currentVisibleHostId[context] == id) {
                    ids += plugins[id].gid;
                }
            }
            return ids;
        }

        _player.pluginVisibleChanged = function(hostId, visible) {
            if ($ahmtao.player.isCloud && plugins[hostId]) {
                $ahmtao.messageCenter.postMessage('pluginVisibleChanged', { id: hostId, gid: plugins[hostId].gid, visible: visible });
            }
        }

        var interfaceControlHeaderButton_click = function (id) {
            if (_player.isAnimating) { return; }
            $ahmtao.player.closePopup();

            var controlContainerId = getControlContainerId(id);
            var context = plugins[id].context;

            var clickedPlugin = $('#' + controlContainerId + ' a[pluginId=' + id + ']');
            if (currentVisibleHostId[context] == id) {
                clickedPlugin.removeClass('selected');
                if (id == "sitemapHost") { $('#sitemapControlFrameContainer').removeClass('selected'); }
                currentVisibleHostId[context] = -1;
                _player.collapseToBar(context, id);
                
                $(document).trigger('pluginShown', [getVisiblePlugins()]);
            } else {
                $('#' + controlContainerId + ' a').removeClass('selected');
                clickedPlugin.addClass('selected');
                if (id == "sitemapHost") { $('#sitemapControlFrameContainer').addClass('selected'); }

                $('#' + currentVisibleHostId[context]).hide();
                $ahmtao.player.pluginVisibleChanged(currentVisibleHostId[context], false);
                currentVisibleHostId[context] = id;
                _player.expandFromBar(id, context);

                $(document).trigger('pluginShown', [getVisiblePlugins()]);
            }
        };

        _player.pluginClose = function (id) {
            var controlContainerId = getControlContainerId(id);
            var context = plugins[id].context;

            var clickedPlugin = $('#' + controlContainerId + ' a[pluginId=' + id + ']');
            if (!clickedPlugin.hasClass('selected')) { return; }
            clickedPlugin.removeClass('selected');
            currentVisibleHostId[context] = -1;
            _player.collapseToBar(context, id);

            $(document).trigger('pluginShown', [getVisiblePlugins()]);
        };

        _player.showPlugin = function (gid) {
            for (var id in plugins) {
                if (plugins[id].gid == gid) {
                    interfaceControlHeaderButton_click(id);
                    break;
                }
            }
        };

        _player.restorePlugins = function () {
            var selectedPluginsCount = 0;
            for (var id in plugins) {
                var clickedPlugin = $('#' + getControlContainerId(id) + ' a[pluginId=' + id + ']');
                if (clickedPlugin.hasClass('selected')) selectedPluginsCount++;
            }
            if ($ahmtao.player.settings.isAxshare && selectedPluginsCount != 0) $('#clippingBoundsScrollContainer').hide();

            var selectedPluginsSeen = 0;
            for (var id in plugins) {
                var controlContainerId = getControlContainerId(id);
                var context = plugins[id].context;
                var clickedPlugin = $('#' + controlContainerId + ' a[pluginId=' + id + ']');
                if (clickedPlugin.hasClass('selected')) {
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    // 注释加密 
                    selectedPluginsSeen++;
                    _player.expandFromBar(id, context, selectedPluginsCount == selectedPluginsSeen);
                } else {
                    $('#' + id).hide();
                }
            }
            $(document).trigger('pluginShown', [getVisiblePlugins()]);
        };

    }


    $ahmtao.player.hideAllPlayerControllers = function(isVisible) {
        // 注释加密 
        if(isVisible) {
            $('#topPanel').css('display', '');
            $('#popupContainer').css('display', '');
            $('#maximizePanelContainer').css('display', '');        
            $('#mobileControlFrameContainer').css('display', '');
        } else {
            $('#topPanel').hide();
            $('#popupContainer').hide();
            $('#maximizePanelContainer').hide();        // 注释加密 
            $('#mobileControlFrameContainer').hide();
        }
    }


    // 注释加密 
    $ahmtao.player.addDeviceFraming = function (project, isEdit) {
        // 注释加密 
        var devices = {
            iPhone8: 0,
            iPhone8Plus: 1,
            iPhoneSE: 2,
            iPhoneX: 3,
            iPad4: 4,
            GalaxyS8: 5,
            Pixel2: 6,
            Pixel2XL: 7,
            Mobile: 8,
            Tablet9: 9,
            Tablet7: 10,
            Custom: 11,
            Web: 12
        };

        // 注释加密 
        if (!$ahmtao.player.settings.isExpo || project.Platform.Device === 12) { return; }

        // 注释加密 
        // 注释加密 
        var currDevice = project.Platform.Device;
        var rootPath = '../../Scripts/Expo/StaticContent/resources/images/mobile/';
        var framePath, overlayPath;

        var $overlayParent = $(window.parent.parent.document).find('#previewPlayerDiv');
        $overlayParent = isEdit && $overlayParent.length !== 0 ? $overlayParent : $('#mainPanelContainer');

        $overlayParent.css('overflow', 'visible');

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 


        // 注释加密 
        switch (currDevice) {
            case devices.iPhone8:
            case devices.iPhone8Plus:
                framePath = rootPath + 'iphone.svg';
                overlayPath = "";
                break;
            case devices.iPhoneSE:
                break;
            case devices.iPhoneX:
                framePath = "";
                overlayPath = "";
                break;
            case devices.iPad4:
                break;
            case devices.Pixel2:
                break;
            case devices.Pixel2XL:
                break;
            case devices.GalaxyS8:
                break;
            case devices.Mobile:
            case devices.Tablet7:
            case devices.Tablet9:
            case devices.Custom:
            default:
                break;
        }

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 
        if (framePath != undefined) {
            $overlayParent.prepend(genFrameContainer());

            var $fContainer = $overlayParent.find('#deviceFrameContainer');
            var $frame = $fContainer.find('#deviceFrame');

            $frame.css('background-image', "url('" + framePath + "')");
            $frame.css('height', '');
            $frame.css('width', '');
            $frame.css('top', '');
            $frame.css('left', '');

            if(isEdit) {
                $fContainer.css('z-index', -1);
            }
        }

        if (overlayPath != undefined) {
            // 注释加密 
            // 注释加密 

            var $oContainer = $overlayParent.find('#deviceOverlayContainer');
            var $overlay = $oContainer.find('#deviceOverlay');

            $overlay.css('background-image', "url('" + overlayPath + "')");
        }
    }

    function genFrameContainer(bezelPath) {
        var container = [
            '<div id="deviceFrameContainer">',
            '   <div id="deviceFrame">',
            '   </div>',
            '</div>'
        ].join("");

        return container;
    }

})();
