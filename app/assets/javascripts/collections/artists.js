RapGenius.Collections.Artists = Backbone.Collection.extend({
  model: RapGenius.Models.Artist,
  url: '/api/artists',
  
  getOrFetch: function (id) {
    var model;
    var artists = this;

    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new RapGenius.Models.Artist({ id: id });
      model.fetch({
        success: function () { artists.add(model) }
      });
      return model;
    }
  }
});

RapGenius.Collections.artists = new RapGenius.Collections.Artists();