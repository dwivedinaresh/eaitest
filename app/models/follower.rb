class Follower < ApplicationRecord
  belongs_to :user
  has_one :follower_user, class_name: 'User', primary_key: 'follower_user_id', foreign_key: 'id'
end
