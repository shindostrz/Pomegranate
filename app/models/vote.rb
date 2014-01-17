class Vote < ActiveRecord::Base
  attr_accessible :voted, :user_id, :hazard_id
  after_commit :count_the_votes

  belongs_to :user
  belongs_to :hazard

  def count_the_votes
    VoteRefreshWorker.perform_async(self.hazard_id)
  end

end
