window.RapGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    var tracks = RapGenius.Collections.tracks;

    tracks.fetch({
      success: function () {
        new RapGenius.Routers.AppRouter(tracks, $rootEl);
        Backbone.history.start();
      },
      error: function () {
        console.log('Failed to fetch.');
      }
    });
  }
};
