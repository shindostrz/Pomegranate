require 'spec_helper'

describe Accident do
  let(:accident) { Accident.create(latitude: '37.785752', longitude: '122.412758',
    details: 'construction in soma', news_url: 'example.com', user_id: 1, accident_date: '2013-11-12')}

  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
  it { should validate_presence_of(:details) }
  it { should validate_presence_of(:accident_date) }

  it 'fails validation if the url doesn\'t start with http' do
    expect(Accident.new).to have(1).errors_on(:news_url)
  end

end
