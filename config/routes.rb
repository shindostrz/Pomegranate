Pomegranate::Application.routes.draw do

  require 'sidekiq/web'
  require 'sidetiq/web'

  root to: "hazards#index"

  resources :hazards do
    resources :votes
  end

  resources :accidents

  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout

  mount Sidekiq::Web, at: "/sidekiq"

end