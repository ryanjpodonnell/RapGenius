class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|

      t.timestamps
    end
  end
end
