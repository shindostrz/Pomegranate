class Vote < ActiveRecord::Base
  attr_accessible :voted, :user_id, :hazard_id

  belongs_to :user
  belongs_to :hazard

validates :user_id, uniqueness: true

end
