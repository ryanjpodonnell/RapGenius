class AddColumnsToAnnotation < ActiveRecord::Migration
  def change
    add_column :annotations, :referent, :string
    add_column :annotations, :body, :text
    add_column :annotations, :track_id, :integer
    add_column :annotations, :creator_id, :integer
  end
end
