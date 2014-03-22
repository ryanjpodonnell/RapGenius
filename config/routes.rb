RapGenius::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]
  
  namespace :api, :defaults => { :format => :json } do
    resources :artists, :only => [:create, :destroy, :index, :show]
    resources :tracks, :only => [:create, :destroy, :index, :show]
  end
  
  root to: "api/tracks#index"
end
