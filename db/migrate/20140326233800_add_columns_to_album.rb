class AddColumnsToAlbum < ActiveRecord::Migration
  def change
    change_column :albums, :release_date, :date, :null => true
    add_column :albums, :about, :text
  end
end
