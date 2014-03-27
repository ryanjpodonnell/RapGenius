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

ActiveRecord::Schema.define(version: 20140327225013) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "albums", force: true do |t|
    t.integer  "artist_id",    null: false
    t.integer  "year",         null: false
    t.string   "title",        null: false
    t.date     "release_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "about"
    t.string   "image_url"
  end

  create_table "annotations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "referent"
    t.text     "body"
    t.integer  "track_id"
    t.integer  "creator_id"
    t.integer  "end_index"
    t.integer  "start_index"
    t.string   "filepicker_url"
  end

  create_table "artists", force: true do |t|
    t.string   "artistname"
    t.integer  "iq"
    t.text     "about"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_url"
    t.string   "filepicker_url"
  end

  add_index "artists", ["artistname"], name: "index_artists_on_artistname", unique: true, using: :btree

  create_table "friendly_id_slugs", force: true do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "tracks", force: true do |t|
    t.integer  "artist_id",      null: false
    t.string   "title",          null: false
    t.text     "lyrics",         null: false
    t.string   "soundcloud_url"
    t.string   "spotify_url"
    t.string   "youtube_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.text     "about"
  end

  add_index "tracks", ["slug"], name: "index_tracks_on_slug", unique: true, using: :btree

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
