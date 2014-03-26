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
    var selection = window.getSelection();
    this._text = selection.toString();
    var range = selection.getRangeAt(0);
    this.getSelectionInfo(range, selection.toString());
  },
  
  getSelectionInfo: function (range, text) {
    var startPos = range.startOffset;
    var endPos = range.endOffset;
    var startNode = range.startContainer;
    
    var $li = $(startNode.parentNode);//.closest('.annotations')
    var children = [].slice.call($li[0].childNodes);

    var offset = this.getOffset(startNode, children);

    this._offsetStartPos = offset + startPos;
    this._offsetEndPos = offset + endPos;

    
    if (this._offsetStartPos !== this._offsetEndPos) {
      $('#lyrics').html(this._lyricsText.slice(0, this._offsetStartPos));
      $('#lyrics').append('<span class="annotate-text">' + text + '</span>');
      $('#lyrics').append('<span class="annotate-popover" data-toggle="popover" data-content="Annotate" data-placement="top"></span>');
      $('#lyrics').append(this._lyricsText.slice(this._offsetEndPos));
      $('.annotate-popover').popover('show')
    } else {
      $('#lyrics').text(this._lyricsText)
      $('.annotate-popover').popover('hide');
    }
  },
  
  getOffset: function (startNode, children) {
    var offset = 0;

    _(children).find(function(el) {
      if (el.textContent !== startNode.textContent) {
        if (el.textContent !== "Annotate") {
          offset += el.textContent.length;
        }
      }
      return el.textContent === startNode.textContent;
    });

    return offset;
  },
  
  popoverClick: function () {
    $('.annotation-modal').modal('show');
  },
  
  submit: function() {
    var view = this;
    
    var newAnnotation = new RapGenius.Models.Annotation();
    var body = this.$('#body').val();
    
    newAnnotation.set({ 
      track_id: this.model.id,
      creator_id: RapGenius.user_id,
      referent: this._text,
      start_index: this._offsetStartPos,
      end_index: this._offsetEndPos,
      body: body
    });
    newAnnotation.save({}, {
      success: function () {
        view.model.annotations().add(newAnnotation);
        $('.annotation-modal').modal('hide');
      }
    });
  }
});
