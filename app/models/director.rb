class Director < ApplicationRecord
    include Role
    has_many :gigs, dependent: :destroy
end
