require 'spec_helper'

describe AccidentsController do

  describe "GET index" do
    it "assigns @accidents" do
      accidents = Accident.all
      get 'index'
      expect(assigns(:accidents)).to eq(Accident.all)
    end

    it 'renders JSON' do
      
    end
  end

  describe "GET 'create'" do

  end

end
