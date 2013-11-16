Pomegranate::Application.routes.draw do

  root to: "hazards#index"

  resources :hazards
      put "like", to: "hazards#upvote"
      put "dislike", to: "hazards#downvote"

  resources :accidents
  resources :votes

  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout

end
