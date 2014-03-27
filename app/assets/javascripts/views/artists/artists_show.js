RapGenius.Views.ArtistsShow = Backbone.View.extend({
  template: JST['artists/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync add", this.render);
    this.listenTo(this.collection, "add", this.render);
  },
  
  render: function() {
    this.collection.fetch();
    var renderedContent = this.template({
      artist: this.model,
      tracks: this.collection.where({artist_id: +this.model.id})
    });

    this.$el.html(renderedContent);
    
    return this;
  }
});
