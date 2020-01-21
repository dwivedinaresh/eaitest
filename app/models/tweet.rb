class Tweet < ApplicationRecord
  belongs_to :tweeter, class_name: 'User', foreign_key: 'tweeter_id'
end
