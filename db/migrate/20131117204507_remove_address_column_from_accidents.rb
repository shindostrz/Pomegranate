class RemoveAddressColumnFromAccidents < ActiveRecord::Migration
  def change
    remove_column :accidents, :address
  end
end
