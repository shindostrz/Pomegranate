require 'spec_helper'

describe Vote do
  it 'is valid if belongs to user'

  it 'is not valid if there is no user'

  it 'must belong to a hazard'

  it 'does not allow duplicate votes on a hazard from same user' do
    user = User.create(
      provider: "twitter", 
      uid: "113539049", 
      name: "Amy MacKinnon"
    )
    hazard = Hazard.create(
      latitude: '37.782655',
      longitude: '-122.416112',
      hazard_type: 'pothole',
      description: 'foo bar',
      user_id: 1)

    vote = user.votes.create(voted: true)
    test = hazard.votes << vote

    vote2 = user.votes.build(voted: true)
    second_vote = hazard.votes << vote2
    binding.pry

    expect(test).to_not have(1).error

  end
end
