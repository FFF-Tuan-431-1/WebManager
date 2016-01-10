/**
 * Created by lanyukun on 2016/1/10.
 */
$(document).ready(function(){
  $('#form-creation').submit(function(e) {
    e.preventDefault();
    var $btn = $('#btn-create');
    $btn.html($('<span>加载中 <i class="fa fa-spinner faa-spin animated"></i></span>'));
    $('.placeholder').text('').removeClass('success error');
    $.ajax({
      url: '/api/client/creation',
      data: JSON.stringify({mac: $('#macCreate').val(),name:$('#nameCreate').val()}),
      method: 'post',
      contentType: "application/json; charset=utf-8"
    }).then(function(){
      $btn.text('添加主机');
      $('.placeholder').text('添加成功').addClass('success');
    }, function() {
      $btn.text('添加主机');
      $('.placeholder').text('添加失败, 已存在的主机名或mac ').addClass('error');
    })
  });
});
