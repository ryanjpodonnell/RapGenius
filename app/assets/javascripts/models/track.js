RapGenius.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',
  
  parse: function (data) {
    return data;
  }
});
