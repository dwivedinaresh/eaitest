class Api::V1::TweetersController < ApplicationController
  def index

    tweeters = User.where.not(id: current_user)

    respond_to do |format|
      format.json { render json: { tweeters: tweeters } }
    end
  end

  def followers
    followers = current_user.followers.preload(:follower_user).collect(&:follower_user)
    respond_to do |format|
      format.json { render json: { followers: followers.as_json } }
    end
  end

  def followings
    followings = current_user.followings.preload(:user).collect(&:user)
    respond_to do |format|
      format.json { render json: { followings: followings.as_json } }
    end
  end

  def follow
    followed_user = User.find_by(id: params[:id])
    respond_to do |format|
      if followed_user.followers.where(follower_user_id: current_user.id).blank?
        followed_user.followers.create(
          follower_user_id: current_user.id
        )
        format.json { render json: { status: :success }}
      else
        format.json { render json: { status: :error, errors: { base: ['Already following'] } }}
      end
    end
  end

  def unfollow
    followed_user = User.find_by(id: params[:id])
    respond_to do |format|
      if (follower = followed_user.followers.find_by(follower_user_id: current_user.id)).present?
        follower.destroy
        format.json { render json: { status: :success }}
      else
        format.json { render json: { status: :error, errors: { base: ['Not following'] } }}
      end
    end
  end

  def profile
    user = User.find_by(id: params[:user_id])
    respond_to do |format|
      format.json { render json: { 
          profile: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            followers: user.followers,
            followings: user.followings
          }
        }
      }
    end
  end

  private

  def limit
    10
  end

  def offset
    if params[:page].to_i >= 1
      (params[:page].to_i - 1) * limit
    else
      0
    end
  end
end
