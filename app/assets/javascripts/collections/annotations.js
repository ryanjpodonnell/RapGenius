RapGenius.Collections.Annotations = Backbone.Collection.extend({
  model: RapGenius.Models.Annotation,
  url: 'api/annotations',
  comparator: function(model) {
    return model.escape("start_index");
  },
  intialize: function(models, options) {
    this.track = options.track;
  }
});