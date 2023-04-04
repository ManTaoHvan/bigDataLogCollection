/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
 // 注释加密 
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

/* AdminLTE
 *
 * @注释加密 
 * @注释加密 
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  // 注释加密 
  // 注释加密 
  // 注释加密 
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", // 注释加密 
  navbarMenuHeight: "200px", // 注释加密 
  // 注释加密 
  // 注释加密 
  // 注释加密 
  animationSpeed: 200,
  // 注释加密 
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  // 注释加密 
  sidebarPushMenu: true,
  // 注释加密 
  sidebarSlimScroll: true,
  // 注释加密 
  // 注释加密 
  // 注释加密 
  sidebarExpandOnHover: false,
  // 注释加密 
  enableBoxRefresh: true,
  // 注释加密 
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  // 注释加密 
  // 注释加密 
  // 注释加密 
  // 注释加密 
  enableFastclick: true,
  // 注释加密 
  enableControlSidebar: true,
  controlSidebarOptions: {
    // 注释加密 
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    // 注释加密 
    selector: ".control-sidebar",
    // 注释加密 
    slide: true
  },
  // 注释加密 
  // 注释加密 
  enableBoxWidget: true,
  // 注释加密 
  boxWidgetOptions: {
    boxWidgetIcons: {
      // 注释加密 
      collapse: 'fa-minus',
      // 注释加密 
      open: 'fa-plus',
      // 注释加密 
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      // 注释加密 
      remove: '[data-widget="remove"]',
      // 注释加密 
      collapse: '[data-widget="collapse"]'
    }
  },
  // 注释加密 
  directChat: {
    // 注释加密 
    enable: true,
    // 注释加密 
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  // 注释加密 
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  // 注释加密 
  // 注释加密 
  // 注释加密 
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
  "use strict";

  // 注释加密 
  $("body").removeClass("hold-transition");

  // 注释加密 
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
            $.AdminLTE.options,
            AdminLTEOptions);
  }

  // 注释加密 
  var o = $.AdminLTE.options;

  // 注释加密 
  _init();

  // 注释加密 
  $.AdminLTE.layout.activate();

  // 注释加密 
  $.AdminLTE.tree('.sidebar');

  // 注释加密 
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  // 注释加密 
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  // 注释加密 
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  // 注释加密 
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector
    });
  }

  // 注释加密 
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  // 注释加密 
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  // 注释加密 
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });

  });
});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @注释加密 
   * @注释加密 
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      // 注释加密 
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height();
      // 注释加密 
      // 注释加密 
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        // 注释加密 
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      // 注释加密 
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      // 注释加密 
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          // 注释加密 
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          // 注释加密 
          $(".sidebar").slimscroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @注释加密 
   * @注释加密 
   */
  $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      // 注释加密 
      var screenSizes = $.AdminLTE.options.screenSizes;

      // 注释加密 
      $(toggleBtn).on('click', function (e) {
        e.preventDefault();
        // 注释加密 
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            localStorage.setItem('collapse',false);
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
             localStorage.setItem('collapse',true);
          }
        }
        // 注释加密 
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
          }
        }
      });

      $(".content-wrapper").click(function () {
        // 注释加密 
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      // 注释加密 
      if ($.AdminLTE.options.sidebarExpandOnHover
              || ($('body').hasClass('fixed')
                      && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function () {
      var _this = this;
      var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      // 注释加密 
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
                && $("body").hasClass('sidebar-collapse')
                && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
                && $('body').hasClass('sidebar-expanded-on-hover')
                && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @注释加密 
   * @注释加密 
   */
  $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(document).on('click', menu + ' li a', function (e) {
      // 注释加密 
      var $this = $(this);
      var checkElement = $this.next();
     
      // 注释加密 
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
        // 注释加密 
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          // 注释加密 
          // 注释加密 
        });
        checkElement.parent("li").removeClass("active");
      }
      // 注释加密 
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        // 注释加密 
        var parent = $this.parents('ul').first();
        // 注释加密 
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        // 注释加密 
        ul.removeClass('menu-open');
        // 注释加密 
        var parent_li = $this.parent("li");

        // 注释加密 
        checkElement.slideDown(animationSpeed, function () {
          // 注释加密 
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          // 注释加密 
          _this.layout.fix();
        });
      }
      // 注释加密 
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @注释加密 
   * @注释加密 
   */
  $.AdminLTE.controlSidebar = {
    // 注释加密 
    activate: function () {
      // 注释加密 
      var _this = this;
      // 注释加密 
      var o = $.AdminLTE.options.controlSidebarOptions;
      // 注释加密 
      var sidebar = $(o.selector);
      // 注释加密 
      var btn = $(o.toggleBtnSelector);

      // 注释加密 
      btn.on('click', function (e) {
        e.preventDefault();
        // 注释加密 
        if (!sidebar.hasClass('control-sidebar-open')
                && !$('body').hasClass('control-sidebar-open')) {
          // 注释加密 
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      // 注释加密 
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      // 注释加密 
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        // 注释加密 
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    // 注释加密 
    open: function (sidebar, slide) {
      // 注释加密 
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        // 注释加密 
        // 注释加密 
        $('body').addClass('control-sidebar-open');
      }
    },
    // 注释加密 
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        $(window).resize(function () {
          _this._fix(sidebar);
        });
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @注释加密 
   * @注释加密 
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // 注释加密 
      }
      // 注释加密 
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      // 注释加密 
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      // 注释加密 
      var box = element.parents(".box").first();
      // 注释加密 
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        // 注释加密 
        element.children(":first")
                .removeClass(_this.icons.collapse)
                .addClass(_this.icons.open);
        // 注释加密 
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        // 注释加密 
        element.children(":first")
                .removeClass(_this.icons.open)
                .addClass(_this.icons.collapse);
        // 注释加密 
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      // 注释加密 
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
  
  var collapse = localStorage.getItem("collapse");
  if(collapse && collapse=='true'){
  	 $("body").addClass('sidebar-collapse');
  }
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @注释加密 
 * @注释加密 
 */
(function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // 注释加密 
    var settings = $.extend({
      // 注释加密 
      trigger: ".refresh-btn",
      // 注释加密 
      source: "",
      // 注释加密 
      onLoadStart: function (box) {
        return box;
      }, // 注释加密 
      onLoadDone: function (box) {
        return box;
      } // 注释加密 

    }, options);

    // 注释加密 
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      // 注释加密 
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      // 注释加密 
      var box = $(this);
      // 注释加密 
      var rBtn = box.find(settings.trigger).first();

      // 注释加密 
      rBtn.on('click', function (e) {
        e.preventDefault();
        // 注释加密 
        start(box);

        // 注释加密 
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      // 注释加密 
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      // 注释加密 
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

/*
 * EXPLICIT BOX ACTIVATION
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded.
 *
 * @注释加密 
 * @注释加密 
 */
(function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @注释加密 
 * @注释加密 
 */
(function ($) {

  'use strict';

  $.fn.todolist = function (options) {
    // 注释加密 
    var settings = $.extend({
      // 注释加密 
      onCheck: function (ele) {
        return ele;
      },
      // 注释加密 
      onUncheck: function (ele) {
        return ele;
      }
    }, options);

    return this.each(function () {

      if (typeof $.fn.iCheck != 'undefined') {
        $('input', this).on('ifChecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          if ($('input', ele).is(":checked")) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));