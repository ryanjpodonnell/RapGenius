RapGenius.Collections.Albums = Backbone.Collection.extend({
  model: RapGenius.Models.Album,
  url: '/api/albums'
});

RapGenius.Collections.albums = new RapGenius.Collections.Albums();