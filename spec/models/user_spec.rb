require 'spec_helper'

describe User do
  let(:user) { User.create( name: 'paco orozco', provider: 'facebook', uid: '2345')}

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:provider) }
  it { should validate_presence_of(:uid)}

end
