# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140325005732) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: true do |t|
    t.integer  "artist_id",    null: false
    t.integer  "year",         null: false
    t.string   "title",        null: false
    t.date     "release_date", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "annotations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "artists", force: true do |t|
    t.string   "artistname"
    t.integer  "iq"
    t.text     "about"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_url"
  end

  add_index "artists", ["artistname"], name: "index_artists_on_artistname", unique: true, using: :btree

  create_table "tracks", force: true do |t|
    t.integer  "creator_id",     null: false
    t.integer  "artist_id",      null: false
    t.integer  "album_id",       null: false
    t.integer  "track_num",      null: false
    t.string   "title",          null: false
    t.text     "lyrics",         null: false
    t.string   "soundcloud_url"
    t.string   "spotify_url"
    t.string   "youtube_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
