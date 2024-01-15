class Musician < ApplicationRecord
    include Role
    has_many :applications
end
