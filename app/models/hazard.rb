class Hazard < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :description, :hazard_type, :user_id

  belongs_to :user

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
end
