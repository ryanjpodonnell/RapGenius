json.(artist, :id, :artistname, :iq, :about, :created_at, :updated_at, :image_url)

json.tracks(artist.tracks, :id, :creator_id, :artist_id, :album_id, :track_num, :title, :lyrics, :soundcloud_url, :spotify_url, :youtube_url)