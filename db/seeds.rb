require "faker"

# Thing.destroy_all
# 5.times do |i|
#   Thing.create(name: Faker::Name.name)
# end

50.times do
  p = Product.create(
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.sentence,
    price: Faker::Commerce.price.to_f,
    department: Faker::Commerce.department,

  )
  2.times do
    p.reviews.create(text: Faker::Quote.robin)
    # Review.create(text: Faker::Quote.robin, product_id:p.id)
  end
end

puts "50 Products Seeded"
