class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.boolean :voted
      t.integer :user_id
      t.integer :hazard_id

      t.timestamps
    end
  end
end
