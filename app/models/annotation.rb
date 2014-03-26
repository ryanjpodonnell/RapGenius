# == Schema Information
#
# Table name: annotations
#
#  id          :integer          not null, primary key
#  created_at  :datetime
#  updated_at  :datetime
#  referent    :string(255)
#  body        :text
#  track_id    :integer
#  creator_id  :integer
#  end_index   :integer
#  start_index :integer
#

class Annotation < ActiveRecord::Base
  validates :body, :presence => true
  
  belongs_to(
    :track,
    :primary_key => :id,
    :foreign_key => :track_id,
    :class_name => "Track"
  )
  
  belongs_to(
    :user,
    :primary_key => :id,
    :foreign_key => :creator_id,
    :class_name => "User"
  )
end
