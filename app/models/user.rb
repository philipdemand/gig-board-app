class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    delegated_type :role, types: %w[Director Musician], dependent: :destroy
end
