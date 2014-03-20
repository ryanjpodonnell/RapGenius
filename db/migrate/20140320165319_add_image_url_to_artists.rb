class AddImageUrlToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :image_url, :string
  end
end
