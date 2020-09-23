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
  end

  def update
  end

  def destroy
  end

  private

  def set_product
    @product = Product.find(params[:product_id])
  end
end
