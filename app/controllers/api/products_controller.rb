class Api::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    render json: Product.all
  end

  def show
    # binding.pry
    # render json: @product
    render json: @product.to_json(include: [:reviews])
    # render json: @product.to_json(:include => {
    #                                 :reviews => { only: [:text, :id] },
    #                               })
  end

  def create
    product = Product.new(product_params)

    if product.save
      render json: product
    else
      render json: product.errors, status: 422
    end
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: 422
    end
  end

  def destroy
    @product.destroy
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :department)
  end
end
