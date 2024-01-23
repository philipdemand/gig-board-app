class Gig < ApplicationRecord
    belongs_to :director
    has_many :applications, dependent: :destroy
    validates :start_date, presence: true
    validates :end_date, presence: true
    validates :title, presence: true
    validates :description, presence: true
    validate :start_date_cannot_be_in_the_past
    validate :end_date_cannot_be_before_start_date

    def start_date_cannot_be_in_the_past
        errors.add(:start_date, "can't be in the past") if start_date.present? && start_date < Date.today
    end

    def end_date_cannot_be_before_start_date
        errors.add(:end_date, "can't be before start date") if end_date.present? && end_date < start_date
    end
end
