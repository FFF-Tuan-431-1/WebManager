/**
 * Created by lanyukun on 2016/1/10.
 */
$(document).ready(function(){
  $('#form-creation').submit(function(e) {
    e.preventDefault();
    var $btn = $('#btn-create');
    $btn.html($('<span>加载中 <i class="fa fa-spinner faa-spin animated"></i></span>'));
    $('.placeholder').text('').removeClass('success error');
    var temp = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/;
    if (!temp.test($('#macCreate').val()))
    {
      $btn.text('添加主机');
      $('.placeholder').text('请输入合法的mac地址!(mac地址格式为xx-xx-xx-xx-xx-xx) ').addClass('error');
      return false;
    }
    $.ajax({
      url: '/api/client/creation',
      data: JSON.stringify({mac: $('#macCreate').val(),name:$('#nameCreate').val()}),
      method: 'post',
      contentType: "application/json; charset=utf-8"
    }).then(function(){
      $btn.text('添加主机');
      alert("添加成功！");
      //$('.placeholder').text('添加成功').addClass('success');
      window.location.href = '/home';
    }, function() {
      $btn.text('添加主机');
      $('.placeholder').text('添加失败, 已存在的主机名或mac ').addClass('error');
    })
  });
});
