class Api::ReviewsController < ApplicationController
  before_action :set_product
  before_action :set_review, only: [:destroy]

  def index
  end

  def show
  end

  def create
    review = @product.reviews.new(review_params)
    if (review.save)
      render json: review
    else
      render json: review.errors, status: 422
    end
  end

  def update
  end

  def destroy
    review = @review.destroy()
    render json: review
  end

  private

  def review_params
    params.require(:review).permit(:text, :product_id)
  end

  def set_product
    @product = Product.find(params[:product_id])
  end

  def set_review
    @review = @product.reviews.find(params[:id])
  end
end
