class Accident < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :details, :news_url

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :details, presence: true


end
