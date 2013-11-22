(function($){
  var defaults = {
    inputEvents: 'propertychange keyup input paste change',
    labelStyles: {
      display: 'block',
      position: 'relative'
    },
    animateDuration: 100,
    animateEasing: function (x, t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
  };

  function floatingLabel(el, options) {
    this.options = $.extend(defaults, options);
    this.el = $(el);

    this.active = false;

    this.generateLabel();
    this.bindInputEvents();

    // Starts everything off all nice
    this.el.trigger('keyup');
  }

  floatingLabel.prototype.bindInputEvents = function() {
    this.el.on(this.options.inputEvents, $.proxy(this.onInput, this));
    this.el.on('blur', $.proxy(this.onBlur, this));
    this.el.on('focus', $.proxy(this.onFocus, this));
  };

  floatingLabel.prototype.onInput = function(event) {
    var val = this.el.val();

    if(this.oldVal === val) return;

    this.oldVal = val;

    if(val === '' || val === null) {
      if(!this.active) {
        this.active = true;
        this.el.addClass('floatingLabel-inactive').removeClass('floatingLabel-active');
        this.label.stop(true, true).animate({
          opacity: 0,
          bottom: -this.label.outerHeight()
        }, this.animateDuration, this.animateEasing);
      }
    } else {
      if(this.active) {
        this.active = false;
        this.el.addClass('floatingLabel-active').removeClass('floatingLabel-inactive');
        this.label.stop(true, true).animate({
          opacity: 1,
          bottom: 0
        }, this.animateDuration, this.animateEasing);
      }
    }
  };

  floatingLabel.prototype.onBlur = function(event) {
    this.label.removeClass('floatingLabel-focus');
  };

  floatingLabel.prototype.onFocus = function(event) {
    this.label.addClass('floatingLabel-focus');
  };

  floatingLabel.prototype.generateLabel = function() {
    var existingLabel = '';
    var labelText = '';

    this.label = $('<label/>');

    // Check if there's already a label. Don't want to double up!

    if(this.el.attr('id') !== '') {    
      existingLabel = $('label[for="' + this.el.attr('id') + '"]');

      if(existingLabel.length) {
        this.label = existingLabel;
      } else {
        this.label.attr('for', this.el.attr('id'));
      }
    }

    if(this.el.is('select') && !labelText) {
      labelText = this.el.find('option').first().text();
    } else {
      labelText = this.el.attr('placeholder');
    }

    this.label.text(labelText);
    this.label.css(this.options.labelStyles);

    this.label.insertBefore(this.el);

    this.label.css({
      opacity: 0,
      bottom: -this.label.outerHeight()
    });
  };

  $.fn.floatingLabel = function(options) {
    return this.each(function(){
      new floatingLabel(this, options);
    });
  };
}(jQuery));