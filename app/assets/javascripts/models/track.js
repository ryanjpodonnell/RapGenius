RapGenius.Models.Track = Backbone.Model.extend({
  urlRoot: '/api/tracks',
  
  annotations: function () {
    if (!this._annotations) {
      this._annotations = new RapGenius.Collections.Annotations([], {
        track: this
      });
    }
    
    return this._annotations;
  },
  
  parse: function(jsonResp) {
    if (jsonResp.annotations) {
      this.annotations().set(jsonResp.annotations);
      delete jsonResp.annotations;
    }
    
    return jsonResp;
  }
});
