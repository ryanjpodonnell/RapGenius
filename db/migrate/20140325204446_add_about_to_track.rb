class AddAboutToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :about, :text
  end
end
