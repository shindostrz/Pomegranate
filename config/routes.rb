Pomegranate::Application.routes.draw do

  root to: "hazards#index"

  resources :hazards do
    resources :votes
  end

  resources :accidents

  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout

end
