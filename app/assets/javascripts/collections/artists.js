RapGenius.Collections.Artists = Backbone.Collection.extend({
  model: RapGenius.Models.Artist,
  url: '/api/artists'
});

RapGenius.Collections.artists = new RapGenius.Collections.Artists();