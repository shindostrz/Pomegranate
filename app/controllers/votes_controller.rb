class VotesController < ApplicationController

    VoteWorker.perform_in(12.hours)

    def index
      hazard = Hazard.find(params[:id])
      @upvotes = hazard.votes.where(voted: true).count
      @downvotes = hazard.votes.where(voted: false).count

      respond_to do |format|
        format.json { render :json => {upvotes: @upvotes, downvotes: @downvotes} }
      end
    end

    def create
      @user = current_user
      @hazard = Hazard.find(params[:hazard_id])
      @vote = @user.votes.create(voted: params[:vote])
      @hazard.votes << @vote
      @vote = Vote.last
      render :json => @vote
    end

end