$(document).ready(function() {
  $('#link-edit').click(function(e) {
    e.preventDefault();
    var newName = window.prompt('请输入新的主机名');
    $.ajax({
      url: '/api/client/' + $('#link-edit').data('id'),
      data: JSON.stringify({name: newName}),
      method: 'put',
      contentType: "application/json; charset=utf-8",
    }).then(function() {
      window.location = window.location;
    });
  });

  $('#btn-ping').click(function(e) {
    e.preventDefault();
    var $btn = $(this);
    $btn.html($('<span>加载中 <i class="fa fa-spinner faa-spin animated"></i></span>'));
    $('.placeholder').text('').removeClass('success error');
    $.ajax('/api/client/' + $('#link-edit').data('id') + '/ping')
      .then(function(body) {
        setTimeout(function() {
          $btn.text('发送 ping 包');
          $('.placeholder').text('ping 成功, 时间为 ' + body.time + 'ms').addClass('success');
        }, 500);
    }, function(res) {
      $btn.text('发送 ping 包');
        $('.placeholder').text('ping 失败, 错误为: ' + res.responseJSON.error.message).addClass('error');
    })
  });
});