RapGenius.Collections.Tracks = Backbone.Collection.extend({
  model: RapGenius.Models.Track,
  url: '/api/tracks',
  
  getOrFetch: function (id) {
    var model;
    var tracks = this;

    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new RapGenius.Models.Track({ id: id });
      model.fetch({
        success: function () { tracks.add(model) }
      });
      return model;
    }
  }
});

RapGenius.Collections.tracks = new RapGenius.Collections.Tracks();