json.array!(@artists) do |artist|
  json.partial!("artists/artist", :artist => artist)
end