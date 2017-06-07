#lib/tasks/delete_everything.rake

namespace :db do
  desc "Drop all tables (except schema_migrations)"
  task :delete_everything => :environment do
    puts "Dropping all tables (except migrations table)"
    ActiveRecord::Base.connection.tables.each do |table|
      if table != 'schema_migrations'
        query = "DROP TABLE IF EXISTS #{table} CASCADE;"
        ActiveRecord::Base.connection.execute(query)
      end
    end
  end
end
