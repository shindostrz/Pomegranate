class VotesController < ApplicationController

    def index
      @hazard = Hazard.new
      @hazards = Hazard.all
    end


    def create
    @vote = Vote.create(params[:vote])
    redirect_to hazards_path
    end

end
