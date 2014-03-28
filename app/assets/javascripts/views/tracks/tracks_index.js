RapGenius.Views.TracksIndex = Backbone.View.extend({
  template: JST['tracks/index'],
  
  initialize: function() {
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  render: function () {
    this.$el.html(this.template({
      tracks: this.collection
    }));
    return this;
  },
  
  fetcharoo: function () {
  }
});
