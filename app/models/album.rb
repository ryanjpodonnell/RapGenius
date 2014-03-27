# == Schema Information
#
# Table name: albums
#
#  id           :integer          not null, primary key
#  artist_id    :integer          not null
#  year         :integer          not null
#  title        :string(255)      not null
#  release_date :date
#  created_at   :datetime
#  updated_at   :datetime
#  about        :text
#

class Album < ActiveRecord::Base
  belongs_to(
    :artist,
    :primary_key => :id,
    :foreign_key => :artist_id,
    :class_name => "Artist"
  )
  
  has_many(
    :tracks,
    :primary_key => :id,
    :foreign_key => :album_id,
    :class_name => "Track"
  )
end
