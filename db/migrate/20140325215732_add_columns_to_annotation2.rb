class AddColumnsToAnnotation2 < ActiveRecord::Migration
  def change
    add_column :annotations, :end_index, :integer
    add_column :annotations, :start_index, :integer
  end
end
