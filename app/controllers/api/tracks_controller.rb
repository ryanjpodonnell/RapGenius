class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    respond_to do |format|
      format.html {render 'tracks/index'}
      format.json {render 'tracks/index'}
    end
  end
end
