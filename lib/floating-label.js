(function($){
  var defaults = {
    inputEvents: 'propertychange keyup input paste'
  };

  function floatingLabel(el, options) {
    this.options = $.extend(defaults, options);
    this.el = $(el);

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

    if(val === '') {
      this.el.removeClass('floatingLabel-inactive');
      this.el.addClass('floatingLabel-active');
    } else {
      this.el.removeClass('floatingLabel-active');
      this.el.addClass('floatingLabel-inactive');
    }
  };

  floatingLabel.prototype.onBlur = function(event) {
    this.label.removeClass('floatingLabel-focus');
  };

  floatingLabel.prototype.onFocus = function(event) {
    this.label.addClass('floatingLabel-focus');
  };

  floatingLabel.prototype.generateLabel = function() {
    this.label = $('<label/>');

    if(this.el.attr('id') !== '') {
      this.label.attr('for', this.el.attr('id'));
    }

    this.label.text(this.el.data('floating-label'));

    this.label.insertBefore(this.el);
  };

  $.fn.floatingLabel = function(options) {
    return this.each(function(){
      new floatingLabel(this, options);
    });
  };
}(jQuery));