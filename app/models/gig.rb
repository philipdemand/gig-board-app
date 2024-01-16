class Gig < ApplicationRecord
    belongs_to :director
    has_many :applications, dependent: :destroy
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :title, presence: true
    validates :description, presence: true
end
