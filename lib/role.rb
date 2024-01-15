module Role
    extend ActiveSupport::Concern
  
    included do
      has_one :user, as: :role, touch: true
    end

end