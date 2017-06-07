class RemoveColumnsFromTracks < ActiveRecord::Migration
  def change
    remove_column :tracks, :album_id
    remove_column :tracks, :track_num
  end
end
