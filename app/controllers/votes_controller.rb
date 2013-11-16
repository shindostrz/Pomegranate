class VotesController < ApplicationController

    def create
    @vote = Vote.create(params[:vote])
    redirect_to hazards_path
    end

end
