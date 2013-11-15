class AddDateColumnToAccidents < ActiveRecord::Migration
  def change
    add_column :accidents, :accident_date, :date
  end
end
