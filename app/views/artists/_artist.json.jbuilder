json.(artist, :id, :artistname, :iq, :about, :created_at, :updated_at, :image_url)

json.tracks(artist.tracks, :id, :artist_id, :title, :lyrics, :soundcloud_url, :spotify_url, :youtube_url)