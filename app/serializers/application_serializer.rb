class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :gig_id, :message, :musician_id, :username, :status
  belongs_to :musician

  def username
    object.musician.user.username
  end

end
