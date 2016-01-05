$(document).ready(function() {
  var _onlineTpl = $('<td class="online">在线</td>');
  var _offlineTpl = $('<td class="offline">离线</td>');
  var actions = function(client) {
    return $('<td>').append(
      $('<a>').attr('href', 'client/' + client.id).append($('<span><i class="fa fa-info-circle"></i> 详情</span>'))
    )
  };
  const app = {
    init: function() {
      this.$table = $('#clients-table');
      this.$loading = $('#loading');

      this.load();
    },

    load: function() {
      app.$loading.show();
      $.ajax('/api/client')
        .then(function(clients) {
          app.$table.find('tbody').html('');

          clients.forEach(function(client) {
            var tr = $('<tr>').append($('<td>').text(client.id),
                                      $('<td>').text(client.name),
                                      $('<td>').text(client.mac),
                                      client.isOnline ? _onlineTpl : _offlineTpl,
                                      actions(client));
            app.$table.find('tbody').append(tr)
          });
          app.$loading.hide();
        });
    }
  };

  app.init();
});