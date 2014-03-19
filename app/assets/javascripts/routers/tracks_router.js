RapGenius.Routers.TracksRouter = Backbone.Router.extend({
  initialize: function(tracks, $rootEl) {
    this.tracks = tracks;
    this.$rootEl = $rootEl;
  },
  
  routes: {
    '': 'index'
  },
  
  index: function() {
    console.log('index router')
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
