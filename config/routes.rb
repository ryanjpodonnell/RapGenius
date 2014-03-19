RapGenius::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]
  
  namespace :api, :defaults => { :format => :json } do
    resources :tracks, :only => [:index]
  end
  
  root to: "api/tracks#index"
end
