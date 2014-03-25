RapGenius.Collections.Annotations = Backbone.Collection.extend({
  model: RapGenius.Models.Annotation,
  url: 'api/annotations'
});

RapGenius.Collections.annotations = new RapGenius.Collections.Annotations();