class Gig < ApplicationRecord
    belongs_to :director
    has_many :applications, dependent: :destroy
end
