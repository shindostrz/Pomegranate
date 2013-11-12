Pomegranate::Application.routes.draw do

  resources :hazards

  root to: "hazards#index"

end
