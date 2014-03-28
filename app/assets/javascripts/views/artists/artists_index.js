RapGenius.Views.ArtistsIndex = Backbone.View.extend({
  template: JST['artists/index'],
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(RapGenius.Collections.artists, "add", this.render);
  },
  
  render: function() {
    var renderedContent = this.template({
      artists: this.collection
    });
    this.$el.html(renderedContent);

    return this;
  }
});