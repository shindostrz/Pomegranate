class AddColumnToAccident < ActiveRecord::Migration
  def change
    add_column :accidents, :user_id, :integer
  end
end