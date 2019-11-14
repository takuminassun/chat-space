FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image   {File.open("#{Rails.root}/app/image/pig_1.jpeg")}
    group
    user
  end
end
