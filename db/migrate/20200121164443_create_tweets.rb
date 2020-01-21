class CreateTweets < ActiveRecord::Migration[5.2]
  def change
    create_table :tweets do |t|
      t.text :tweet_message
      t.integer :tweeter_id

      t.timestamps
    end
  end
end
