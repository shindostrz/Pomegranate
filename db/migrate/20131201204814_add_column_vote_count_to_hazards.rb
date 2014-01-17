class AddColumnVoteCountToHazards < ActiveRecord::Migration
  def change
    add_column :hazards, :vote_count, :integer
  end
end
