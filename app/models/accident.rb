class Accident < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :details, :news_url, :user_id, :accident_date

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :details, presence: true

  belongs_to :user
end
