class VotesController < ApplicationController

    def create
      @user = current_user
      @hazard = params[:id]
      @vote = @hazard.votes.create(voted: params[:vote], user_id: @user)
      response_to do |format|
        format.js
      end

    end

end
