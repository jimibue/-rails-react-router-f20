class Api::ReviewsController < ApplicationController
  before_action :set_product

  # we aren't going use this
  def index
    render json: @product.reviews
  end

  def all_review
    render json: Review.all
  end

  def show
  end

  def create
    review = @product.reviews.new(review_params)
    if (review.save)
      render json: review
    else
      render json: review.errors, status: 422
      #=> you gave me bad data 4XX ->  are client errors
    end
  end

  def update
  end

  def destroy
  end

  private

  def review_params
    params.require(:review).permit(:text)
  end

  def set_product
    @product = Product.find(params[:product_id])
  end
end
