suite('floating-label', function() {

  teardown(function(){
    $('[placeholder]').attr('class', '').val('').removeData();
    $('label').remove();
  });

  suite('init', function() {
    test('should have floatingLabel function', function() {
      assert.equal(typeof $.fn.floatingLabel, 'function');
    });
  });

  suite('labels', function() {
    setup(function(){
      $('[placeholder]').floatingLabel();
    });

    test('should be rendered', function() {
      assert.equal($('label').length, $('[placeholder]').length);
    });

    test('should have for="" matching input id', function() {
      assert.equal($('label').first().attr('for'), $('[placeholder]').first().attr('id'));
    });

    test('should have focus class when input is in focus', function() {
      $('[placeholder]').first().trigger('focus');
      assert.ok($('label[for="' + $('[placeholder]').first().attr('id') + '"]').hasClass('floatingLabel-focus'));
    });

    test('should not have focus class when input is not in focus', function() {
      $('[placeholder]').first().trigger('focus');
      $('[placeholder]').first().trigger('blur');
      assert.ok(!$('label[for="' + $('[placeholder]').first().attr('id') + '"]').hasClass('floatingLabel-focus'));
    });

    test('should be invisible with empty value', function(done) {
      assert.equal($('label[for="' + $('[placeholder]').first().attr('id') + '"]').css('opacity'), "0");

      $('[placeholder]').first().val('Testing').trigger('keyup');

      $('[placeholder]').first().val('').trigger('keyup');

      setTimeout(function() {
        assert.equal($('label[for="' + $('[placeholder]').first().attr('id') + '"]').stop(true, true).css('opacity'), "0");
        done();
      }, 5);
    });

    test('should be visible with non-empty value', function() {
      $('[placeholder]').first().val('Testing').trigger('keyup');

      assert.equal($('label[for="' + $('[placeholder]').first().attr('id') + '"]').stop(true, true).css('opacity'), "1");
    });

    test('should only be created if existing label doesn\'t exist', function() {
      assert.equal($('label[for="' + $('[placeholder]').eq(1).attr('id') + '"]').length, 1);
    });
  });

  suite('inputs', function() {
    setup(function(){
      $('[placeholder]').floatingLabel();
    });

    test('should not have active class with empty input', function() {
      assert.ok(!$('[placeholder]').first().hasClass('floatingLabel-active'));
    });

    test('should have active class with non-empty input', function() {
      $('[placeholder]').first().val('Testing').trigger('keyup');
      assert.ok($('[placeholder]').first().hasClass('floatingLabel-active'));
    });

    test('should not have inactive class with non-empty input', function() {
      $('[placeholder]').first().val('Testing').trigger('keyup');
      assert.ok(!$('[placeholder]').first().hasClass('floatingLabel-inactive'));
    });

    test('should have inactive class with empty input', function() {
      $('[placeholder]').first().val('').trigger('keyup');
      assert.ok($('[placeholder]').first().hasClass('floatingLabel-inactive'));
    });
  });

  suite('select input', function() {
    setup(function(){
      $('[placeholder], select').floatingLabel();
    });

    test('should have label with text matching first option', function() {
      assert.equal($('#country option').first().text(), $('label[for="country"]').text());
    });
  });

  suite('set placeholder', function() {
    setup(function(){
      $('[placeholder]').floatingLabel();
    });

    test('should update placeholder', function() {
      var labelText = 'This is a test';
      
      $('[placeholder]').first().floatingLabel('setPlaceholder', labelText);

      assert.equal($('[placeholder]').first().attr('placeholder'), labelText);
      assert.equal($('label').first().text(), labelText);
    });
  });
});
