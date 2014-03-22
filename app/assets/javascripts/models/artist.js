RapGenius.Models.Artist = Backbone.Model.extend({
  urlRoot: '/api/artists',
  
  tracks: function () {
    debugger
    
    return this._tracks;
  }
});
