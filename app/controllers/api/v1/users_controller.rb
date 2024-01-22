class Api::V1::UsersController < ApplicationController

    skip_before_action :authorized, only: [:create, :show]
    wrap_parameters :user, include: [:username, :email, :password, :password_confirmation, :role_type]

    def create
        if params[:user][:role_type] == "Musician"
            user = User.create!(role: Musician.new, **user_params)
        else
            user = User.create!(role: Director.new, **user_params)
        end
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user
    end

    def index
        users = User.all
        render json: users
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation, :role_type)
    end

end