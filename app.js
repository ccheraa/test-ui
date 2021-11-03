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
        successMessage.fadeOut(1000);
      }, 3000);
    } else {
      $('.error', this).show();
      $('#username-input').val('').focus();
      $('#password-input').val('');
    }
  });

  $('#dnd .item').on('dragstart', function(event) {
    event.originalEvent.dataTransfer.setData('fruit', $(this).attr('id'));
    event.originalEvent.dataTransfer.setData('list', $(this).parent('.list').attr('id'));
  });
  $('#dnd .item').on('dragend', function(event) {
    $('#dnd .list').removeClass('success bg-success');
  });
  $('#dnd .list').on('dragover', function(event) {
    event.preventDefault();
  });
  $('#dnd .list, #dnd .list *').on('drop', function(event) {
    var source = event.originalEvent.dataTransfer.getData('list');
    var targetEl = $(event.target);
    var target;
    if (targetEl.hasClass('list')) {
      target = targetEl.attr('id');
    } else {
      target = targetEl.parent('.list').attr('id');
    }
    if (source !== target) {
      var fruit = event.originalEvent.dataTransfer.getData('fruit');
      $('#' + target).append($('#' + fruit));
    }
  });
});