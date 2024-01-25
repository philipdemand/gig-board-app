# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.destroy_all
Musician.destroy_all
Director.destroy_all
Gig.destroy_all
Application.destroy_all

user1 = User.create(role: Director.new, username: "director1", email: "director1@example.com", password: "password")
user2 = User.create(role: Director.new, username: "director2", email: "director2@example.com", password: "password")
user3 = User.create(role: Musician.new, username: "musician1", email: "musician1@example.com", password: "password")
user4 = User.create(role: Musician.new, username: "musician2", email: "musician2@example.com", password: "password")

def random_date(range)
  Date.today + rand(range)
end

3.times do |i|
  start_date = random_date(30)
  end_date = random_date(30..60)
  Gig.create!(
    director_id: user1.role_id,
    title: "Director 1 Gig #{i + 1}",
    start_date: start_date,
    end_date: end_date,
    description: "Director 1 Gig #{i + 1} Description"
  )
end

3.times do |i|
  start_date = random_date(30)
  end_date = random_date(30..60)
  Gig.create!(
    director_id: user2.role_id,
    title: "Director 2 Gig #{i + 1}",
    start_date: start_date,
    end_date: end_date,
    description: "Director 2 Gig #{i + 1} Description"
  )
end