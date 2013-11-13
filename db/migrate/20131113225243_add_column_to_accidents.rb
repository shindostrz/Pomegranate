class AddColumnToAccidents < ActiveRecord::Migration
  def change
    add_column :accidents, :address, :string
  end
end
