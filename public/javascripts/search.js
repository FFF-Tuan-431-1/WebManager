/**
 * Created by rain on 2016/1/10.
 */
$(document).ready(function() {
  $('#form-search').submit(function(e) {
    e.preventDefault();

    var $btn = $('#btn-search');
    $btn.html($('<span>查找中 <i class="fa fa-spinner faa-spin animated"></i></span>'));
    $('.placeholder').text('').removeClass('success error');
    $.ajax({
      url: '/api/client/search' + '?name=' + $('#name').val(),
      method: 'get',
      contentType: "application/json; charset=utf-8"
    }).then(function(body) {
      setTimeout(function() {
        $btn.text('开始查找');
        $('.placeholder').text('查找成功, 正在跳转……').addClass('success');
        console.log(body.id);
        window.location.href = '/client/' + body.id;
      }, 500);
    }, function(res) {
      $btn.text('开始查找');
      $('.placeholder').text('查找失败,该主机不存在' ).addClass('error');
    })
  })
});