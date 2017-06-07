RapGenius.Views.ArtistsNew = Backbone.View.extend({
  template: JST['artists/new'],
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    var $filePickerInput = this.$("input[type=filepicker]");
    filepicker.constructWidget($filePickerInput[0]);

    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON()["artist"];
    var newArtist = new RapGenius.Models.Artist(params);
    newArtist.set({iq: 0});
    newArtist.save({}, {
      success: function () {
        RapGenius.Collections.artists.add(newArtist);
        Backbone.history.navigate("#/artists", { trigger: true });
      }
    });
  }
});