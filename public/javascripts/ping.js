$(document).ready(function() {
  $('#form-ping').submit(function(e) {
    e.preventDefault();

    var $btn = $('#btn-ping');
    $.ajax({
      url: '/api/client/ping',
      data: JSON.stringify({ip: $('#ipAddr').val()}),
      method: 'post',
      contentType: "application/json; charset=utf-8"
    }).then(function(body) {
      setTimeout(function() {
        $btn.text('发送 ping 包');
        $('.placeholder').text('ping 成功, 时间为 ' + body.time + 'ms').addClass('success');
      }, 500);
    }, function(res) {
      $btn.text('发送 ping 包');
      $('.placeholder').text('ping 失败, 错误为 ' + res.responseJSON.error.message).addClass('error');
    })
  })
});