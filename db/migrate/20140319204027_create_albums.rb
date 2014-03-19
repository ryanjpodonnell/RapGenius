class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.integer :artist_id, :null => false
      t.integer :year, :null => false
      t.string :title, :null => false
      t.date :release_date, :null => false

      t.timestamps
    end
  end
end
