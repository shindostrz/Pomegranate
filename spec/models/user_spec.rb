require 'spec_helper'

describe User do
  let(:user) { User.create(name: 'paco orozco', provider: 'twitter', uid: '2345')}

    it { should have_many(:hazards) }

  # describe 'self.create_with_omniauth(auth)' do

  #   it "should create a user with omniauth properties" do
  #     test = User.new
  #     user.provider

  #   end


  # end



end
