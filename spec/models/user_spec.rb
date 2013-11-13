require 'spec_helper'

describe User do
  let(:user) { User.create(name: 'paco orozco', provider: 'twitter', uid: '2345')}

    it { should have_many(:hazards) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:provider) }
    it { should validate_presence_of(:uid) }
    it { should validate_uniqueness_of(:uid) }

  describe 'self.create_with_omniauth(auth)' do
    # let(:user) { create(:user, :with_omniauth }
  #   it "should create a user with omniauth properties" do
  #     test = User.new
  #     user.provider

      # end


  end



end
