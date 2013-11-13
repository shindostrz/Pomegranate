class CreateAccidents < ActiveRecord::Migration
  def change
    create_table :accidents do |t|
      t.string :latitude
      t.string :longitude
      t.text :details
      t.string :news_url

      t.timestamps
    end
  end
end
