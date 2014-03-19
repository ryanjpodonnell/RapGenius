class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :creator_id, :null => false
      t.integer :artist_id, :null => false
      t.integer :album_id, :null => false
      t.integer :track_num, :null => false
      t.string :title, :null => false
      t.text :lyrics, :null => false
      t.string :soundcloud_url
      t.string :spotify_url
      t.string :youtube_url

      t.timestamps
    end
  end
end
