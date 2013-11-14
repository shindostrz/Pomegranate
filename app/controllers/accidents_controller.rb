class AccidentsController < ApplicationController
  def index

    @accident = Accident.new
    @accidents = Accidents.all

    respond_to do |format|
      format.html
      format.json { render :json => @hazards }
    end

  end

  def create

    @user = current_user
    @new_accident = @user.accidents.create(params[:accident])
    @marker = "#{@new_accident['latitude']}, #{@new_accident['longitude']}"
    p @marker

    respond_to do |format|
      format.js
    end

  end

  def destroy
    Hazard.delete(params[:id])
    @id = params[:id]

    respond_to do |format|
      format.js
    end
  end

end
