class Api::TracksController < ApplicationController
  def create
    @track = Track.new(params[:track])

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
end
