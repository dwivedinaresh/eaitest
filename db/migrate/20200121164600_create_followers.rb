class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_table :followers do |t|
      t.references :user
      t.integer :follower_user_id

      t.timestamps
    end
  end
end
