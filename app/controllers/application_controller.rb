class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

  before_action :authorized

  def authorized
    return render json:{errors: ["Not Authorized"]}, status: :unauthorized unless session.include? :user_id
  end

  def unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

end
