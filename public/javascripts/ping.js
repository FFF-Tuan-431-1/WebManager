$(document).ready(function() {
  var getIp = function(ip, mask) {
    var range = IpSubnetCalculator. calculateCIDRPrefix(ip, mask);
    var low = range.ipLow;
    var high = range.ipHigh;
    var result = [];
    var i = low + 1;
    while (i++ < high - 1) {
      result.push(IpSubnetCalculator.toString(i));
    }
    return result;
  };

  var ping = function(ips) {
    ips.forEach(function(ip) {
      var $placeholder = $('<div>').text(ip + ':').append('<span class="placeholder">加载中 <i class="fa fa-spinner faa-spin animated"></i></span>');
      $('.placeholders').append($placeholder);

      $.ajax({
        url: '/api/client/ping',
        data: JSON.stringify({ip: ip}),
        method: 'post',
        contentType: "application/json; charset=utf-8"
      }).then(function(body) {
        setTimeout(function() {
          $placeholder.find('.placeholder').text('ping 成功, 时间为 ' + body.time + 'ms').addClass('success');
        }, 500);
      }, function(res) {
        $placeholder.find('.placeholder').text('ping 失败, 错误为 ' + res.responseJSON.error.message).addClass('error');
      });
    });
  };

  $('#form-ping').submit(function(e) {
    e.preventDefault();

    $('.placeholders').html('');

    var ips = [];
    var subnetMask = $('#subnetMask').val();
    if (subnetMask === '255.255.255.255') {
      ips = [$('#ipAddr').val()]
    } else {
      ips = getIp($('#ipAddr').val(), $('#subnetMask').val());
    }

    ping(ips);
  })
});