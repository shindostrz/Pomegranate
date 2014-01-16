class VotesController < ApplicationController

    # VoteWorker.perform_in(12.hours)

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
      @vote = @user.votes.create(voted: params[:vote], hazard_id: params[:hazard_id])
      render json: @vote, status: 201
    end

end