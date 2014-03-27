class AddPhotoForFilepickerUrlToAnnotation < ActiveRecord::Migration
  def up
    add_column :annotations, :filepicker_url, :string
  end

  def down
    remove_column :annotations, :filepicker_url
  end
end
