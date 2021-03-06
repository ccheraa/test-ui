$(function() {
  $('#login-form').submit(function(event) {
    event.preventDefault();
    var username = $('#username-input').val();
    var password = $('#password-input').val();
    $('.message', this).hide();
    if (username === 'root' && password === 'admin') {
      var successMessage = $('.success', this);
      successMessage.show();
      setTimeout(function() {
        successMessage.fadeOut(400);
      }, 1000);
    } else {
      $('.error', this).show();
      $('#username-input').val('').focus();
      $('#password-input').val('');
    }
  });

  $('#dnd .item').on('dragstart', function(event) {
    event.originalEvent.dataTransfer.setData('text', $(this).parent('.list').attr('id') + ':' + $(this).attr('id'));
  });
  $('#dnd .item').on('dragend', function(event) {
    $('#dnd .list').removeClass('success bg-success');
  });
  $('#dnd .list').on('dragover', function(event) {
    event.preventDefault();
  });
  $('#dnd .list, #dnd .list *').on('drop', function(event) {
    var source = event.originalEvent.dataTransfer.getData('text').split(':')[0];
    var targetEl = $(event.target);
    var target;
    if (targetEl.hasClass('list')) {
      target = targetEl.attr('id');
    } else {
      target = targetEl.parent('.list').attr('id');
    }
    if (source !== target) {
      var fruit = event.originalEvent.dataTransfer.getData('text').split(':')[1];
      $('#' + target).append($('#' + fruit));
    }
  });

  $('#api-button1').click(function() {
    $.get('http://httpstat.us/200').done(function(result) {
      $('#api-message1').html(result);
    });
  });
  $('#api-button2').click(function() {
    $.get('http://httpstat.us/500').fail(function(result) {
      $('#api-message2').html(result.status + '<br/>' + result.statusText);
    });
  });
  $('#api-button3').click(function() {
    $.get('/not-found').fail(function(result) {
      $('#api-message3').html(result.status + '<br/>' + result.statusText);
    });
  });
  $('#api-button4').click(function() {
    $.get('/not-found-2')
      .fail(function(result) {
        $('#api-message4').html(result.status + '\n' + result.statusText);
      }).done(function(result) {
        $('#api-message4').html(result);
      });
  });
});