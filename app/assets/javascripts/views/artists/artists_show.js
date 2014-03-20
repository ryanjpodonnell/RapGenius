RapGenius.Views.ArtistsShow = Backbone.View.extend({
  template: JST['artists/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      artist: this.model
    });

    this.$el.html(renderedContent);
    
    return this;
  }
});
