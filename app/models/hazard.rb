class Hazard < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :description, :hazard_type, :user_id
  
  belongs_to :user
  
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :hazard_type, presence: true
  validates :user_id, presence: true
end
