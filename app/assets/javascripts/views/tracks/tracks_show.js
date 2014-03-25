RapGenius.Views.TracksShow = Backbone.View.extend({
  template: JST['tracks/show'],
  
  events: {
    "mouseup #lyrics": "getSelectionText",
    "click .popover": "popoverClick",
    "click button": "temp"
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
  
  
  
  getSelectionText: function () {
    if (!this._lyricsText) {
      this._lyricsText = $('#lyrics').text();
    }
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    
    if (text != "") {
      $('#lyrics').html(this._lyricsText);
      var annotationStart = window.getSelection().baseOffset;
      var annotationEnd = window.getSelection().extentOffset;
      
        
      $('#lyrics').html(this._lyricsText.slice(0, annotationStart));
      $('#lyrics').append('<span class="annotate-text">' + text + '</span>');
      $('#lyrics').append('<span class="annotate-popover" data-toggle="popover" data-content="Annotate" data-placement="top"></span>');
      $('#lyrics').append(this._lyricsText.slice(annotationEnd));
      $('.annotate-popover').popover('show');
    } else {
      $('.annotate-popover').popover('hide');
    }
    return text;
  },
  
  popoverClick: function() {
    $('.annotation-modal').modal('show');
  },
  
  temp: function() {
    debugger
  }
});
