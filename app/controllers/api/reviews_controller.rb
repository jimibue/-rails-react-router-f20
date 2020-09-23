class Api::ReviewsController < ApplicationController
  before_action :set_product
  before_action :set_review, only: [:update, :destroy]

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

  # this is not tested, I think it works
  def update
    if (@review.update(review_params))
      render json: @review # one review that was updated
    else
      render json: @review.errors, status: 422
    end
  end

  def destroy
    review = @review.destroy
    render json: review
  end

  private

  def review_params
    params.require(:review).permit(:text)
  end

  def set_product
    @product = Product.find(params[:product_id])
  end

  def set_review
    @review = @product.reviews.find(params[:id])
  end
end
