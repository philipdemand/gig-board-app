class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :role_type, :role_id
end
