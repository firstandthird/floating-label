suite('floating-label', function() {

  teardown(function(){
    $('[data-floating-label]').attr('class', '').removeData();
    $('label').remove();
  });

  suite('init', function() {
    test('should have floatingLabel function', function() {
      assert.equal(typeof $.fn.floatingLabel, 'function');
    });
  });

  suite('labels', function() {
    setup(function(){
      $('[data-floating-label]').floatingLabel();
    });

    test('should be rendered', function() {
      assert.equal($('label').length, $('[data-floating-label]').length);
    });

    test('should have for="" matching input id', function() {
      assert.equal($('label').first().attr('for'), $('[data-floating-label]').first().attr('id'));
    });

    test('should have focus class when input is in focus', function() {
      $('[data-floating-label]').first().trigger('focus');
      assert.ok($('label[for="' + $('[data-floating-label]').first().attr('id') + '"]').hasClass('floatingLabel-focus'));
    });

    test('should not have focus class when input is not in focus', function() {
      $('[data-floating-label]').first().trigger('focus');
      $('[data-floating-label]').first().trigger('blur');
      assert.ok(!$('label[for="' + $('[data-floating-label]').first().attr('id') + '"]').hasClass('floatingLabel-focus'));
    });
  });

  suite('inputs', function() {
    setup(function(){
      $('[data-floating-label]').floatingLabel();
    });

    test('should have active class with empty input', function() {
      assert.ok($('[data-floating-label]').first().hasClass('floatingLabel-active'));
    });

    test('should not have active class with non-empty input', function() {
      $('[data-floating-label]').first().val('Testing').trigger('keyup');
      assert.ok(!$('[data-floating-label]').first().hasClass('floatingLabel-active'));
    });

    test('should have inactive class with non-empty input', function() {
      $('[data-floating-label]').first().val('Testing').trigger('keyup');
      assert.ok($('[data-floating-label]').first().hasClass('floatingLabel-inactive'));
    });

    test('should not have inactive class with empty input', function() {
      $('[data-floating-label]').first().val('').trigger('keyup');
      assert.ok(!$('[data-floating-label]').first().hasClass('floatingLabel-inactive'));
    });
  });
});
