require 'sidekiq/web'
require 'lockup'

Rails.application.routes.draw do
  get 'todos/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  mount Lockup::Engine, at: '/lockup' if Rails.env.production?
  mount Sidekiq::Web => '/sidekiq'
  mount Lookbook::Engine, at: '/lookbook' if Rails.env.development?

  if Rails.configuration.x.cypress
    namespace :cypress do
      delete 'cleanup', to: 'cleanup#destroy'
    end
  end

  resources :clicks, only: %i[index create]

  get '/manifest.v1.webmanifest', to: 'statics#manifest', as: :webmanifest
  get '/about', to: 'about#index', as: :about
  get '/todos', to: 'todos#index'

  root to: 'clicks#index'
end
