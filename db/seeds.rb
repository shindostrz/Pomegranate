# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


hazards_test = Hazard.create([
  {latitude: '37.782655', longitude: '-122.416112', hazard_type: 'pothole', description: 'foo bar', user_id: 1},
  {latitude: '37.781909', longitude: '-122.413022', hazard_type: 'pothole', description: 'foo bar', user_id: 1},
  {latitude: '37.778313', longitude: '-122.412164', hazard_type: 'poor lighting', description: 'foo bar', user_id: 1},
  {latitude: '37.781739', longitude: '-122.40946', hazard_type: 'construction', description: 'foo bar', user_id: 1}
])

User.create([
  {provider: "twitter", uid: "113539049", name: "Amy MacKinnon"}, {provider:"facebook", uid:"723345712", name:"Amy MacKinnon"}, {provider:"facebbook", uid:"100006742991971",name:"Francisco Orozco"}
])

Vote.delete_all

Vote.create([
  {voted: true, user_id: 1, hazard_id: 12},
  {voted: false, user_id: 4, hazard_id: 12},
  {voted: false, user_id: 3, hazard_id: 12},
  {voted: false, user_id: 2, hazard_id: 12}

])

Accident.create([
  {latitude: '37.769807', longitude: '-122.4113', details: "Bicyclist struck, killed by Muni bus in SOMA"},
  {latitude: '37.7749295', longitude: '-122.4194155', details: "Bicyclist sentenced for manslaughter in SF crash"},
  {latitude: '37.778524', longitude: '-122.405634', details: "Bicyclist died in SoMa crash with truck"},
  {latitude: '37.765183', longitude: '-122.41751', details: "Bicyclist fatally struck by vehicle in Inner Mission"},
  {latitude: '37.778006', longitude: '-122.391707', details: "Women cyclist killed in collision near ballpark"},
  {latitude: '37.786543', longitude: '-122.414801', details: "Bicyclist injured in collision with Muni Bus "},
  {latitude: '37.7749295', longitude: '-122.4194155', details: "Warrant for cyclist accused of killing pedestrian"},
  {latitude: '37.775257', longitude: '-122.420935', details: "Bicyclist badly hurt in S.F. crash"}
])
