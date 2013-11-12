Pomegranate::Application.routes.draw do

  root to: "hazards#index"

  resources :hazards

  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout

end
