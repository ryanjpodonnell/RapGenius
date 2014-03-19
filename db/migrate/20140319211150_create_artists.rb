class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :artistname
      t.integer :iq
      t.text :about
      
      t.timestamps
    end
    add_index :artists, :artistname, :unique => true
  end
end
