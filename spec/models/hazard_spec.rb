require 'spec_helper'

describe Hazard do
  let(:hazard) { Hazard.create(latitude: 37.790583, longitude: -122.399745, 
    hazard_type: 'pothole', description: 'really bad on this street') }
  subject { hazard }
  
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
  it { should validate_presence_of(:hazard_type) }
  it { should validate_presence_of(:user_id) }
  
  describe "format_pin" do
    
    it "should return an array of arrays" do
      test = Hazard.new
      output = test.format_pin
      output.should be_kind_of(Array)
    end
  
  end
end
