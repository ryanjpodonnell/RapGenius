# == Schema Information
#
# Table name: tracks
#
#  id             :integer          not null, primary key
#  creator_id     :integer          not null
#  artist_id      :integer          not null
#  album_id       :integer          not null
#  track_num      :integer          not null
#  title          :string(255)      not null
#  lyrics         :text             not null
#  soundcloud_url :string(255)
#  spotify_url    :string(255)
#  youtube_url    :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#

class Track < ActiveRecord::Base
  attr_accessible :creator_id, :artist_id, :album_id, :track_num, :title,
                  :lyrics, :soundcloud_url, :spotify_url, :youtube_url
  
  belongs_to(
    :album,
    :primary_key => :id,
    :foreign_key => :album_id,
    :class_name => "Album"
  )
  
  belongs_to(
    :artist,
    :primary_key => :id,
    :foreign_key => :artist_id,
    :class_name => "Artist"
  )
  
  belongs_to(
    :creator,
    :primary_key => :id,
    :foreign_key => :creator_id,
    :class_name => "Creator"
  )
end
