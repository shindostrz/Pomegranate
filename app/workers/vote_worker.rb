class VoteWorker
  include Sidekiq::Worker

  sidekiq_options queue: :vote_tally

  def perform
    Hazard.all.each do |hazard|
      true_count = hazard.votes.where(voted: true).count
      false_count = hazard.votes.where(voted: false).count
      rating = true_count - false_count

      if rating <= -3
        Hazard.find(hazard.id).delete
      end

    end

  end

end