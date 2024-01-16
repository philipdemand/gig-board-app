class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :gig_id, :message, :musician_id, :username, :status, :email
  belongs_to :musician

  def username
    object.musician.user.username
  end

  def email
    object.musician.user.email
  end

end
