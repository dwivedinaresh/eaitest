class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :tweets, class_name: 'Tweet', foreign_key: 'tweeter_id'
  has_many :followers
  has_many :followings, class_name: 'Follower', foreign_key: 'follower_user_id'

  def full_name
    "#{first_name} #{last_name}"
  end
end
