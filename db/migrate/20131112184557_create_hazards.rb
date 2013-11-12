class CreateHazards < ActiveRecord::Migration
  def change
    create_table :hazards do |t|
      t.string :latitude
      t.string :longitude
      t.string :hazard_type
      t.integer :user_id
      t.text :description
      t.timestamps
    end
  end
end