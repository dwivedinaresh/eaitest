Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tweets, only: [:create, :update, :index]
      resources :tweeters, only: [:index] do
        collection do
          get 'followers'
          get 'followings'
          get '/:user_id/profile' => 'tweeters#profile', as: :profile
        end
        member do
          post 'follow'
          delete 'unfollow'
        end
      end
    end
  end
  devise_for :users
  root to: "home#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
