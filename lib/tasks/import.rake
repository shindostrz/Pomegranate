require 'csv'
require 'geocoder'

desc "Import Bay Citizen accidents from csv"
task :import => :environment do

  file = "lib/assets/Bike Accidents 2009 2010 Latest Complete.csv"

  CSV.foreach(file, :headers => true) do |row|
    begin
    addr = row[10]
    result = Geocoder.coordinates(addr)
    lat = result[0]
    lon = result[1]
    Accident.create ({
      :latitude => lat,
      :longitude => lon,
      :details => "Bay Citizen data, 2009-10"
      })
    rescue
      p "empty coordinates"
    end

  end

end