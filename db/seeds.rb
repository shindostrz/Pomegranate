# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Hazard.delete_all
hazards_test = Hazard.create([
  {latitude: '37.782655', longitude: '-122.416112', hazard_type: 'pothole', description: 'foo bar', user_id: 1},
  {latitude: '37.781909', longitude: '-122.413022', hazard_type: 'pothole', description: 'foo bar', user_id: 1},
  {latitude: '37.778313', longitude: '-122.412164', hazard_type: 'poor lighting', description: 'foo bar', user_id: 1},
  {latitude: '37.781739', longitude: '-122.40946', hazard_type: 'construction', description: 'foo bar', user_id: 1}
])

User.create([
  {provider: "twitter", uid: "113539049", name: "Amy MacKinnon"}
])