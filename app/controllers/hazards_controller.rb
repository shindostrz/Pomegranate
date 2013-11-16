class HazardsController < ApplicationController

  def index
    @hazard = Hazard.new
    @hazards = Hazard.all
    @vote = Vote.new
    @accident = Accident.new

    respond_to do |format|
      format.html
      format.json { render :json => @hazards }
    end
  end

  def show
  end

  def new
  end

  def create
    @user = current_user
    @new_hazard = @user.hazards.create(params[:hazard])
    @marker = "#{@new_hazard['latitude']}, #{@new_hazard['longitude']}"

    if @new_hazard.errors
      flash[:error] = "Danger Will Robinson!"
    end

    respond_to do |format|
      format.js
    end
  end

  def edit
  end

  def update
  end

  def destroy
    Hazard.delete(params[:id])
    @id = params[:id]

    respond_to do |format|
      format.js
    end
  end

end