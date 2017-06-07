RapGenius.Views.TracksNew = Backbone.View.extend({
  template: JST['tracks/new'],
  
  events: {
    "submit form": "submit"
  },
  
  initialize: function (options) {
    this.artists = options.artists;
    this.listenTo(this.artists, "sync", this.render);
  },
  
  render: function () {  
    var availableArtists = [];
    for (var i = 0; i < this.artists.length; i++) {
      availableArtists.push(this.artists.models[i].get('artistname'));
    }
    
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.$("#artist_name").typeahead({
      hint: false
    },{
      source: this._substringMatcher(availableArtists)
    });

    return this;
  },
  
  submit: function (event) {
    event.preventDefault();
     
    var params = $(event.currentTarget).serializeJSON()["track"];
    var newTrack = new RapGenius.Models.Track(params);
    var artistName = this.$('#artist_name').val();
    var foundArtist = false;
    
    for (var i = 0; i < this.artists.length; i++) {
      if (artistName === this.artists.models[i].get('artistname')) {
        foundArtist = true;
      }
    }
    if (foundArtist === false) {
      $('#artist_name').addClass("alert alert-danger");
      return;
    }
    
    newTrack.set({
      creator_id: 0, 
      artist_id: this.artists.where({artistname: artistName})[0].id
    });
    
    newTrack.save({}, {
      success: function () {
        RapGenius.Collections.tracks.add(newTrack);
        Backbone.history.navigate("#/tracks/" + newTrack.id, { trigger: true });
      }
    });
  },
  
  _substringMatcher: function (strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push({ value: str });
        }
      }); 
      cb(matches);
    };
  }
});
