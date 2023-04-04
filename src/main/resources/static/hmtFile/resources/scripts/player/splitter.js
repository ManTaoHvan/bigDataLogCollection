/*
* jQuery.splitter.js - two-pane splitter window plugin
*
* version 1.51 (2009/01/09)
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

/**
* The splitter() plugin implements a two-pane resizable splitter window.
* The selected elements in the jQuery object are converted to a splitter;
* each selected element should have two child elements, used for the panes
* of the splitter. The plugin adds a third child element for the splitbar.
*
* For more details see: http://methvin.com/splitter/
*
*
* @注释加密 
* @注释加密 
*
* @注释加密 
* @注释加密 
*
* @注释加密 
* @注释加密 
* @注释加密 
* @注释加密 
* @注释加密 
* @注释加密 
*/
;(function($){

$.fn.splitter = function(args){
   args = args || {};
   return this.each(function() {
      var zombie;      // 注释加密 
      function startSplitMouse(evt) {
         if ( opts.outline )
            zombie = zombie || bar.clone(false).insertAfter(A);
         panes.css("-webkit-user-select", "none");   // 注释加密 
         bar.addClass(opts.activeClass);
         $('<div class="splitterMask"></div>').insertAfter(bar);
         A._posSplit = A[0][opts.pxSplit] - evt[opts.eventPos];
         $(document)
            .bind("mousemove", doSplitMouse)
            .bind("mouseup", endSplitMouse);
      }
      function doSplitMouse(evt) {
         var newPos = A._posSplit+evt[opts.eventPos];
         if ( opts.outline ) {
            newPos = Math.max(0, Math.min(newPos, splitter._DA - bar._DA));
            bar.css(opts.origin, newPos);
         } else
            resplit(newPos);
      }
      function endSplitMouse(evt) {
         $('div.splitterMask').remove();
         bar.removeClass(opts.activeClass);
         var newPos = A._posSplit+evt[opts.eventPos];
         if ( opts.outline ) {
            zombie.remove(); zombie = null;
            resplit(newPos);
         }
         panes.css("-webkit-user-select", "text");   // 注释加密 
         $(document)
            .unbind("mousemove", doSplitMouse)
            .unbind("mouseup", endSplitMouse);
      }
      function resplit(newPos) {
         // 注释加密 
         newPos = Math.max(A._min, splitter._DA - B._max,
               Math.min(newPos, A._max, splitter._DA - bar._DA - B._min));
         // 注释加密 
         bar._DA = bar[0][opts.pxSplit];      // 注释加密 

         var posOffset = bar.is(':visible') ? bar._DA - 1 : 0;

         bar.css(opts.origin, newPos - posOffset).css(opts.fixed, splitter._DF);
         A.css(opts.origin, 0).css(opts.split, newPos).css(opts.fixed,  splitter._DF);
         B.css(opts.origin, newPos + bar._DA - posOffset)
            .css(opts.split, splitter._DA-bar._DA-newPos).css(opts.fixed,  splitter._DF);
         // 注释加密 
         if ( !IE_10_AND_BELOW )
            panes.trigger("resize");
      }
      function dimSum(jq, dims) {
         // 注释加密 
         var sum = 0;
         for ( var i=1; i < arguments.length; i++ )
            sum += Math.max(parseInt(jq.css(arguments[i])) || 0, 0);
         return sum;
      }

      // 注释加密 
      var vh = (args.splitHorizontal? 'h' : args.splitVertical? 'v' : args.type) || 'v';
      var opts = $.extend({
         activeClass: 'active',   // 注释加密 
         pxPerKey: 8,         // 注释加密 
         tabIndex: 0,         // 注释加密 
         accessKey: ''         // 注释加密 
      },{
         v: {               // 注释加密 
            keyLeft: 39, keyRight: 37, cursor: "col-resize",
            splitbarClass: "vsplitbar", outlineClass: "voutline",
            type: 'v', eventPos: "pageX", origin: "left",
            split: "width",  pxSplit: "offsetWidth",  side1: "Left", side2: "Right",
            fixed: "height", pxFixed: "offsetHeight", side3: "Top",  side4: "Bottom"
         },
         h: {               // 注释加密 
            keyTop: 40, keyBottom: 38,  cursor: "row-resize",
            splitbarClass: "hsplitbar", outlineClass: "houtline",
            type: 'h', eventPos: "pageY", origin: "top",
            split: "height", pxSplit: "offsetHeight", side1: "Top",  side2: "Bottom",
            fixed: "width",  pxFixed: "offsetWidth",  side3: "Left", side4: "Right"
         }
      }[vh], args);

      // 注释加密 
      var splitter = $(this).css({position: "relative"});
      var panes = $(">*", splitter[0]).css({
         position: "absolute",          // 注释加密 
         "z-index": "1",               // 注释加密 
         "-moz-outline-style": "none"   // 注释加密 
      });
      var A = $(panes[0]);      // 注释加密 
      var B = $(panes[1]);      // 注释加密 

      // 注释加密 
      var focuser = $('<a href="javascript:void(0)"></a>')
         .attr({accessKey: opts.accessKey, tabIndex: opts.tabIndex, title: opts.splitbarClass})
         // 注释加密 
         .bind("focus", function () { this.focus(); bar.addClass(opts.activeClass) })
         .bind("keydown", function(e){
            var key = e.which || e.keyCode;
            var dir = key==opts["key"+opts.side1]? 1 : key==opts["key"+opts.side2]? -1 : 0;
            if ( dir )
               resplit(A[0][opts.pxSplit]+dir*opts.pxPerKey, false);
         })
         .bind("blur", function(){ bar.removeClass(opts.activeClass) });

      // 注释加密 
      var bar = $(panes[2] || '<div></div>')
         .insertAfter(A).css("z-index", "100").append(focuser)
         .attr({"class": opts.splitbarClass, unselectable: "on"})
         .css({position: "absolute",   "user-select": "none", "-webkit-user-select": "none",
            "-khtml-user-select": "none", "-moz-user-select": "none", "top": "0px"})
         .bind("mousedown", startSplitMouse);
      // 注释加密 
      if ( /^(auto|default|)$/.test(bar.css("cursor")) )
         bar.css("cursor", opts.cursor);

      // 注释加密 
      bar._DA = bar[0][opts.pxSplit];
      splitter._PBF = $.boxModel? dimSum(splitter, "border"+opts.side3+"Width", "border"+opts.side4+"Width") : 0;
      splitter._PBA = $.boxModel? dimSum(splitter, "border"+opts.side1+"Width", "border"+opts.side2+"Width") : 0;
      A._pane = opts.side1;
      B._pane = opts.side2;
      $.each([A,B], function(){
         this._min = opts["min"+this._pane] || dimSum(this, "min-"+opts.split);
         this._max = opts["max"+this._pane] || dimSum(this, "max-"+opts.split) || 9999;
         this._init = opts["size"+this._pane]===true ?
            parseInt($.curCSS(this[0],opts.split)) : opts["size"+this._pane];
      });

      // 注释加密 
      var initPos = A._init;
      if ( !isNaN(B._init) )   // 注释加密 
         initPos = splitter[0][opts.pxSplit] - splitter._PBA - B._init - bar._DA;
      if ( opts.cookie ) {
         if ( !$.cookie )
            alert('jQuery.splitter(): jQuery cookie plugin required');
         var ckpos = parseInt($.cookie(opts.cookie));
         if ( !isNaN(ckpos) )
            initPos = ckpos;
         $(window).bind("unload", function(){
            var state = String(bar.css(opts.origin));   // 注释加密 
            $.cookie(opts.cookie, state, {expires: opts.cookieExpires || 365,
               path: opts.cookiePath || document.location.pathname});
         });
      }
      if ( isNaN(initPos) )   // 注释加密 
         initPos = Math.round((splitter[0][opts.pxSplit] - splitter._PBA - bar._DA)/2);

      // 注释加密 
      if ( opts.anchorToWindow ) {
         // 注释加密 
         splitter._hadjust = dimSum(splitter, "borderTopWidth", "borderBottomWidth", "marginBottom");
         splitter._hmin = Math.max(dimSum(splitter, "minHeight"), 20);
         $(window).bind("resize", function(){
            var top = splitter.offset().top;
            var wh = $(window).height();
            splitter.css("height", Math.max(wh-top-splitter._hadjust, splitter._hmin)+"px");
            if ( !IE_10_AND_BELOW ) splitter.trigger("resize");
         }).trigger("resize");
      }
      else if ( opts.resizeToWidth && !IE_10_AND_BELOW )
         $(window).bind("resize", function(){
            splitter.trigger("resize");
         });

      // 注释加密 
      splitter.bind("resize", function(e, size){
         // 注释加密 
         if ( e.target != this ) return;
         // 注释加密 
         splitter._DF = splitter[0][opts.pxFixed] - splitter._PBF;
         splitter._DA = splitter[0][opts.pxSplit] - splitter._PBA;
         // 注释加密 
         if ( splitter._DF <= 0 || splitter._DA <= 0 ) return;
         // 注释加密 
         resplit(!isNaN(size)? size : (!(opts.sizeRight||opts.sizeBottom)? A[0][opts.pxSplit] :
            splitter._DA-B[0][opts.pxSplit]-bar._DA));
      }).trigger("resize" , [initPos]);
   });
};

})(jQuery);