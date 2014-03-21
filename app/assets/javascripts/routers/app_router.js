RapGenius.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(tracks, $rootEl) {
    this.tracks = tracks;
    this.$rootEl = $rootEl;
  },
  
  routes: {
    '': 'tracksIndex',
    'artists': 'artistsIndex',
    'artists/new': 'artistsNew',
    'artists/:id': 'artistsShow'
  },
  
  artistsIndex: function() {
    var indexView = new RapGenius.Views.ArtistsIndex({
      collection: RapGenius.Collections.artists
    })
    RapGenius.Collections.artists.fetch();
    this._swapView(indexView);
  },
  
  artistsNew: function() {
    var newView = new RapGenius.Views.ArtistsNew()
    this._swapView(newView);
  },
  
  artistsShow: function(id) {
    var artist = RapGenius.Collections.artists.getOrFetch(id);

    var showView = new RapGenius.Views.ArtistsShow({
      model: artist
    });
    
    this._swapView(showView);
  },
  
  tracksIndex: function() {
    console.log("tracksindex");
    var indexView = new RapGenius.Views.TracksIndex({
      collection: this.tracks
    });
    this._swapView(indexView);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
