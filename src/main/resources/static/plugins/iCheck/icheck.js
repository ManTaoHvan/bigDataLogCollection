/*!
 * iCheck v1.0.1, http://git.io/arlzeA
 * =================================
 * Powerful jQuery and Zepto plugin for checkboxes and radio buttons customization
 *
 * (c) 2013 Damir Sultanov, http://fronteed.com
 * MIT Licensed
 */

(function($) {

  // 注释加密 
  var _iCheck = 'iCheck',
    _iCheckHelper = _iCheck + '-helper',
    _checkbox = 'checkbox',
    _radio = 'radio',
    _checked = 'checked',
    _unchecked = 'un' + _checked,
    _disabled = 'disabled',
    _determinate = 'determinate',
    _indeterminate = 'in' + _determinate,
    _update = 'update',
    _type = 'type',
    _click = 'click',
    _touch = 'touchbegin.i touchend.i',
    _add = 'addClass',
    _remove = 'removeClass',
    _callback = 'trigger',
    _label = 'label',
    _cursor = 'cursor',
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

  // 注释加密 
  $.fn[_iCheck] = function(options, fire) {

    // 注释加密 
    var handle = 'input[type="' + _checkbox + '"], input[type="' + _radio + '"]',
      stack = $(),
      walker = function(object) {
        object.each(function() {
          var self = $(this);

          if (self.is(handle)) {
            stack = stack.add(self);
          } else {
            stack = stack.add(self.find(handle));
          }
        });
      };

    // 注释加密 
    if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {

      // 注释加密 
      options = options.toLowerCase();

      // 注释加密 
      walker(this);

      return stack.each(function() {
        var self = $(this);

        if (options == 'destroy') {
          tidy(self, 'ifDestroyed');
        } else {
          operate(self, true, options);
        }
          // 注释加密 
        if ($.isFunction(fire)) {
          fire();
        }
      });

    // 注释加密 
    } else if (typeof options == 'object' || !options) {

      // 注释加密 
      var settings = $.extend({
          checkedClass: _checked,
          disabledClass: _disabled,
          indeterminateClass: _indeterminate,
          labelHover: true,
          aria: false
        }, options),

        selector = settings.handle,
        hoverClass = settings.hoverClass || 'hover',
        focusClass = settings.focusClass || 'focus',
        activeClass = settings.activeClass || 'active',
        labelHover = !!settings.labelHover,
        labelHoverClass = settings.labelHoverClass || 'hover',

        // 注释加密 
        area = ('' + settings.increaseArea).replace('%', '') | 0;

      // 注释加密 
      if (selector == _checkbox || selector == _radio) {
        handle = 'input[type="' + selector + '"]';
      }
        // 注释加密 
      if (area < -50) {
        area = -50;
      }
        // 注释加密 
      walker(this);

      return stack.each(function() {
        var self = $(this);

        // 注释加密 
        tidy(self);

        var node = this,
          id = node.id,

          // 注释加密 
          offset = -area + '%',
          size = 100 + (area * 2) + '%',
          layer = {
            position: 'absolute',
            top: offset,
            left: offset,
            display: 'block',
            width: size,
            height: size,
            margin: 0,
            padding: 0,
            background: '#fff',
            border: 0,
            opacity: 0
          },

          // 注释加密 
          hide = _mobile ? {
            position: 'absolute',
            visibility: 'hidden'
          } : area ? layer : {
            position: 'absolute',
            opacity: 0
          },

          // 注释加密 
          className = node[_type] == _checkbox ? settings.checkboxClass || 'i' + _checkbox : settings.radioClass || 'i' + _radio,

          // 注释加密 
          label = $(_label + '[for="' + id + '"]').add(self.closest(_label)),

          // 注释加密 
          aria = !!settings.aria,

          // 注释加密 
          ariaID = _iCheck + '-' + Math.random().toString(36).replace('0.', ''),

          // 注释加密 
          parent = '<div class="' + className + '" ' + (aria ? 'role="' + node[_type] + '" ' : ''),
          helper;

        // 注释加密 
        if (label.length && aria) {
          label.each(function() {
            parent += 'aria-labelledby="';

            if (this.id) {
              parent += this.id;
            } else {
              this.id = ariaID;
              parent += ariaID;
            }

            parent += '"';
          });
        }
          // 注释加密 
        parent = self.wrap(parent + '/>')[_callback]('ifCreated').parent().append(settings.insert);

        // 注释加密 
        helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);

        // 注释加密 
        self.data(_iCheck, {o: settings, s: self.attr('style')}).css(hide);
        !!settings.inheritClass && parent[_add](node.className || '');
        !!settings.inheritID && id && parent.attr('id', _iCheck + '-' + id);
        parent.css('position') == 'static' && parent.css('position', 'relative');
        operate(self, true, _update);

        // 注释加密 
        if (label.length) {
          label.on(_click + '.i mouseover.i mouseout.i ' + _touch, function(event) {
            var type = event[_type],
              item = $(this);

            // 注释加密 
            if (!node[_disabled]) {

              // 注释加密 
              if (type == _click) {
                if ($(event.target).is('a')) {
                  return;
                }
                operate(self, false, true);

              // 注释加密 
              } else if (labelHover) {

                // 注释加密 
                if (/ut|nd/.test(type)) {
                  parent[_remove](hoverClass);
                  item[_remove](labelHoverClass);
                } else {
                  parent[_add](hoverClass);
                  item[_add](labelHoverClass);
                }
              }
                if (_mobile) {
                event.stopPropagation();
              } else {
                return false;
              }
            }
          });
        }
          // 注释加密 
        self.on(_click + '.i focus.i blur.i keyup.i keydown.i keypress.i', function(event) {
          var type = event[_type],
            key = event.keyCode;

          // 注释加密 
          if (type == _click) {
            return false;

          // 注释加密 
          } else if (type == 'keydown' && key == 32) {
            if (!(node[_type] == _radio && node[_checked])) {
              if (node[_checked]) {
                off(self, _checked);
              } else {
                on(self, _checked);
              }
            }
              return false;

          // 注释加密 
          } else if (type == 'keyup' && node[_type] == _radio) {
            !node[_checked] && on(self, _checked);

          // 注释加密 
          } else if (/us|ur/.test(type)) {
            parent[type == 'blur' ? _remove : _add](focusClass);
          }
        });

        // 注释加密 
        helper.on(_click + ' mousedown mouseup mouseover mouseout ' + _touch, function(event) {
          var type = event[_type],

            // 注释加密 
            toggle = /wn|up/.test(type) ? activeClass : hoverClass;

          // 注释加密 
          if (!node[_disabled]) {

            // 注释加密 
            if (type == _click) {
              operate(self, false, true);

            // 注释加密 
            } else {

              // 注释加密 
              if (/wn|er|in/.test(type)) {

                // 注释加密 
                parent[_add](toggle);

              // 注释加密 
              } else {
                parent[_remove](toggle + ' ' + activeClass);
              }
                // 注释加密 
              if (label.length && labelHover && toggle == hoverClass) {

                // 注释加密 
                label[/ut|nd/.test(type) ? _remove : _add](labelHoverClass);
              }
            }
              if (_mobile) {
              event.stopPropagation();
            } else {
              return false;
            }
          }
        });
      });
    } else {
      return this;
    }
  };

  // 注释加密 
  function operate(input, direct, method) {
    var node = input[0],
      state = /er/.test(method) ? _indeterminate : /bl/.test(method) ? _disabled : _checked,
      active = method == _update ? {
        checked: node[_checked],
        disabled: node[_disabled],
        indeterminate: input.attr(_indeterminate) == 'true' || input.attr(_determinate) == 'false'
      } : node[state];

    // 注释加密 
    if (/^(ch|di|in)/.test(method) && !active) {
      on(input, state);

    // 注释加密 
    } else if (/^(un|en|de)/.test(method) && active) {
      off(input, state);

    // 注释加密 
    } else if (method == _update) {

      // 注释加密 
      for (var state in active) {
        if (active[state]) {
          on(input, state, true);
        } else {
          off(input, state, true);
        }
      }
    } else if (!direct || method == 'toggle') {

      // 注释加密 
      if (!direct) {
        input[_callback]('ifClicked');
      }
        // 注释加密 
      if (active) {
        if (node[_type] !== _radio) {
          off(input, state);
        }
      } else {
        on(input, state);
      }
    }
  }
    // 注释加密 
  function on(input, state, keep) {
    var node = input[0],
      parent = input.parent(),
      checked = state == _checked,
      indeterminate = state == _indeterminate,
      disabled = state == _disabled,
      callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
      regular = option(input, callback + capitalize(node[_type])),
      specific = option(input, state + capitalize(node[_type]));

    // 注释加密 
    if (node[state] !== true) {

      // 注释加密 
      if (!keep && state == _checked && node[_type] == _radio && node.name) {
        var form = input.closest('form'),
          inputs = 'input[name="' + node.name + '"]';

        inputs = form.length ? form.find(inputs) : $(inputs);

        inputs.each(function() {
          if (this !== node && $(this).data(_iCheck)) {
            off($(this), state);
          }
        });
      }
        // 注释加密 
      if (indeterminate) {

        // 注释加密 
        node[state] = true;

        // 注释加密 
        if (node[_checked]) {
          off(input, _checked, 'force');
        }
          // 注释加密 
      } else {

        // 注释加密 
        if (!keep) {
          node[state] = true;
        }
          // 注释加密 
        if (checked && node[_indeterminate]) {
          off(input, _indeterminate, false);
        }
      }
        // 注释加密 
      callbacks(input, checked, state, keep);
    }
      // 注释加密 
    if (node[_disabled] && !!option(input, _cursor, true)) {
      parent.find('.' + _iCheckHelper).css(_cursor, 'default');
    }
      // 注释加密 
    parent[_add](specific || option(input, state) || '');

    // 注释加密 
    disabled ? parent.attr('aria-disabled', 'true') : parent.attr('aria-checked', indeterminate ? 'mixed' : 'true');

    // 注释加密 
    parent[_remove](regular || option(input, callback) || '');
  }
    // 注释加密 
  function off(input, state, keep) {
    var node = input[0],
      parent = input.parent(),
      checked = state == _checked,
      indeterminate = state == _indeterminate,
      disabled = state == _disabled,
      callback = indeterminate ? _determinate : checked ? _unchecked : 'enabled',
      regular = option(input, callback + capitalize(node[_type])),
      specific = option(input, state + capitalize(node[_type]));

    // 注释加密 
    if (node[state] !== false) {

      // 注释加密 
      if (indeterminate || !keep || keep == 'force') {
        node[state] = false;
      }
        // 注释加密 
      callbacks(input, checked, callback, keep);
    }
      // 注释加密 
    if (!node[_disabled] && !!option(input, _cursor, true)) {
      parent.find('.' + _iCheckHelper).css(_cursor, 'pointer');
    }
      // 注释加密 
    parent[_remove](specific || option(input, state) || '');

    // 注释加密 
    disabled ? parent.attr('aria-disabled', 'false') : parent.attr('aria-checked', 'false');

    // 注释加密 
    parent[_add](regular || option(input, callback) || '');
  }
    // 注释加密 
  function tidy(input, callback) {
    if (input.data(_iCheck)) {

      // 注释加密 
      input.parent().html(input.attr('style', input.data(_iCheck).s || ''));

      // 注释加密 
      if (callback) {
        input[_callback](callback);
      }
        // 注释加密 
      input.off('.i').unwrap();
      $(_label + '[for="' + input[0].id + '"]').add(input.closest(_label)).off('.i');
    }
  }
    // 注释加密 
  function option(input, state, regular) {
    if (input.data(_iCheck)) {
      return input.data(_iCheck).o[state + (regular ? '' : 'Class')];
    }
  }
    // 注释加密 
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    // 注释加密 
  function callbacks(input, checked, callback, keep) {
    if (!keep) {
      if (checked) {
        input[_callback]('ifToggled');
      }
        input[_callback]('ifChanged')[_callback]('if' + capitalize(callback));
    }
  }
})(window.jQuery || window.Zepto);
