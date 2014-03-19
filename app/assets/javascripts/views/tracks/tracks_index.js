RapGenius.Views.TracksIndex = Backbone.View.extend({
  template: JST['tracks/index'],
  
  render: function () {
    this.$el.html(this.template({
      tracks: this.collection
    }));
    return this;
  }
});
