class Api::V1::ApplicationsController < ApplicationController

    def create
        musician = Musician.find(params[:num])
        application = musician.applications.create!(application_params)
        render json: application, status: :created
    end

    def mine
        applications = Application.where(gig_id: params[:gig_id])
        render json: applications
    end

    def my_apps
        musician = Musician.find(params[:id])
        applications = musician.applications
        render json: applications
    end

    def destroy
        application = Application.find(params[:id])
        application.destroy
        head :no_content
    end

    def update
        application = Application.find(params[:id])
        application.update(application_params)
        render json: application
    end

    private

    def application_params
        params.require(:application).permit(:gig_id, :message, :status)
    end

 end
   
