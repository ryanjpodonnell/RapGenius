class Api::AlbumsController < ApplicationController
  def create
    @album = Album.new(album_params)

    if @album.save
      render "albums/show"
    else
      render :json => @album.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @album = Album.find(params[:id])
    
    if @album.destroy
      render "albums/show"
    end
  end

  def index
    @albums = Album.all
    render 'albums/index'
  end
  
  def show
    @album = Album.find(params[:id])
    render "albums/show"
  end
  
  private
  def album_params
    params.require(:album).permit(:artist_id, :year, :title, :about, :image_url)
  end
end
