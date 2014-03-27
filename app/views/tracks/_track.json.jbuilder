json.(track, :id, :artist_id, :title, :lyrics, :soundcloud_url, :spotify_url, :youtube_url, :created_at, :updated_at, :about)

json.artist(track.artist, :id, :artistname, :iq, :image_url)

json.annotations(annotations) do |annotation|
  json.partial!("annotations/annotation", :annotation => annotation)
end