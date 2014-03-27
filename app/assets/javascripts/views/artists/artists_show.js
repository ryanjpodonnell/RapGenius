RapGenius.Views.ArtistsShow = Backbone.View.extend({
  template: JST['artists/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync add", this.render);
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      artist: this.model,
      tracks: this.collection
    });

    this.$el.html(renderedContent);
    
    return this;
  }
});
