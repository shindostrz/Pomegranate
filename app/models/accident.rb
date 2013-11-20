class Accident < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :details, :news_url, :user_id, :accident_date

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :details, presence: true
  validates :accident_date, presence: true
  validates :news_url, format: {with: /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i}

  belongs_to :user

end
