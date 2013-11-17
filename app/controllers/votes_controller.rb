class VotesController < ApplicationController

    VoteWorker.perform_in(12.hours)

    def create
      @user = current_user
      @hazard = Hazard.find(params[:hazard_id])
      @vote = @user.votes.create(voted: params[:vote])
      @hazard.votes << @vote
      @vote = Vote.last
      render :json => @vote
    end

end