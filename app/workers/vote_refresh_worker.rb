class VoteRefreshWorker
  include Sidekiq::Worker

  def perform(hazard_id)
    all_votes = Vote.where(hazard_id: hazard_id)

    upvote_total = 1
    downvote_total = 0

    all_votes.each do |vote|
      vote.upvote ? upvote_total += 1 : downvote_total += 1
    end

    vote = upvote_total - downvote_total

    hazard = Hazard.find(hazard_id)
    pothole.update_attributes(vote_count: vote)
  end

end