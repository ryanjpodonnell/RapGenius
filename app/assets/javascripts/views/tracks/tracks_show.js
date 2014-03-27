RapGenius.Views.TracksShow = Backbone.View.extend({
  template: JST['tracks/show'],
  
  events: {
    "dblclick #lyrics": "temp",
    "mouseup #lyrics": "getSelectionText",
    "mousedown .popover": "popoverClick",
    "click #submit": "submit",
    "mousedown .annotation": "showAnnotation"
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    if (!this._lyricsText && this.model.get('lyrics')) {
      $('#lyrics').html(this.model.get('lyrics'));
      this._lyricsText = $('#lyrics').html();
    }
    
    var renderedContent = this.template({
      track: this.model,
      artist: this.model.get('artist')
    });
    
    this.$el.html(renderedContent);
    this.placeAnnotations(-1, -1, "");
        
    return this;
  },
  
  getSelectionText: function (event) {
    var selection = window.getSelection();
    this._text = selection.toString();
    var range = selection.getRangeAt(0);
    this.getSelectionInfo(range, selection.toString());
  },
  
  getSelectionInfo: function (range, text) {
    var startPos = range.startOffset;
    var endPos = range.endOffset;
    var startNode = range.startContainer;
    var endNode = range.endContainer;
    
    var $li = $(startNode.parentNode);
    var children = [].slice.call($li[0].childNodes);
    var offset = this.getOffset(startNode, children);

    this._offsetStartPos = offset + startPos;
    this._offsetEndPos = offset + endPos;
    
    for (var i = 0; i < this.model.annotations().length; i++) {
      if ((startNode !== endNode) || (endNode.parentNode.id !== 'lyrics' && startNode.parentNode.id !== 'lyrics')) {
        this.placeAnnotations(-1, -1, "");
        return;
      }
    }
    
    if (this._offsetStartPos !== this._offsetEndPos) {
      this.placeAnnotations(this._offsetStartPos, this._offsetEndPos, text);
    }
    if (text === "") {
      this.placeAnnotations(-1, -1, "");
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
      creator_id: 0,
      referent: this._text,
      start_index: this._offsetStartPos,
      end_index: this._offsetEndPos,
      body: body
    });
    newAnnotation.save({}, {
      success: function () {
        $('.annotation-modal').modal('hide');
        view.model.annotations().add(newAnnotation);
        view.placeAnnotations(-1, -1, "");
      }
    });
  },
  
  placeAnnotations: function(popStart, popEnd, text) {
    if (this._lyricsText) {
      var lyrics = this._lyricsText;
      var end = this._lyricsText.length;
      
      var annotationArray = this.model.annotations().sort();
    
      if (annotationArray.length > 0) {
        $('#lyrics').html("");
        var insertedPopOver = false;
        for (var i = annotationArray.length-1; i >= 0; i--) {
          $('.annotate-popover').popover('hide');
          if (popStart > annotationArray.models[i].get("start_index") && insertedPopOver == false) {
            $('#lyrics').prepend(lyrics.slice(popEnd, end));
            $('#lyrics').prepend('<span class="annotate-popover" data-toggle="popover" data-content="Annotate" data-placement="top"></span>');
            $('#lyrics').prepend('<span class="annotate-text">' + text + '</span>');
            end = popStart;
            insertedPopOver = true
          }
          $('#lyrics').prepend(lyrics.slice(annotationArray.models[i].get("end_index"), end));
          $('#lyrics').prepend('<span class="annotation" data-annotation-id="' 
            + annotationArray.models[i].get("id") + '">' 
            + annotationArray.models[i].get("referent") + '</span>');
          end = annotationArray.models[i].get("start_index");
          
          if (i === 0 && popStart < annotationArray.models[i].get("start_index") && popStart !== -1) {
            $('#lyrics').prepend(lyrics.slice(popEnd, annotationArray.models[i].get("start_index")));
            $('#lyrics').prepend('<span class="annotate-popover" data-toggle="popover" data-content="Annotate" data-placement="top"></span>');
            $('#lyrics').prepend('<span class="annotate-text">' + text + '</span>');
            end = popStart;
            insertedPopOver = true
          }
        }
        $('#lyrics').prepend(lyrics.slice(0, end)); 
      } else if (annotationArray.length == 0 && popStart !== -1) {
        $('#lyrics').html("");
        $('#lyrics').prepend(lyrics.slice(popEnd, end));
        $('#lyrics').prepend('<span class="annotate-popover" data-toggle="popover" data-content="Annotate" data-placement="top"></span>');
        $('#lyrics').prepend('<span class="annotate-text">' + text + '</span>');
        $('#lyrics').prepend(lyrics.slice(0, popStart)); 
      } else if (annotationArray.length == 0) {
        $('#lyrics').html("");
        $('#lyrics').prepend(lyrics.slice(0, end));
      }
      
    }
    $('.annotate-popover').popover('show')
  },
  
  showAnnotation: function(event) {
    $('.annotation-display').modal({
      backdrop: false
    });
    
    $('.annotation-display').css({
      'margin-top': function () {
        return -($("body", top.document).scrollTop()) + (event.currentTarget.offsetTop);
      },
      'margin-left': function () {
        return event.currentTarget.offsetLeft + event.currentTarget.offsetWidth;
      }
    });
    
    var annotationId = event.currentTarget.dataset.annotationId;
    var annotation = this.model.annotations().get(annotationId);
    $('.annotation-display .modal-title').text(annotation.get("referent"));
    $('.annotation-display .modal-body').text(annotation.get("body"));
    $('.annotation-display').modal('show');
  }
});
