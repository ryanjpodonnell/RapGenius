class Api::AnnotationsController < ApplicationController
  def create
    @annotation = Annotation.new(annotation_params)
    if @annotation.save
      render "annotations/show"
    else
      render :json => @annotation.errors, :status => :unprocessable_entity
    end
  end
  
  def show
    @annotation = Annotation.find(params[:id])
    render "annotations/show"
  end
  
  private
  def annotation_params
    params.require(:annotation).permit(:track_id, :creator_id, :referent, :body)
  end
end
