class Application < ApplicationRecord
    belongs_to :musician
    belongs_to :gig
    validates :musician_id, uniqueness: { scope: :gig_id }
end
