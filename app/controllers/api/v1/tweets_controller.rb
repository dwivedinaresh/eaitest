class Api::V1::TweetsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: { tweets: current_user.tweets.order(:created_at).as_json(only: [:tweet_message, :created_at]) }  }
    end
  end

  def create
    tweet = current_user.tweets.new(tweet_params)
    respond_to do |format|
      if tweet.save
        format.json { render json: { status: :success, tweet: { tweet_message: tweet.tweet_message } } }
      else
        format.json { render json: { status: :error, errors: tweet.errors.messages } }
      end
    end
  end

  def edit
  end

  private

  def tweet_params
    params.require(:tweet).permit(:tweet_message)
  end
end
