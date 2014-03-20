class Api::ArtistsController < ApplicationController
  def create
    @artist = Artist.new(params[:artist])

    if @artist.save
      render "artists/show"
    else
      render :json => @artist.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @artist = Artist.find(params[:id])
    
    if @artist.destroy
      render "artists/show"
    end
  end
  
  def index
    @artists = Artist.all
    render "artists/index"
  end
  
  def show
    @artist = Artist.find(params[:id])
    render "artists/show"
  end
end
