RapGenius.Views.TracksShow = Backbone.View.extend({
  template: JST['tracks/show'],
  
  events: {
    "dblclick #lyrics": "temp",
    "mouseup #lyrics": "getSelectionText",
    "mousedown .popover": "popoverClick",
    "click #submit": "submit"
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      track: this.model,
      artist: this.model.get('artist')
    });

    this.$el.html(renderedContent);
    
    return this;
  },
  
  getSelectionText: function (event) {
    if (!this._lyricsText) {
      this._lyricsText = $('#lyrics').text();
    }
    
    this._text = "";
    var entireText = "";
    var entireIndex = 0;
    var offset = 0;
    var extent = 0;
    
    if (window.getSelection) {
      $('#lyrics').html(this._lyricsText);
      this._text = window.getSelection().toString();
      offset = window.getSelection().baseOffset;
      extent = window.getSelection().extentOffset;
      entireIndex = (offset > extent) ? extent : offset;
      entireText = this._lyricsText.slice(0, entireIndex);
    }
    
    if (this._text != "") {
      $('#lyrics').html(this._lyricsText);
      
      if (offset === extent) {
        return;
      }
      
      var inputText = document.getElementById("lyrics");
      var innerText = inputText.innerText;
      var index = entireText.length;
        
      $('#lyrics').html(this._lyricsText.slice(0, index));
      $('#lyrics').append('<span class="annotate-text">' + this._text + '</span>');
      $('#lyrics').append('<span class="annotate-popover" data-toggle="popover" data-content="Annotate" data-placement="top"></span>');
      $('#lyrics').append(this._lyricsText.slice(index + this._text.length));
      $('.annotate-popover').popover('show');
    } else {
      $('.annotate-popover').popover('hide');
    }
  },
  
  popoverClick: function() {
    $('.annotation-modal').modal('show');
  },
  
  submit: function() {      
    var newAnnotation = new RapGenius.Models.Annotation();
    var body = this.$('#body').val();
    
    newAnnotation.set({ 
      track_id: this.model.id,
      creator_id: RapGenius.user_id,
      referent: this._text,
      body: body
    });
    newAnnotation.save({}, {
      success: function () {
        RapGenius.Collections.annotations.add(newAnnotation);
        $('.annotation-modal').modal('hide');
      }
    });
  }
});
