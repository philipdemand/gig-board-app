class Api::V1::GigsController < ApplicationController

    def create
        director = Director.find(params[:num])
        gig = director.gigs.create!(gig_params)
        render json: gig, status: :created
    end

    def mine
        gigs = Gig.where(director_id: params[:mine]).order(start_date: :asc)
        render json: gigs
    end

    def index
        gigs = Gig.all.order(start_date: :asc)
        render json: gigs
    end
            
    def update
        user = User.find(session[:user_id])
        director = Director.find(user[:role_id])
        gig = director.gigs.find(params[:id])
        if gig
        gig.update!(gig_params)
        render json: gig
        else
        render json: { error: 'Unauthorized: You do not have permission to update this gig record.' }, status: :unauthorized
        end
    end

    def destroy
        gig = Gig.find(params[:id])
        gig.destroy
        head :no_content
    end

    private

    def gig_params
        params.require(:gig).permit(:title, :description, :start_date, :end_date)
    end

end