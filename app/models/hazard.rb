class Hazard < ActiveRecord::Base

  attr_accessible :latitude, :longitude, :description, :hazard_type, :user_id

  belongs_to :user
  has_many :votes

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :hazard_type, presence: true
  validates :user_id, presence: true

  def format_pin
    h = Hazard.all
    output = []
    h.each do |row|
      output << [row.latitude, row.longitude, row.hazard_type, row.description]
    end
    return output
  end

  def hazard_update
    Hazard.all.each do |hazard|
      count(hazard)
    end
  end

  def count(hazard)
    true_count = hazard.votes.where(voted: true).count
    false_count = hazard.votes.where(voted: false).count
    rating = true_count - false_count
    if rating <= -3
      Hazard.find(hazard.id).delete
    end
  end

end
