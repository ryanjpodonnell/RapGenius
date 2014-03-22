RapGenius.Views.TracksShow = Backbone.View.extend({
  template: JST['tracks/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      track: this.model,
      artist: this.model.get('artist')
    });

    this.$el.html(renderedContent);
    
    return this;
  }
});
