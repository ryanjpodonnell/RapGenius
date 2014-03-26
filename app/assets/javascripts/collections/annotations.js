RapGenius.Collections.Annotations = Backbone.Collection.extend({
  model: RapGenius.Models.Annotation,
  url: 'api/annotations',
  
  intialize: function(models, options) {
    this.track = options.track;
  }
});