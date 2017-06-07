RapGenius.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(tracks, $rootEl) {
    this.tracks = tracks;
    this.$rootEl = $rootEl;
  },
  
  routes: {
    '': 'tracksIndex',
    'artists': 'artistsIndex',
    'artists/new': 'artistsNew',
    'artists/:id': 'artistsShow',
    'tracks/new': 'tracksNew',
    'tracks/:id': 'tracksShow'
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
      model: artist,
      collection: this.tracks
    });
    
    this._swapView(showView);
  },
  
  tracksIndex: function() {
    var indexView = new RapGenius.Views.TracksIndex({
      collection: this.tracks
    });
    this._swapView(indexView);
  },
  
  tracksNew: function() {
    var newView = new RapGenius.Views.TracksNew({
      artists: RapGenius.Collections.artists
    })
    RapGenius.Collections.artists.fetch();
    this._swapView(newView);
  },
  
  tracksShow: function(id) {
    var track = RapGenius.Collections.tracks.getOrFetch(id);
    var showView = new RapGenius.Views.TracksShow({
      model: track
    });
    
    this._swapView(showView);
  },
  
  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
