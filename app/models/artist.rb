# == Schema Information
#
# Table name: artists
#
#  id         :integer          not null, primary key
#  artistname :string(255)
#  iq         :integer
#  about      :text
#  created_at :datetime
#  updated_at :datetime
#

class Artist < ActiveRecord::Base
  has_many(
    :tracks,
    :primary_key => :id,
    :foreign_key => :artist_id,
    :class_name => "Track"
  )
  
  has_many(
    :albums,
    :primary_key => :id,
    :foreign_key => :artist_id,
    :class_name => "Album"
  )
end
