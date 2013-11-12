require 'spec_helper'

describe Hazard do
  let(:hazard) { Hazard.create }
  subject { hazard }
  
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
  it { should validate_presence_of(:hazard_type) }
  it { should validate_presence_of(:user_id) }
end
