class AddPhotoForFilepickerUrlToArtist < ActiveRecord::Migration

  def up
    add_column :artists, :filepicker_url, :string
  end

  def down
    remove_column :artists, :filepicker_url
  end
end
