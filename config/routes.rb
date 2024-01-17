Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      post '/signup', to: 'users#create'
      get "/me", to: "users#show"
      get '/users', to: "users#index"
      get '/gigs/:mine', to: 'gigs#mine'
      post '/gigs/:num', to: 'gigs#create'
      post '/applications/:num', to: 'applications#create'
      get '/applications/:gig_id', to: 'applications#mine'
      get '/myapps/:id', to: 'applications#my_apps'

      resources :gigs, only: [:index, :update, :destroy]
      resources :applications, only: [:destroy, :update]
    end
  end
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
