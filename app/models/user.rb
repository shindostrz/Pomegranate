class User < ActiveRecord::Base

  attr_accessible :name, :provider, :uid

  has_many :hazards
  has_many :accidents

  validates :name, presence: true
  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: true
  #will not allow a duplicate uid into the database (unique)


  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
    end
  end
end
