RapGenius::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]
  
  namespace :api, :defaults => { :format => :json } do
    resources :artists, :only => [:create, :destroy] do
      resources :albums, :only => [:create] do
        resources :tracks, :only => [:create]
      end
    end
    
    resources :artists, :only => [:index, :show]
    resources :albums, :only => [:index]
    resources :tracks, :only => [:index]
  end
  
  root to: "api/tracks#index"
end
