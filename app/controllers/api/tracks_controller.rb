class Api::TracksController < ApplicationController
  def create
    @track = Track.new(track_params)

    if @track.save
      render "tracks/show"
    else
      render :json => @track.errors, :status => :unprocessable_entity
    end
  end
  
  def destroy
    @track = Track.find(params[:id])
    
    if @track.destroy
      render "tracks/show"
    end
  end

  def index
    @tracks = Track.all
    respond_to do |format|
      format.html {render 'tracks/index'}
      format.json {render 'tracks/index'}
    end
  end
  
  def show
    @track = Track.find(params[:id])
    render "tracks/show"
  end
  
  private
  def track_params
    params.require(:track).permit(:creator_id, :artist_id, :album_id, :track_num, :title, :lyrics, :soundcloud_url, :spotify_url, :youtube_url, :about)
  end
end