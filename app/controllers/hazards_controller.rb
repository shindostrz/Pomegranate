class HazardsController < ApplicationController

  def index
    # @hazards = Hazard.all
    @hazard = Hazard.new
    @hazards = @hazard.format_pin
    
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
    
    
    # if @new_hazard.errors
    #   flash[:error] = "Danger Will Robinson!"
    # end
    
    respond_to do |format|
      format.js
    end
  end

  def edit
  end

  def update
  end

  def destroy
    
  end

end