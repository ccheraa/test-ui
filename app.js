$(function() {
  console.log($);
  console.log($('#login-form'));
  $('#login-form').submit(function(event) {
    event.preventDefault();
    const username = $('#username-input').val();
    const password = $('#password-input').val();
    $('.message', this).hide();
    if (username === 'root' && password === 'admin') {
      const successMessage = $('.success', this);
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
});