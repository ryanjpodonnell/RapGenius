class Api::ArtistsController < ApplicationController
  def create
    @artist = Artist.new(params[:artist])

    if @artist.save
      render "artists/show"
    else
      render :json => @artist.errors, :status => :unprocessable_entity
    end
  end
  
  def index
    @artists = Artist.all
    render "artists/index"
  end
end
