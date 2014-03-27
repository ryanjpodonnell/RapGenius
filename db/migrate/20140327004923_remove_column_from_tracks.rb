class RemoveColumnFromTracks < ActiveRecord::Migration
  def change
    remove_column :tracks, :creator_id
  end
end
